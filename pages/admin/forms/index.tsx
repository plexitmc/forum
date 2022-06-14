import { Box, Container, Paper } from "@mantine/core";
import React, { useState } from "react";
import Alert from "../../../components/elements/Alert";
import PageContent from "../../../components/elements/PageContent";
import AppFormList from "../../../components/pages/applications/FormList";

export default function Applications(){
    const [alert, setAlert] = useState({text: '', type: 'info'});
    return (
        <PageContent admin={true} title="Admin - Forms">
            <Container size={'md'}>
                <Box mt={30}>
                    {alert.text != '' && <Alert text={alert?.text} type={alert?.type} sx={{ marginBottom: 10}} />}
                    <Paper withBorder>
                        <AppFormList setAlert={setAlert}/>
                    </Paper>
                </Box>
            </Container>
        </PageContent>
    )
}