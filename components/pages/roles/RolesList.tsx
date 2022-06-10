import { Badge, Box, Button, Table } from "@mantine/core";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useQuery } from "react-query";
import getRoles from "../../api/roles/getRoles";
import Error from "../../elements/Error";
import Loading from "../../elements/Loading";
import RoleBadge from "../../elements/RoleBadge";
import Role from "../../types/role";
import RolesModal from "./RolesModal";

export default function RolesList({ setAlert }: { setAlert: (alert: { text: string, type: string }) => void }) {

    const { isLoading, isError, data: roles } = useQuery('roles', getRoles)
    const [selectedRole, setSelectedRole] = useState<Role | undefined>(undefined)
    const [isVisible, setVisible] = useState(false);


    const openRoleModal = (role?: Role) => {
        setSelectedRole(role)
        setVisible(true)
    }

    return (
        <>
            {(isLoading || !roles) ? (isError ? <Error/> : <Loading/>) : 
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Table highlightOnHover verticalSpacing={'md'} horizontalSpacing='xl'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Badge</th>
                            <th>Members</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(roles).map((key, index) => (
                            <tr key={index} onClick={() => openRoleModal(roles[key])}>
                                <td>{roles[key].label}</td>
                                <td><RoleBadge role={key}/></td>
                                <td>0</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Box sx={{ margin: '1rem'}}>
                    <Button variant="outline" radius='xl' onClick={() => openRoleModal(undefined)}><FaPlus/></Button>
                </Box>
            </Box>
            }
            {isVisible && <RolesModal setAlert={setAlert} role={selectedRole} setVisible={setVisible} />}
        </>
    )
}