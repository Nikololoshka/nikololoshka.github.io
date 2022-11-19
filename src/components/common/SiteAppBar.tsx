import React, { FC } from 'react'
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Tooltip,
    Icon,
} from '@mui/material';
import { GitIcon } from 'assets/images';
import './SiteAppBar.css';
import MenuIcon from '@mui/icons-material/Menu';

interface SiteAppBarProps {
    title: string;
    onDrawer: () => void;
}

const SiteAppBar: FC<SiteAppBarProps> = ({
    title, onDrawer
}) => {
    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={onDrawer}
                    edge="start"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    {title}
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Tooltip title="Go to repository">
                        <IconButton href='https://github.com/Nikololoshka/nikololoshka.github.io'>
                            <Icon><img src={GitIcon} alt='GitHub site repository' /></Icon>
                        </IconButton>
                    </Tooltip>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default SiteAppBar;