import { Box, Checkbox, Divider, Group, Paper, Text, Textarea, TextInput } from "@mantine/core";
import Form from "../../types/form";
import CreateApplicationButton from "./CreateApplicationButton";

export default function CreateApplicationBox({ form, setAlert }: { form: Form, setAlert: (alert: { text: string, type: string }) => void }) {
    return (
        <Paper p='md' withBorder sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
            {form.fields.map((field, index) => 
                <Box key={index}>
                    {field.type == 'heading' && <Divider labelPosition='center' label={<Text size='xl' sx={{ color: '#111827 !important' }}>{field.label}</Text>} />}
                    {field.type == 'text' && field.description &&
                        field.description.split('\n').map((line, index) =>
                            <Text size={'sm'} key={index} sx={{ color: '#111827', opacity: 0.75 }}>{line}</Text>
                        )
                    }
                    {field.type == 'shorttext' && 
                        <TextInput label={field.label} description={field.description} required={field.required}/>
                    }
                    {field.type == 'longtext' &&
                        <Textarea label={field.label} description={field.description} required={field.required} autosize minRows={5}/>
                    }
                    {field.type == 'checkbox' &&
                        <Checkbox label={field.label}/>
                    }
                </Box>
            )}    
            <Group position="right" mt="xl">
                <CreateApplicationButton/>
            </Group>
        </Paper>
    )
}