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


interface SiteAppBarProps {
    title: string;
}

const SiteAppBar: FC<SiteAppBarProps> = ({
    title
}) => {
    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
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