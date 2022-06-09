import { Box, Container, Paper } from "@mantine/core";
import React, { useState } from "react";
import PageContent from "../../../components/elements/PageContent";
import Alert from "../../../components/elements/Alert";
import RolesList from "../../../components/pages/roles/RolesList";

export default function Roles(){
    const [alert, setAlert] = useState({text: '', type: 'info'});

    return (
        <PageContent admin={true} title="Admin - Roles">
            <Container size={'md'}>
                <Box mt={30}>
                    {alert.text != '' && <Alert text={alert?.text} type={alert?.type} sx={{ marginBottom: 10}} />}
                    <Paper>
                        <RolesList setAlert={setAlert}/>
                    </Paper>
                </Box>
            </Container>
        </PageContent>
    )
}