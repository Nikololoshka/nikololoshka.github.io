import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    CircularProgress,
    Grid,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';
import {useTypedSelector} from "hooks/use-typed-selector";
import {useActions} from "hooks/use-actions";
import TabPanel from "components/common/TabPanel";
import ScheduleCategory from "./ScheduleCategory";


const ScheduleStorageV0 = () => {

    const [tab, setTab] = useState(0);
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };


    const {categories, loading, error} = useTypedSelector(state => state.scheduleStorage)
    const {fetchScheduleStorage} = useActions()

    useEffect(() => {
        if (categories == null) {
            fetchScheduleStorage();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categories]);

    if (loading) {
        return (
            <Grid container justifyContent='center'>
                <CircularProgress/>
            </Grid>
        )
    }

    if (error) {
        return (
            <Grid container justifyContent='center'>
                <Typography>
                    {error}
                </Typography>
                <Button variant='outlined' color='error' onClick={fetchScheduleStorage}>
                    Повторить
                </Button>
            </Grid>
        )
    }

    return (
        <div>
            <Box sx={{borderBottom: 1, borderColor: 'divider', marginBottom: 2}}>
                <Tabs value={tab} onChange={handleTabChange} aria-label="tabs">
                    {categories?.map(category => (
                        <Tab key={category.name} label={category.name}  />
                    ))}
                </Tabs>
            </Box>

            {categories?.map((category, index) => (
                <TabPanel key={index} index={index} value={tab} >
                    <ScheduleCategory categoryItem={category} />
                </TabPanel>
            ))}
        </div>
    )
}

export default ScheduleStorageV0;