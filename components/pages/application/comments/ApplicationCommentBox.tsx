import { Box } from "@mantine/core";
import Application from "../../../types/application";
import Form from "../../../types/form";
import ApplicationComment from "./ApplicationComment";
import ApplicationCreateComment from "./ApplicationCreateComment";

export default function ApplicationCommentBox({ form, application }: { form: Form, application: Application }) {
    return (
        <Box sx={{ marginLeft: '2rem', marginRight: '2rem' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                {application.comments.map((comment, index) => (
                    <ApplicationComment key={index} comment={comment} />
                ))}
            </Box>
            <ApplicationCreateComment application={application} form={form}/>
        </Box>
    )
}