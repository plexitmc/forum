import { Badge, Box, Button, Checkbox, Container, Group, Menu, Paper, Switch, Table, Text, Textarea, TextInput } from "@mantine/core";
import { useState } from "react";
import Alert from "../../../components/elements/Alert";
import PageContent from "../../../components/elements/PageContent";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { FaPlus } from "react-icons/fa";
import { TbGripVertical } from 'react-icons/tb';
import { MdShortText } from 'react-icons/md';
import { BsParagraph } from "react-icons/bs";
import { BiHeading } from 'react-icons/bi';
import { GrTextAlignLeft } from "react-icons/gr";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { TbSelect } from "react-icons/tb";

import FormField from "../../../components/types/formField";

const finalFields: FormField[] = [
    {
        _id: '_1',
        type: 'shorttext',
        label: 'Hvad er dit navn?',
        description: 'For- og efternavn',
        required: true,
    },
    {
        _id: '_2',
        type: 'shorttext',
        label: 'Hvad er dit Discord Tag?',
        description: 'Fx SIMON#1386',
        required: true,
    },
    {
        _id: '_3',
        type: 'shorttext',
        label: 'Hvor gammel er du?',
        required: true,
    },
    {
        _id: '_4',
        type: 'longtext',
        label: 'Hvorfor ønsker du at være staff på Plexit?',
        required: true,
    },
]

export default function Form(){

    const [alert, setAlert] = useState({text: '', type: 'info'});

    const [fields, updateFields] = useState(finalFields);

    function handleOnDragEnd(result: any) {
      if (!result.destination) return;
  
      const items = Array.from(fields);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
  
      updateFields(items);
    }

    return (
        <PageContent admin={true} title="Admin - Form: Supporter">
            <Container size={'md'}>
                <Box mt={30}>
                    {alert.text != '' && <Alert text={alert?.text} type={alert?.type} sx={{ marginBottom: 10}} />}
                    <Paper p='md' withBorder sx={{ display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                        <Text weight={600} sx={{ fontSize: 35 }} color='dark'>Editing form</Text>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem'}}>
                            <TextInput label="Name" description="The name the user sees" placeholder="Supporter" required sx={{flexGrow: 1}}/>
                            <TextInput label="Icon" description="Find icons on fontawesome.com" placeholder="fa-solid fa-handshake-angle" sx={{flexGrow: 1}} />
                        </Box>
                        <Box>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Role</th>
                                        <th>Can create</th>
                                        <th>Can view others</th>
                                        <th>Can comment</th>
                                        <th>Can change status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><Badge color='red'>Admin</Badge></td>
                                        <td><Checkbox/></td>
                                        <td><Checkbox/></td>
                                        <td><Checkbox/></td>
                                        <td><Checkbox/></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Box>
                        <Group position="center" direction="column" mt='xl'>
                            <DragDropContext onDragEnd={handleOnDragEnd}>
                                <Droppable droppableId="fields-list" direction="vertical">
                                    {(provided) => (
                                        <div {...provided.droppableProps} ref={provided.innerRef}>
                                            {fields.map((field, index) => {
                                                return (
                                                    <Draggable key={field._id} draggableId={field._id} index={index}>
                                                        {(provided) => (
                                                            <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                borderRadius: '0.25rem',
                                                                padding: '1rem',
                                                                backgroundColor: '#f8f9fa',
                                                                gap: '1rem',
                                                                minWidth: '500px',
                                                                margin: '0.5rem 0',
                                                            }}>
                                                                <Box component={TbGripVertical} size={18} sx={{
                                                                    color: '#343a40',
                                                                    cursor: 'grab',
                                                                    '&:hover': {
                                                                        opacity: 0.9
                                                                    }
                                                                }}/>
                                                                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '0.1rem'}}>
                                                                    <TextInput placeholder='Enter a heading' variant='unstyled' size='xl' required sx={{ height: '40px !important' }} defaultValue={field.label || ''}/>
                                                                    <Textarea placeholder='Enter a description' variant='unstyled' size='sm' autosize defaultValue={field.description || ''} />
                                                                    <Switch label='Required'/>
                                                                </Box>
                                                            </Box>
                                                        )}
                                                    </Draggable>
                                                )
                                            })}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </Group>
                        <Group position='center' mt='xl'>
                            <Menu control={<Button color='primary' leftIcon={<FaPlus/>}>Add field</Button>} position='top'>
                                <Menu.Label>Content</Menu.Label>
                                <Menu.Item icon={<BsParagraph/>}>
                                    <Text weight={600}>Text</Text>
                                </Menu.Item>
                                <Menu.Item icon={<BiHeading/>}>
                                    <Text weight={600}>Heading</Text>
                                </Menu.Item>

                                <Menu.Label>Input</Menu.Label>
                                <Menu.Item icon={<MdShortText/>}>
                                    <Text weight={600}>Short Text</Text>
                                </Menu.Item>
                                <Menu.Item icon={<GrTextAlignLeft/>}>
                                    <Text weight={600}>Long Text</Text>
                                </Menu.Item>
                                <Menu.Item icon={<MdOutlineArrowDropDownCircle/>}>
                                    <Text weight={600}>Select</Text>
                                </Menu.Item>
                                <Menu.Item icon={<TbSelect/>}>
                                    <Text weight={600}>Checkbox</Text>
                                </Menu.Item>
                            </Menu>
                        </Group>
                        <Group position="right" mt="xl">
                            <Button color='red' variant="outline">Delete form</Button>
                            <Button type="submit" loading={false} variant='outline'>Save</Button>
                        </Group>
                    </Paper>
                </Box>
            </Container>
        </PageContent>
    )
}