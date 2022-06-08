import { UnstyledButton, Group, Avatar, Text, Anchor } from '@mantine/core';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';


export function UserButton({ image, name, ...others }: any) {

    return (
        <UnstyledButton sx={(theme) => ({
            display: 'block',
            width: '100%',
            padding: theme.spacing.md,
            color: theme.black,
            borderRadius: '0.25rem',
            '&:hover': {
            backgroundColor: theme.colors.gray[0],
        },
        })} {...others}>
            <Group>
                <Avatar src={image} radius="xl" />
                <div style={{ flex: 1 }}>
                    <Text size="sm" weight={500}>
                        {name}
                    </Text>
                </div>
                <FaChevronRight size={14} />
            </Group>
        </UnstyledButton>
    );
}