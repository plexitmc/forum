import { Button, Group, Modal, Select, TextInput } from "@mantine/core";

import Role from "../../types/role"
import * as Yup from 'yup';
import { useForm, yupResolver } from "@mantine/form";
import { useState } from "react";
import createRole from "../../api/roles/createRole";
import { useQueryClient } from "react-query";
import deleteRole from "../../api/roles/deleteRole";


interface IRolesModalProps {
    role?: Role;
    setVisible: (visible: boolean) => void;
    setAlert: (alert: { text: string, type: string }) => void;
}

interface RolesModalValues {
    label: string;
    color: string,
    id?: string;
}

const schema = Yup.object().shape({
    label: Yup.string().required("The label is required."),
    color: Yup.string().required("The color is required."),
});


export default function RolesModal({ role, setVisible, setAlert }: IRolesModalProps){

    // Hacky fix to ensure the form object is recreated each rerender.

    const queryClient = useQueryClient()

    const [isSubmitting, setSubmitting] = useState(false);

    const form = useForm({
        schema: yupResolver(schema),
        initialValues: {
            label: role?.label || '',
            color: role?.color || '',
            id: role?.id || undefined,
        }
    })

    async function onSubmit({ label, color, id }: RolesModalValues) {
        if(isSubmitting) return;
        setSubmitting(true)

        createRole({ label, color, id })
            .then((response) => {
                setAlert({text: response.message, type: 'success'})
                queryClient.invalidateQueries('roles')
            })
            .catch((error) => {
                setAlert({text: error.message, type: 'error'})
            })

        setVisible(false)
        setTimeout(() => setSubmitting(false), 500)
    }

    async function deleteRoleWithId({ id }: { id: string }) {
        if(isSubmitting) return;
        setSubmitting(true)

        deleteRole({ id })
            .then((response) => {
                setAlert({text: response.message, type: 'success'})
                queryClient.invalidateQueries('roles')
            })
            .catch((error) => {
                setAlert({text: error.message, type: 'error'})
            })
        setVisible(false)
        setTimeout(() => setSubmitting(false), 500)
    }
    
    return (
        <Modal opened={true} onClose={() => setVisible(false)} title={role ? `Editing '${role.label}'` : "Creating new role"}>
            <form onSubmit={form.onSubmit(async (values) => await onSubmit(values))}>
                <TextInput
                    required
                    label="Label"
                    placeholder="The label of the role"
                    {...form.getInputProps('label')}
                />
                <Select
                    required
                    label="Color"
                    placeholder="The color of the role"
                    {...form.getInputProps('color')}
                    data={[
                        { label: 'Red', value: 'red' },
                        { label: 'Green', value: 'green' },
                        { label: 'Blue', value: 'blue' },
                        { label: 'Yellow', value: 'yellow' },
                        { label: 'Orange', value: 'orange' },
                    ]}
                />
                <Group position="right" mt="xl">
                    {role && <Button onClick={() => deleteRoleWithId({ id: role.id })} color='red'>Delete</Button>}
                    <Button type="submit" loading={isSubmitting}>{role ? 'Save' : 'Create role'}</Button>
                </Group>
            </form>
        </Modal>
    )
}