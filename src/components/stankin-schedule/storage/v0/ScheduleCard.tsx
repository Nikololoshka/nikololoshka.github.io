import React, {FC} from 'react';
import {
    Box,
    Card,
    IconButton,
    Typography
} from "@mui/material";
import {
    IScheduleItem
} from 'types/schedule-types';
import DownloadIcon from '@mui/icons-material/Download';
import {getStorageV0Schedule} from 'api/firebase-storage';


interface ScheduleCardProps {
    categoryPath: string;
    item: IScheduleItem;
}

const ScheduleCard: FC<ScheduleCardProps> = ({categoryPath, item}) => {

    return (
        <Card variant="outlined">
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 1.5
            }}>
                <Typography variant="subtitle1" sx={{ padding: '5px' }}>
                    {item.name}
                </Typography>
                <IconButton aria-label="download" size="small" onClick={() => {
                    getStorageV0Schedule(categoryPath, item.path);
                }}>
                     <DownloadIcon />
                </IconButton>
            </Box>
        </Card>
    )
}

export default ScheduleCard;
