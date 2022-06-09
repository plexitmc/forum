import { Box, ScrollArea } from "@mantine/core";
import { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Header from "./Header";

export default function Appshell({ admin, children }: { admin?: boolean, children?: any }) {

    const [isNavbarExtended, setNavbarExtended] = useState(false);
    
    return (
        <Box>
            <Header isExtended={isNavbarExtended} setIsExtended={setNavbarExtended}/>
            <Box sx={{ display: 'flex' }}>
                <Sidebar isExtended={isNavbarExtended} admin={admin} />
                <ScrollArea style={{height: '100vh'}} sx={{ flexGrow: 1}}>
                    {children}
                </ScrollArea>
            </Box>
        </Box>
    )
}