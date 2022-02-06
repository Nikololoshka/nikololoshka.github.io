import React from 'react';
import {
    MenuItem,
    Typography,
    FormControl,
    InputLabel,
    Select,
    SelectChangeEvent,
    Box,
    Grid,
    Link
} from '@mui/material';

import ContentBox from 'components/common/ContentBox';
import ScheduleStorageV0 from "./v0/ScheduleStorageV0";


const StankinScheduleStorage = () => {
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

                <FormControl variant='outlined' sx={{minWidth: 160}}>
                    <InputLabel id='version-select-label'>Версия</InputLabel>
                    <Select
                        labelId='version-select-label'
                        label='Версия'
                        value={version}
                        onChange={handleVersionChange}
                    >
                        <MenuItem value='0'>Storage v0</MenuItem>
                        {/*<MenuItem value='1'>Storage v1</MenuItem>*/}
                    </Select>
                </FormControl>
            </Box>

            <Typography paragraph sx={{marginTop: 1}}>
                Актуальные расписания формата JSON, которые используются в приложении Stankin Schedule.
                Архив со всеми расписаниями можно найти на&nbsp;
                <Link href="https://drive.google.com/drive/folders/1SDNHA09gC-627s4_ahDAK68xwFKmPvYe?usp=sharing">
                    Google Drive
                </Link>
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
