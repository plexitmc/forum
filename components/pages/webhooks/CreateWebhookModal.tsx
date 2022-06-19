import { Box, Button, Group, Modal, Select, Text, TextInput } from "@mantine/core";

import * as Yup from 'yup';
import { useForm, yupResolver } from "@mantine/form";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { showNotification } from "@mantine/notifications";
import createWebhook from "../../api/webhooks/createWebhook";



interface Values {
    name: string;
    event: string,
    url: string;
}

const schema = Yup.object().shape({
    name: Yup.string().required('The name is required'),
    event: Yup.string().required("The event is required."),
    url: Yup.string().required("The url is required."),
});


export default function CreateWebhookModal({ isVisible, setVisible }: { isVisible: boolean, setVisible: (visible: string) => void }) {

    const queryClient = useQueryClient()

    const [isSubmitting, setSubmitting] = useState(false);

    const form = useForm({
        schema: yupResolver(schema),
        initialValues: {
            name: '',
            event: '',
            url: ''
        }
    })

    async function onSubmit({ name, event, url }: Values) {
        if(isSubmitting) return;
        setSubmitting(true)

        createWebhook({ name, event, url })
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
        form.reset();
        setVisible('')
        setTimeout(() => setSubmitting(false), 500)
    }

    return (
        <Modal opened={isVisible} onClose={() => setVisible('')} title={<Text weight={600}>Creating new webhook</Text>} size='lg'>
            <form onSubmit={form.onSubmit(async (values) => await onSubmit(values))}>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem', marginBottom: '1rem'}}>
                    <TextInput
                        required
                        label="Name"
                        placeholder="The name of the webhook"
                        {...form.getInputProps('name')}
                        sx={{ flexGrow: 1 }}
                    />
                    <Select
                        required
                        label="Event"
                        placeholder="Event which triggers the webhook"
                        {...form.getInputProps('event')}
                        data={[
                            { label: 'All events', value: 'all' },
                            { label: 'Comment is created', value: 'onComment' },
                            { label: 'Status of application is updated', value: 'onStatusUpdate' },
                        ]}
                        sx={{ flexGrow: 1 }}
                    />
                </Box>
                <TextInput
                    required
                    label="URL"
                    placeholder="The url to which the webhook should be sent"
                    {...form.getInputProps('url')}
                />
                <Group position="right" mt="xl">
                    <Button type="submit" loading={isSubmitting}>Create webhook</Button>
                </Group>
            </form>
        </Modal>
    )
}