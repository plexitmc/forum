import { Alert as MantineAlert, Sx } from '@mantine/core';

import { BsCheckCircle, BsQuestionCircle } from 'react-icons/bs';

export interface AlertProps{
    text: string;
    type: string;
    sx?: Sx;
}

function getColorFromType(type: string){
    switch(type){
        case 'success':
            return 'green';
        case 'error':
            return 'red';
        case 'warning':
            return 'orange';
        case 'info':
            return 'blue';
        default:
            return 'blue';
    }
}

function getIconFromType(type: string){
    switch(type){
        case 'success':
            return <BsCheckCircle size={16}/>;
        case 'error':
            return <BsQuestionCircle size={16}/>;
        case 'warning':
            return <BsQuestionCircle size={16}/>;
        case 'info':
            return <BsQuestionCircle size={16}/>;
        default:
            return <BsQuestionCircle size={16}/>;
    }
} 


export default function Alert({ text, type, sx }: AlertProps){
    return (
        <MantineAlert sx={[sx]} icon={getIconFromType(type)} color={getColorFromType(type)}>{text}</MantineAlert>
    )
}