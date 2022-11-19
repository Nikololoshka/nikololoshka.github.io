import React, {FC, useState} from 'react';
import {
    Drawer,
    Box,
    List,
    Toolbar,
    CssBaseline,
    ListSubheader, styled,
} from '@mui/material';
import {
    Home,
    Smartphone,
    DisplaySettings,
    More
} from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import SiteAppDrawer from './SiteAppBar';
import NavigationItem, { INavigationItem } from './NavigationItem';
import NavigationCollapseItem, { INavigationCollapseItem } from './NavigationCollapseItem';

const drawerWidth = 300;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));


interface SiteDrawerProps {
    title: string;
    children: React.ReactChild | React.ReactNode;
}

const SiteDrawer: FC<SiteDrawerProps> = ({
    title, children
}) => {

    const [isDrawerOpen, setDrawerOpen] = useState(window.innerWidth > 768);

    const location = useLocation();

    const navHome: INavigationItem = {
        text: 'Главная',
        url: '/',
        icon: Home
    };

    const navStankinScheduleEditor: INavigationItem = {
        text: 'Stankin Schedule Editor',
        url: '/stankin-schedule-editor',
        icon: DisplaySettings
    }

    const navStankinSchedule: INavigationCollapseItem = {
        text: 'Stankin Schedule',
        icon: Smartphone,
        children: [
            {
                text: 'О приложении',
                url: '/stankin-schedule'
            },
            {
                text: 'Schedule Storage',
                url: '/stankin-schedule/storage'
            },
            {
                text: 'Terms & Conditions',
                url: '/stankin-schedule/terms'
            },
            {
                text: 'Privacy Policy',
                url: '/stankin-schedule/policy'
            }
        ]
    }

    const navOtherProjects: INavigationCollapseItem = {
        text: 'Небольшие проекты',
        icon: More,
        children: [
            {
                text: 'Crochet circle',
                url: '/crochet/circle'
            },
        ]
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <SiteAppDrawer
                title={title}
                onDrawer={() => setDrawerOpen(!isDrawerOpen)} />
            <Drawer
                variant="persistent"
                anchor="left"
                open={isDrawerOpen}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <NavigationItem
                            item={navHome}
                            selectedPath={location.pathname} />
                        <ListSubheader component="div" id="nested-list-subheader">
                            Проекты
                        </ListSubheader>
                        <NavigationItem
                            item={navStankinScheduleEditor}
                            selectedPath={location.pathname} />
                        <NavigationCollapseItem
                            item={navStankinSchedule}
                            selectedPath={location.pathname} />
                        <NavigationCollapseItem
                            item={navOtherProjects}
                            selectedPath={location.pathname} />
                    </List>
                </Box>
            </Drawer>
            <Main open={isDrawerOpen} sx={{ padding: 0 }}>
                <Toolbar />
                {children}
            </Main >
        </Box>
    );
}

export default SiteDrawer;