import React, { useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { SegmentedControl, Box, MediaQuery, Burger, Image, Divider, ScrollArea, Anchor } from '@mantine/core';
import { FaUsers, FaDatabase, FaYoutube, FaListUl, FaHammer, FaHandshake, FaRegQuestionCircle } from "react-icons/fa";
import SidebarGroup from './SidebarGroup';
import Loading from '../../../elements/Loading';
import Error from '../../../elements/Error';
import useUser from '../../../api/swr/useUser';
import { UserButton } from './UserButton';
import Link from 'next/link';

const tabs: any = {
    default: [
        {
            links: [
                { label: 'Suggestions', icon: FaRegQuestionCircle, link: '/suggestions' },      
            ]
        },
        {
            group: 'Applications',
            links: [
                { label: 'Youtube', icon: FaYoutube, links: [
                    { label: 'Create application', link: '/applications/youtube/create' },
                    { label: 'Open applications', link: '/applications/youtube/open' },
                    { label: 'Closed applications', link: '/applications/youtube/closed' },
                ] },
                { label: 'Builder', icon: FaHammer, links: [
                    { label: 'Create application', link: '/applications/builder/create' },
                    { label: 'Open applications', link: '/applications/builder/open' },
                    { label: 'Closed applications', link: '/applications/builder/closed' },
                ] },
                { label: 'Supporter', icon: FaHandshake, links: [
                    { label: 'Create application', link: '/applications/supporter/create' },
                    { label: 'Open applications', link: '/applications/supporter/open' },
                    { label: 'Closed applications', link: '/applications/supporter/closed' },
                ] }                
            ]
        },
    ],
    admin: [
        {
            group: 'Administration',
            links: [
                { link: '/admin/users', label: 'Users', icon: FaUsers },
                { link: '/admin/roles', label: 'Roles', icon: FaListUl },
                { link: '/admin/applications', label: 'Applications', icon: FaDatabase },
            ]
        }
    ],
};

export default function Sidebar({ isExtended, admin }: { isExtended?: boolean, admin?: boolean }) {

    const matches = useMediaQuery('(min-width: 750px)');
    const [section, setSection] = useState(admin ? 'admin' : 'default');

    const { user, isLoading, isError } = useUser({
        redirectTo: "/login"
    });

    if(isLoading) return <></>
    if(!user) return <Loading/>
    if(isError) return <Error />

    return ( 
        <>
        {(matches || isExtended) && 
            <MediaQuery query="(max-width: 750px)" styles={{ width: '100%' }}>
                <Box sx={{ backgroundColor: '#fff', height: '100vh', transition: 'all 0.3s', width: 300, padding: '1rem', zIndex: 1, position: (isExtended && !matches ? "fixed" : "static")}}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}>
                                <Anchor component={Link} href="/">
                                    <Image src="/logo.svg" alt="logo" width={170} height={41}/>
                                </Anchor>
                            </Box>
                            <Box>
                                {user?.role == "admin" &&
                                    <SegmentedControl
                                        value={section}
                                        onChange={setSection}
                                        transitionTimingFunction="ease"
                                        fullWidth
                                        data={[
                                            { label: 'User', value: 'default' },
                                            { label: 'Admin', value: 'admin' },
                                        ]}
                                    />
                                }
                            </Box>
                            <Divider/>
                            <ScrollArea>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    {
                                        tabs[section].map((item: any, index: number) => <SidebarGroup group={item} key={index} />)
                                    }
                                </Box>
                            </ScrollArea>
                        </Box>
                        <Box>
                            <Divider mb={3}/>
                            <UserButton image={user?.avatar} name={user?.username} />
                        </Box>
                    </Box>
                </Box>
            </MediaQuery>  
        }
        </>
    )
}