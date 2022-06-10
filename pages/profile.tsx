import { ActionIcon, Anchor, Avatar, Box, Container, Divider, Paper, Text } from "@mantine/core";
import Link from "next/link";
import { BsThreeDotsVertical } from "react-icons/bs";
import useUser from "../components/api/swr/useUser";
import Error from "../components/elements/Error";
import PageContent from "../components/elements/PageContent";
import RoleBadge from "../components/elements/RoleBadge";

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
                        <ActionIcon size={35} color='blue'><BsThreeDotsVertical size={25}/></ActionIcon>
                    </Box>
                    <Divider my='md' color='gray' label={<Text color='dark'>Posts</Text>} labelPosition='center'/>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box sx={{ 
                            width: '100%',
                            cursor: 'pointer',
                            borderRadius: '0.25rem',
                            padding: '1rem',
                            '&:hover': {
                                backgroundColor: '#f8f9fa'
                            }
                        }}>
                            Hety
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </PageContent>
    )
}