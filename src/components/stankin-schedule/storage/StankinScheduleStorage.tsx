import React from 'react';
import {
    MenuItem,
    Typography,
    FormControl,
    InputLabel,
    Select,
    SelectChangeEvent,
    Box,
    Divider,
    Grid
} from '@mui/material';

import ContentBox from 'components/common/ContentBox';
import {useSearchParams} from 'react-router-dom';
import ScheduleStorageV0 from "./v0/ScheduleStorageV0";


const StankinScheduleStorage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [version, setVersion] = React.useState('0');

    const handleVersionChange = (event: SelectChangeEvent) => {
        setVersion(event.target.value);
    };

    return (
        <ContentBox>

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Typography variant='h4' gutterBottom>
                    Хранилище расписаний
                </Typography>

                <FormControl sx={{minWidth: 160}}>
                    <InputLabel id='version-select-label'>Версия</InputLabel>
                    <Select
                        labelId='version-select-label'
                        label='Версия'
                        value={version}
                        onChange={handleVersionChange}
                    >
                        <MenuItem value='0'>Storage v0</MenuItem>
                        <MenuItem value='1'>Storage v1</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Typography paragraph>
                Расписания формата JSON, которые используются в приложении Stankin Schedule.
            </Typography>

            <Box sx={{marginTop: 1}}>
                {version === '0' ? (
                    <ScheduleStorageV0/>
                ) : (
                    <Grid container alignItems='center' justifyContent='center'>
                        <Typography>
                            На данный момент Storage v1 не доступен.
                        </Typography>
                    </Grid>
                )}
            </Box>
        </ContentBox>
    )
}

export default StankinScheduleStorage;
