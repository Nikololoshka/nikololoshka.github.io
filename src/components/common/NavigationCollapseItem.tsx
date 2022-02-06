import React, { FC, useState } from 'react'
import {
    Collapse,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material'
import {
    ExpandLess,
    ExpandMore
} from '@mui/icons-material'
import { NavLink } from 'react-router-dom'


export interface INavigationCollapseItemChild {
    text: string;
    url: string;
}

export interface INavigationCollapseItem {
    text: string;
    icon: any;
    children: INavigationCollapseItemChild[]
}

interface NavigationCollapseItemProps {
    item: INavigationCollapseItem;
    selectedPath: string;
}

const NavigationCollapseItem: FC<NavigationCollapseItemProps> = ({ item, selectedPath }) => {

    const [open, setOpen] = useState(item.children.some((child) => child.url === selectedPath));
    const handleClick = () => { setOpen(!open); };

    return (
        <div>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    {React.createElement(item.icon)}
                </ListItemIcon>
                <ListItemText primary={item.text} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {item.children.map(({ text, url }) => 
                        <ListItemButton
                            key={url}
                            to={url}
                            selected={url === selectedPath}
                            component={NavLink}
                            sx={{ pl: 4 }}
                        >
                            <ListItemText primary={text} />
                        </ListItemButton>
                    )}
                </List>
            </Collapse>
        </div>
    )
}

export default NavigationCollapseItem
