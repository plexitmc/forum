import { ActionIcon, Avatar, Box, Container, Divider, Menu, Paper, Text, ThemeIcon, Tooltip } from "@mantine/core";
import { BsMessenger, BsThreeDotsVertical } from "react-icons/bs";
import { FaSignOutAlt, FaYoutube } from "react-icons/fa";
import useUser from "../components/api/swr/useUser";
import Error from "../components/elements/Error";
import PageContent from "../components/elements/PageContent";
import RoleBadge from "../components/elements/RoleBadge";
import StatusBadge from "../components/elements/StatusBadge";
import dayjs from "dayjs";
import Alert from "../components/elements/Alert";

export default function Profile(){

    const { user, isLoading, isError } = useUser({
        redirectTo: "/login"
    });

    if(isLoading || !user) return <></>
    if(isError) return <Error />

    return (
        <PageContent title="Your Profile">
            <Container>
                <Paper mt={30} sx={{ padding: '2rem', display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Avatar src={user.avatar} size={100} sx={{borderRadius: '100%'}}/>
                            <Box>
                                <Text sx={{ fontSize: 25 }} weight={500}>{user.username}</Text>
                                <RoleBadge role={user.role}/>
                            </Box>
                        </Box>
                        <Menu transition="pop" withArrow placement="end" control={<ActionIcon size={35} color='blue'><BsThreeDotsVertical size={25}/></ActionIcon>}>
                            <Menu.Item icon={<BsMessenger size={16} />}>Send message</Menu.Item>
                            <Menu.Item icon={<FaSignOutAlt size={16} />} color="red">Logout</Menu.Item>
                        </Menu>
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
        </PageContent>
    )
}