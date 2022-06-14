import { Paper, Text, Group, Button } from "@mantine/core";
import { useState } from "react";
import updateForm from "../../api/forms/updateForm";
import Form from "../../types/form";
import DeleteFormButton from "./DeleteFormButton";
import FormFields from "./sections/FormFields";
import FormInfo from "./sections/FormInfo";
import FormPermissions from "./sections/FormPermissions";

export default function FormBox({ form: startForm, setAlert }: { form: Form, setAlert: (alert: { text: string, type: string }) => void }){

    const [form, setForm] = useState(startForm);
    const [isSubmitting, setSubmitting] = useState(false);

    async function saveChanges() {
        if(isSubmitting) return;
        setSubmitting(true)

        updateForm(form)
            .then((response) => {
                setAlert({text: response.message, type: 'success'})
                //queryClient.invalidateQueries(['form', form._id])
            })
            .catch((error) => {
                setAlert({text: error.message, type: 'error'})
            })
        setTimeout(() => setSubmitting(false), 500)
    }

    return (
        <Paper p='md' withBorder sx={{ display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            <Text weight={600} sx={{ fontSize: 35 }} color='dark'>Editing form</Text>
            <FormInfo form={form} setForm={setForm}/>
            <FormPermissions form={form} setForm={setForm}/>
            {/*<FormFields fields={form.fields}/>*/}
            <Group position="right" mt="xl">
                <DeleteFormButton isSubmitting={isSubmitting} setAlert={setAlert} form={form}/>
                <Button loading={isSubmitting} variant='outline' onClick={() => saveChanges()}>Save</Button>
            </Group>
        </Paper>
    )
}