import { Button } from "@mantine/core";
import { useRouter } from "next/router";
import { useState } from "react";
import createApplication from "../../api/applications/createApplication";
import Form from "../../types/form";

export default function CreateApplicationButton({ form, answers, setAlert }: { form: Form, answers: {[key: string]: string | boolean}, setAlert: (alert: { text: string, type: string }) => void }) {

    const router = useRouter();
    const [isSubmitting, setSubmitting] = useState(false);

    const handleCreate = async () => {
        if(isSubmitting) return;
        setSubmitting(true)

        createApplication({ formId: form._id, answers: answers })
            .then((response) => {
                setAlert({text: response.message, type: 'success'})
                router.push(`/application/${response.applicationId}`)
            })
            .catch((error) => {
                setAlert({text: error.message, type: 'error'})
                setTimeout(() => setSubmitting(false), 500)
            })
    }

    return (
        <Button variant="outline" color="orange" radius="xl" loading={isSubmitting} onClick={handleCreate}>
            Create application
        </Button>
    )
}