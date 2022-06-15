import {  ActionIcon, Avatar, Box, Container, Paper, Text, Tooltip } from "@mantine/core";
import { FaCrown } from "react-icons/fa";
import User from "../../types/user";
import RoleBadge from "../../elements/RoleBadge";
import Alert from "../../elements/Alert";
import ProfileMenu from "./menu/ProfileMenu";
import ProfileAdminMenu from './menu/admin/ProfileAdminMenu'
import { useState } from "react";
import ApplicationsBox from "./ApplicationsBox";


export default function ProfileBox({ user, isAdmin, isViewing }: { user: User, isAdmin?: boolean, isViewing?: boolean }) {

    const [alert, setAlert] = useState({text: '', type: 'info'});

    return (
            <Container>
                <Paper mt={30} sx={{ padding: '2rem', display: 'flex', flexDirection: 'column'}}>
                    {alert.text != '' && <Alert text={alert?.text} type={alert?.type} sx={{ marginBottom: '2rem'}} />}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Avatar src={user.avatar} size={100} sx={{borderRadius: '100%'}}/>
                            <Box>
                                <Box sx={{ display: 'flex', alignItems: 'center'}}>
                                    <Text sx={{ fontSize: 25 }} weight={500}>{user.username}</Text>
                                    {user.owner &&
                                        <Tooltip withArrow label={'This user is the owner.'} transition='fade' transitionDuration={200}>
                                            <ActionIcon color="orange" radius="xs" variant="transparent"><FaCrown/></ActionIcon>
                                        </Tooltip>
                                    }
                                </Box>
                                <RoleBadge role={user.role}/>
                            </Box>
                        </Box>
                        { isAdmin ? <ProfileAdminMenu user={user} setAlert={setAlert}/> : ( !isViewing ? <ProfileMenu/> : <></>) }
                    </Box>
                    <ApplicationsBox isProfile={!isAdmin && !isViewing} user={user}/>
                </Paper>
            </Container>
    )
}