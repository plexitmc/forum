import { Box, Button, Table, Tooltip } from "@mantine/core"
import dayjs from "dayjs"
import { useState } from "react"
import { FaPlus } from "react-icons/fa"
import { useQuery, useQueryClient } from "react-query"
import createForm from "../../api/forms/createForm"
import getForms from "../../api/forms/getForms"
import Error from "../../elements/Error"
import { useRouter } from "next/router";

export default function AppFormList({ setAlert }: { setAlert: (alert: { text: string, type: string }) => void }) {
    const router = useRouter()
    const queryClient = useQueryClient()

    const { isLoading, isError, data } = useQuery('forms', getForms)

    const [isSubmitting, setSubmitting] = useState(false);

    async function createNewForm(){
        if(isSubmitting) return;
        setSubmitting(true)

        createForm()
            .then((response) => {
                setAlert({text: response.message, type: 'success'})
                queryClient.invalidateQueries('forms')
            })
            .catch((error) => {
                setAlert({text: error.message, type: 'error'})
            })
        setTimeout(() => setSubmitting(false), 500)
    }

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Table highlightOnHover verticalSpacing={'md'} horizontalSpacing='xl'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Created at</th>
                            <th>Updated at</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isError ? <tr><td colSpan={3}><Error height={'25vh'}/></td></tr> : (isLoading || !data ? <></> : 
                            data.forms?.map((form, index) => (
                                <Box component="tr" key={index} sx={{ cursor: 'pointer' }} onClick={() => router.push(`/admin/forms/${form._id}`)}>
                                    <td>{form.name}</td>
                                    <Box component='td'>
                                        <Tooltip withArrow label={dayjs(form.createdAt).format('HH:mm, DD/MM/YYYY')} transition='fade' transitionDuration={200}>
                                            {/* @ts-ignore */}
                                            {`${dayjs(form.createdAt).fromNow(true)} ago`}
                                        </Tooltip>
                                    </Box>
                                    <Box component='td'>
                                        <Tooltip withArrow label={dayjs(form.updatedAt).format('HH:mm, DD/MM/YYYY')} transition='fade' transitionDuration={200}>
                                            {/* @ts-ignore */}
                                            {`${dayjs(form.updatedAt).fromNow(true)} ago`}
                                        </Tooltip>
                                    </Box>
                                </Box>
                            )))
                        }
                    </tbody>
                </Table>
                <Box sx={{ margin: '1rem'}}>
                    <Button variant="outline" radius='xl' leftIcon={<FaPlus/>} onClick={createNewForm} disabled={isSubmitting}>Create form</Button>
                </Box>
            </Box>
        </>
    )
}