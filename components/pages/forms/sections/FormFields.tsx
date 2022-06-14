import { Paper, Box, Text, TextInput, Table, Badge, Checkbox, Group, Textarea, Switch, Menu, Button } from "@mantine/core";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { BiHeading } from "react-icons/bi";
import { BsParagraph } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { GrTextAlignLeft } from "react-icons/gr";
import { MdShortText, MdOutlineArrowDropDownCircle } from "react-icons/md";
import { TbGripVertical, TbSelect } from "react-icons/tb";
import FormField from "../../../types/formField"

export default function FormFields({ fields: startFields }: { fields: FormField[] | undefined }) {


    const [fields, updateFields] = useState(startFields || []);

    function handleOnDragEnd(result: any) {
      if (!result.destination) return;
  
      const items = Array.from(fields);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
  
      updateFields(items);
    }

    return (
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
    )
}