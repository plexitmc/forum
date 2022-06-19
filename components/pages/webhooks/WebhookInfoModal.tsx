import { Box, Button, Group, Modal, PasswordInput, Text, TextInput } from "@mantine/core";

import { useState } from "react";
import { useQueryClient } from "react-query";
import { showNotification } from "@mantine/notifications";
import Webhook from "../../types/webhook";
import deleteWebhook from "../../api/webhooks/deleteWebhook";


export default function CreateWebhookModal({ webhook, isVisible, setVisible }: { webhook: Webhook | undefined, isVisible: boolean, setVisible: (visible: string) => void }) {

    const queryClient = useQueryClient()

    const [isSubmitting, setSubmitting] = useState(false);

    async function handleDeleteWebhook() {
        if(isSubmitting) return;
        setSubmitting(true)

        deleteWebhook(webhook?._id)
            .then((response) => {
                showNotification({
                    message: response.message,
                    title: 'Success',
                    color: 'teal',
                    radius: 'md'
                })
                queryClient.invalidateQueries('webhooks')
            })
            .catch((error) => {
                showNotification({
                    message: error.message,
                    title: 'Error',
                    color: 'red',
                    radius: 'md'
                })
            })
        setVisible('')
        setTimeout(() => setSubmitting(false), 500)
    }

    return (
        <Modal opened={isVisible && webhook ? true : false} onClose={() => setVisible('')} title={<Text weight={600}>Viewing webhook</Text>} size='lg'>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem', marginBottom: '1rem'}}>
                <TextInput
                    label="Name"
                    disabled
                    sx={{ flexGrow: 1 }}
                    value={webhook?.name}
                />
                <TextInput
                    label="Event"
                    disabled
                    value={webhook?.event}
                    sx={{ flexGrow: 1 }}
                />
            </Box>
            <TextInput
                label="URL"
                disabled
                value={webhook?.url}
                sx={{ marginBottom: '1rem' }}
            />
            <PasswordInput
                label="Secret Key"
                value={webhook?.secret}
            />
            <Group position="right" mt="xl">
                <Button onClick={handleDeleteWebhook} color='red' loading={isSubmitting}>Delete webhook</Button>
            </Group>
        </Modal>
    )
}