import { ActionIcon, Avatar, Box, Divider, Paper, Text, ThemeIcon, Tooltip } from "@mantine/core";
import { FaCrown } from "react-icons/fa";
import { FiRewind } from "react-icons/fi";
import RoleBadge from "../../elements/RoleBadge";
import Application from "../../types/application";
import Form from "../../types/form";
import User from "../../types/user";
import ApplicationAnswers from "./ApplicationAnswers";
import ApplicationInfo from "./ApplicationInfo";

export default function ApplicationBox({ user, application, form, setAlert }: {user: User, application: Application, form: Form, setAlert: (alert: {text: string, type: string}) => void}) {
    return (
        <Paper p='md' withBorder sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
            <ApplicationInfo form={form} user={user} application={application}/>
            <Divider labelPosition="center" label='Answers'/>
            <ApplicationAnswers form={form} application={application}/>
        </Paper>
    )
}