import { Button } from "@mantine/core";
import { useRouter } from "next/router";
import { useState } from "react";
import deleteForm from "../../api/forms/deleteForm";
import ConfirmationModal from "../../elements/ConfirmationModal";
import Form from "../../types/form";

export default function DeleteFormButton({ isSubmitting, form, setAlert }: { isSubmitting: boolean, form: Form, setAlert: (alert: { text: string, type: string }) => void }) {
    
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const router = useRouter();

    async function handleDeleteForm() {
        await deleteForm(form._id)
        .then((response) => {
            setAlert({text: response.message, type: 'success'});
            setTimeout(() => router.push('/admin/forms'), 2000);
        })
        .catch((error) => {
            setAlert({text: error.message, type: 'error'});
        })
    }

    return (
        <>
            <Button loading={isSubmitting} color='red' variant="outline" onClick={() => setDeleteModalVisible(true)}>Delete form</Button>
            <ConfirmationModal 
                title="Delete this form?" 
                opened={isDeleteModalVisible} 
                setOpened={setDeleteModalVisible}
                buttonText="Yes, delete form"
                onConfirm={() => handleDeleteForm()}
            >
                Hey there, are you sure you want to delete this form?<br/>
                All data will be lost. All of users applications will be deleted.
            </ConfirmationModal>
        </>
    )
}