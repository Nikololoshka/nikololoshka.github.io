import React, { FC } from 'react'
import {
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material'
import { NavLink } from 'react-router-dom'


export interface INavigationItem {
    text: string;
    url: string;
    icon: any
}

interface NavigationItemProps {
    item: INavigationItem;
    selectedPath: string;
}

const NavigationItem: FC<NavigationItemProps> = ({
    item, selectedPath
}) => {
    return (
        <ListItemButton
            component={NavLink}
            to={item.url}
            selected={item.url === selectedPath}
        >
            <ListItemIcon>
                {React.createElement(item.icon)}
            </ListItemIcon>
            <ListItemText primary={item.text} />
        </ListItemButton>
    )
}

export default NavigationItem;
