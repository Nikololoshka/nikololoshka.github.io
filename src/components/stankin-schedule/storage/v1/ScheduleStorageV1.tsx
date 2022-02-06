import React, {useEffect} from 'react';
import {
    Box, Button,
    CircularProgress,
    Grid,
    Typography
} from '@mui/material';

import ContentBox from 'components/common/ContentBox';
import {useSearchParams} from 'react-router-dom';
import {useTypedSelector} from "hooks/use-typed-selector";
import {useActions} from "hooks/use-actions";


const ScheduleStorageV1 = () => {

    /*
    const {storage, loading, error} = useTypedSelector(state => state.scheduleStorage)
    const {fetchScheduleStorage} = useActions()

    useEffect(() => {
        if (storage == null) {
            fetchScheduleStorage();
        }
    });
    */

    return (
        <div></div>
    )
}

export default ScheduleStorageV1;