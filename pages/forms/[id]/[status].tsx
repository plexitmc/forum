import { Box, Container } from "@mantine/core";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import getForm from "../../../components/api/forms/getForm";
import Error from "../../../components/elements/Error";
import LoadingScreen from "../../../components/elements/LoadingScreen";
import PageContent from "../../../components/elements/PageContent";
import ApplicationListStatus from "../../../components/pages/applications/list/ApplicationListStatus";

export default function Applications(){

    const router = useRouter();
    var { id, status } = router.query;

    if(Array.isArray(id)) id = id[0];
    if(Array.isArray(status)) status = status[0];

    const { isLoading, isError, data } = useQuery(['form', id], async () => await getForm(id));
    
    return (
        <PageContent title={(isLoading || isError || !data || !data.form) ? "Applications" : `${status?.charAt(0).toUpperCase()}${status?.slice(1)} ${data.form.name} applications`}>
            { !['pending', 'accepted', 'rejected'].includes(`${status?.toLowerCase()}`) ? <Error error="Invalid status" /> 
                : isError ? <Error error={data?.message || "Form not found"}/> 
                    : isLoading || !data || !data.form ? <LoadingScreen/>
                        : <ApplicationListStatus status={status || 'pending'} form={data.form}/>
            }
        </PageContent>
    )
}