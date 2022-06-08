import React, { useState } from 'react';
import { SegmentedControl, Box, MediaQuery, Burger, Image, Divider } from '@mantine/core';
import { FaUsers, FaDatabase, FaYoutube, FaListUl, FaHammer, FaHandshake, FaQuestion, FaCartPlus, FaCartArrowDown, FaDollarSign, FaRegQuestionCircle } from "react-icons/fa";
import SidebarGroup from './SidebarGroup';
import Loading from '../../elements/LoadingScreen';
import Error from '../../elements/Error';
import useUser from '../../../components/api/swr/useUser';
import { UserButton } from './UserButton';

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
                    { label: 'Create application', link: '/youtube/create' },
                    { label: 'Open applications', link: '/youtube/open' },
                    { label: 'Closed applications', link: '/youtube/closed' },
                ] },
                { label: 'Builder', icon: FaHammer, links: [
                    { label: 'Create application', link: '/builder/create' },
                    { label: 'Open applications', link: '/builder/open' },
                    { label: 'Closed applications', link: '/builder/closed' },
                ] },
                { label: 'Supporter', icon: FaHandshake, links: [
                    { label: 'Create application', link: '/supporter/create' },
                    { label: 'Open applications', link: '/supporter/open' },
                    { label: 'Closed applications', link: '/supporter/closed' },
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

export default function Sidebar(){

    const [isExtended, setIsExtended] = useState(true);
    const [section, setSection] = useState('default');

    const { user, isLoading, isError } = useUser({
        redirectTo: "/login"
    });

    if(isLoading) return <Loading/>
    if(isError) return <Error />

    return (
        <MediaQuery query="(max-width: 800px)" styles={{ width: isExtended ? '100%' : 0 }}>
            <Box sx={{ backgroundColor: '#fff', height: '100%', position: 'fixed', transition: '0.3s', width: isExtended ? 300 : 0, padding: '1rem'}}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Image src="/logo.svg" alt="logo" width={170} height={41}/>
                        </Box>
                        <Box>
                            {user.role == "admin" &&
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
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            {
                                tabs[section].map((item: any) => <SidebarGroup group={item} key={item.group?.group} />)
                            }
                        </Box>
                    </Box>
                    <Box>
                        <UserButton image={user.avatar} name={user.username} />
                    </Box>
                </Box>
            </Box>
        </MediaQuery>
    )
}