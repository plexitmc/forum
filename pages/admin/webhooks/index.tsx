import { Box, Container, Paper } from "@mantine/core";
import PageContent from "../../../components/elements/PageContent";
import WebhookList from "../../../components/pages/webhooks/WebhookList";

export default function Webhooks(){
    return (
        <PageContent admin={true} title="Admin - Webhooks">
            <Container size={'lg'}>
                <Box mt={30}>
                    <Paper withBorder>
                        <WebhookList/>
                    </Paper>
                </Box>
            </Container>
        </PageContent>
    )
}