import { Box, Checkbox, Divider, Group, Paper, Text, Textarea, TextInput } from "@mantine/core";
import { useState } from "react";
import Form from "../../types/form";
import CreateApplicationButton from "./CreateApplicationButton";

export default function CreateApplicationBox({ form, setAlert }: { form: Form, setAlert: (alert: { text: string, type: string }) => void }) {

    const [answers, setAnswers] = useState<{[key: string]: string | boolean}>({});

    function updateAnswers(fieldId: string, value: string | boolean) {
        setAnswers({...answers, [fieldId]: value});
    }

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
                        <TextInput 
                            label={field.label} 
                            description={field.description} 
                            required={field.required}
                            onChange={(event) => updateAnswers(field.id, event.target.value)}
                        />
                    }
                    {field.type == 'longtext' &&
                        <Textarea 
                            label={field.label} 
                            description={field.description} 
                            required={field.required} 
                            autosize 
                            minRows={5}
                            onChange={(event) => updateAnswers(field.id, event.target.value)}
                        />
                    }
                    {field.type == 'checkbox' &&
                        <Checkbox 
                            label={field.label} 
                            checked={answers[`${field.id}`] === true} 
                            onChange={(event) => updateAnswers(field.id, event.target.checked)}
                        />
                    }
                </Box>
            )}    
            <Group position="right" mt="xl">
                <CreateApplicationButton form={form} answers={answers} setAlert={setAlert}/>
            </Group>
        </Paper>
    )
}