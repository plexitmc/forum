import { ActionIcon, Menu, Text } from "@mantine/core";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

export default function ProfileMenu(){
    return (
        <Menu transition="pop" withArrow placement="end" control={<ActionIcon size={35} color='blue'><BsThreeDotsVertical size={25}/></ActionIcon>}>
            <Menu.Item icon={<FiEdit size={16} />} >
                <Text weight={500} size="sm">Change role</Text>
            </Menu.Item>
            <Menu.Item disabled icon={<FaRegTrashAlt size={16} />} color='red'>
                <Text weight={500} size="sm">Delete user</Text>
            </Menu.Item>
        </Menu>
    )
}