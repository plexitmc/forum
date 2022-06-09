
export default function handler(req, res) {
    res.status(200).json({"roles":{"admin":{"_id":"62a219721fae72f53bcf93a8","deletable":false,"color":"red","id":"admin","label":"Admin"},"moderator":{"_id":"62a21a2b1fae72f53bcf93b0","color":"pink","id":"moderator","label":"Moderator"}}});
  }


