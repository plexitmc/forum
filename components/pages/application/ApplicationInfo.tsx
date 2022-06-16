import { ActionIcon, Anchor, Avatar, Box, Text, ThemeIcon, Tooltip } from "@mantine/core";
import dayjs from "dayjs";
import Link from "next/link";
import { FaCrown } from "react-icons/fa";
import RoleBadge from "../../elements/RoleBadge";
import StatusBadge from "../../elements/StatusBadge";
import Application from "../../types/application";
import Form from "../../types/form";
import User from "../../types/user";

export default function ApplicationInfo({ user, application, form }: { user: User, application: Application, form: Form }) {
    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.3rem', justifyContent: 'center'}}>
                {form.icon &&
                    <ThemeIcon variant="light" size={40}>
                        <i className={`${form.icon}`} style={{fontSize: '28px'}}/>
                    </ThemeIcon>
                }
                <Text weight={600}>{form.name}</Text>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Text weight={600}>Date: <Text component="span" weight={400}>{dayjs(application.createdAt).format('HH:mm, DD/MM/YYYY')}</Text></Text>
                <Text weight={600}>Status: <StatusBadge status={application.status}/></Text>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.3rem'}}>
                    <Text weight={600}>User: </Text>
                    <Anchor component={Link} href={`/user/${user.id}`}>
                        <Box sx={{ display: 'flex', gap: '0.1rem', cursor: 'pointer' }}>
                            <Avatar src={user.avatar} radius="xl" size={'sm'}/>
                            <Text weight={400}>{user.username}</Text>
                        </Box>
                    </Anchor>
                </Box>
            </Box>
        </Box>
    )
}