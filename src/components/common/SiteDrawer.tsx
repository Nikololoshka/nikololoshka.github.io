import React, { FC } from 'react';
import {
    Drawer,
    Box,
    List,
    Toolbar,
    CssBaseline,
    ListSubheader,
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

interface SiteDrawerProps {
    title: string;
    children: React.ReactChild | React.ReactNode;
}

const SiteDrawer: FC<SiteDrawerProps> = ({
    title, children
}) => {

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

        ]
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <SiteAppDrawer title={title} />
            <Drawer
                variant="permanent"
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
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}

export default SiteDrawer;