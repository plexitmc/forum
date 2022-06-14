import { Box, Container } from "@mantine/core";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import getForm from "../../../components/api/forms/getForm";
import Alert from "../../../components/elements/Alert";
import Error from "../../../components/elements/Error";
import LoadingScreen from "../../../components/elements/LoadingScreen";
import PageContent from "../../../components/elements/PageContent";
import FormBox from "../../../components/pages/forms/FormBox";

export default function Form(){

    const [alert, setAlert] = useState({text: '', type: 'info'});

    const router = useRouter();
    var { id } = router.query;

    if(Array.isArray(id)) id = id[0];
    
    const { isLoading, isError, data } = useQuery(['form', id], async () => await getForm(id));

    return (
        <PageContent admin={true} title={(isLoading || isError || !data || !data.form) ? "Admin - Form" : `Admin - ${data.form.name} form`}>
            { isError 
            ? <Error error={data?.message || "Form not found"}/> 
            : (isLoading || !data || !data.form 
                ? <LoadingScreen/>
                : 
                <Container size={'md'}>
                    <Box mt={30}>
                        {alert.text != '' && <Alert text={alert?.text} type={alert?.type} sx={{ marginBottom: 10}} />}
                        <FormBox form={data.form} setAlert={setAlert}/>
                    </Box>
                </Container>
            )}
        </PageContent>
    )
}