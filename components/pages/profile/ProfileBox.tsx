import {  ActionIcon, Avatar, Box, Container, Divider, Paper, Text, ThemeIcon, Tooltip } from "@mantine/core";
import { FaCrown, FaYoutube } from "react-icons/fa";
import dayjs from "dayjs";
import User from "../../types/user";
import RoleBadge from "../../elements/RoleBadge";
import Alert from "../../elements/Alert";
import StatusBadge from "../../elements/StatusBadge";
import ProfileMenu from "./menu/ProfileMenu";
import ProfileAdminMenu from './menu/ProfileAdminMenu'


export default function ProfileBox({ user, isAdmin, isViewing }: { user: User, isAdmin?: boolean, isViewing?: boolean }) {
    return (
        <Container>
            <Paper mt={30} sx={{ padding: '2rem', display: 'flex', flexDirection: 'column'}}>
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
                    { isAdmin ? <ProfileAdminMenu/> : ( !isViewing ? <ProfileMenu/> : <></>) }
                </Box>
                <Divider my='md' color='gray' label={<Text color='dark'>Posts</Text>} labelPosition='center'/>
                <Alert text="You have not created any posts" type="warning" />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        cursor: 'pointer',
                        borderRadius: '0.25rem',
                        padding: '1rem',
                        '&:hover': {
                            backgroundColor: '#f8f9fa'
                        }
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem'}}>
                            <ThemeIcon variant="light" size={50}>
                                <FaYoutube size={30}/>
                            </ThemeIcon>
                            <Box>
                                <Text sx={{ fontSize: 20 }} weight={500}>Application</Text>
                                <Text sx={{ fontSize: 18 }} color='blue' weight={400}>Youtube</Text>
                            </Box>
                        </Box>
                        <StatusBadge/>
                        <Box>
                            <Tooltip withArrow label={dayjs(user.createdAt).format('HH:mm, DD/MM/YYYY')} transition='fade' transitionDuration={200}>
                                {/* @ts-ignore */}
                                {`${dayjs(user.createdAt).fromNow(true)} ago`}
                            </Tooltip>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Container>
    )
}