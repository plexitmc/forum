import { Box, Paper, Sx, Table, Text, Pagination, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import UserListItem from "./UserListItem";

interface UserListProps {
    sx?: Sx;
}

export default function UserList({ sx }: UserListProps) {

    const [page, setPage] = useState(1);

    return (
        <Paper sx={[sx]}>
            <Table highlightOnHover verticalSpacing={'md'} horizontalSpacing='xl'>
                <Box component='thead'>
                    <Box component='tr'>
                        <Text component='th'>Username</Text> 
                        <th>Role</th> 
                        <th>Joined</th> 
                    </Box>
                </Box>
                <tbody>
                    <UserListItem user={{
                        id: "261195644314714113",
                        username: "SIMON#1386",
                        avatar: "https://cdn.discordapp.com/avatars/261195644314714113/6bb612580d6b15b78c9d723eb620ed7e.png",
                        role: "admin",
                        createdAt: 1654518531144,
                        owner: true
                    }}/>
                </tbody>
            </Table>
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: '1rem'}}>
                <Pagination page={page} onChange={setPage} total={10} />
            </Box>
        </Paper>    
    )
}