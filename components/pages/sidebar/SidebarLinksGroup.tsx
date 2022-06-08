import React, { useState } from 'react';
import { Group, Box, Collapse, ThemeIcon, Text, UnstyledButton, createStyles, Anchor } from '@mantine/core';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: 'block',
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    color: theme.black,
    fontSize: theme.fontSizes.sm,
    borderRadius: '0.25rem',

    '&:hover': {
      backgroundColor: theme.colors.gray[0],
      color: theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: 'block',
    textDecoration: 'none',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 31,
    marginLeft: 30,
    fontSize: theme.fontSizes.sm,
    color: theme.colors.gray[7],
    borderLeft: `1px solid ${theme.colors.gray[3]}`,

    '&:hover': {
      backgroundColor: theme.colors.gray[0],
      color: theme.black,
    },
  },

  chevron: {
    transition: 'transform 200ms ease',
  },
}));

interface LinksGroupProps {
  icon: any;
  label: string;
  link?: string,
  links?: { label: string; link: string }[];
}

export default function LinksGroup({ icon: Icon, label, link, links }: LinksGroupProps) {
    const { classes, theme } = useStyles();
    const hasLinks = Array.isArray(links);
    const [opened, setOpened] = useState(false);
    const ChevronIcon = theme.dir === 'ltr' ? FaChevronRight : FaChevronLeft;
    const items = (hasLinks ? links : []).map((link) => (
        <Text<'a'>
            component="a"
            className={classes.link}
            href={link.link}
            key={link.label}
            onClick={(event) => event.preventDefault()}
        >
            {link.label}
        </Text>
    ));

    return (
        <>
            { link ? 
                <>
                    <UnstyledButton className={classes.control}>
                        <Anchor component={Link} href={link}>
                            <Group position="apart" spacing={0}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <ThemeIcon variant="light" size={30}>
                                        <Icon size={18} />
                                    </ThemeIcon>
                                    <Box ml="md">{label}</Box>
                                </Box>
                            </Group>
                        </Anchor>  
                    </UnstyledButton>              
                </>
            :
                <>
                    <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
                        <Group position="apart" spacing={0}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <ThemeIcon variant="light" size={30}>
                                    <Icon size={18} />
                                </ThemeIcon>
                                <Box ml="md">{label}</Box>
                            </Box>
                            {hasLinks && (
                                <ChevronIcon
                                    className={classes.chevron}
                                    size={14}
                                    style={{
                                        transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
                                    }}
                                />
                            )}
                        </Group>
                    </UnstyledButton>
                    {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
                </>
            }
        </>
    );
}