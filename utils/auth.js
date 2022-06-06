// Imports
const jwt = require('jsonwebtoken');
const config = require('../config.json');
const express = require('express');

module.exports = (db) => {
    const obj = {};

    /**
     * Generate a new access token for a given user
     * @param {String} userId
     * @returns 
     */
    obj.generateAccessToken = (userId) => {
        return jwt.sign({userId: userId}, config.jwt_secret, { expiresIn: 1800 });
    }

    /**
     * Checks if the given access token exists in the database
     * @param {String} token 
     * @returns 
     */
    obj.isAccessTokenValid = async (token) => {
        var res = await db.logins.findOne({token: token});
        if (!res) return false;
        return true;
    }

    /**
     * Get Authorization token from request header.
     * @param {express.Request} req
     * @returns {String} token
     */
    obj.getTokenFromHeader = (req) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        return token;
    }

    /**
     * Middleware for authenticating a user by the access token
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {express.NextFunction} next 
     * @returns 
     */
    obj.ensureAuthentication = async (req, res, next) => {
        const token = obj.getTokenFromHeader(req);

        if(token == null) return res.status(401).json({
            status: 401,
            message: 'Authorization failed.'
        });

        jwt.verify(token, config.jwt_secret, async (err, user) => {
        
            if (err) {
                return res.status(401).json({
                    status: 401,
                    message: 'Access token expired.'
                });
            }

            var dbRes = await obj.isAccessTokenValid(token);
            if (!dbRes) return res.status(401).json({
                status: 401,
                message: 'Access token expired.'
            });
            
            req.userId = user.userId;
        
            next();
        });
    }

    /**
     * Middleware for forwarding a user if authenticated
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {express.NextFunction} next 
     * @returns 
     */
     obj.forwardAuthentication = async (req, res, next) => {
        const token = obj.getTokenFromHeader(req);

        if(token == null) return next();

        jwt.verify(token, config.jwt_secret, async (err, user) => {
    
            if (err) return next();

            if (!await obj.isAccessTokenValid(token)) return next();
        
            return res.redirect("/")
        });
    }

    return obj;
}