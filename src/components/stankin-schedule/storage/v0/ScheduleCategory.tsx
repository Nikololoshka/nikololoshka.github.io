import React, {FC, useEffect, useState} from 'react';
import {CategoryState, ICategoryItem} from "types/schedule-types";
import {useTypedSelector} from "hooks/use-typed-selector";
import {useActions} from "hooks/use-actions";
import {Button, CircularProgress, Grid, Typography} from "@mui/material";
import ScheduleCard from "./ScheduleCard";


interface ScheduleCategoryProps {
    categoryItem: ICategoryItem;
}

const ScheduleCategory: FC<ScheduleCategoryProps> = ({categoryItem}) => {

    const [categoryState, setCategoryState] = useState<CategoryState | null>(null);

    const {categories} = useTypedSelector(state => state.scheduleStorage);

    const {fetchCategorySchedules} = useActions();


    useEffect(() => {
        if (categories != null) {
            const newCategory = categories.find(item => item.path === categoryItem.path) ?? null;
            if (newCategory != null) {
                setCategoryState(newCategory.state);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categories]);

    useEffect(() => {
        if (categoryState != null && categoryState.schedules == null) {
            fetchCategorySchedules(categoryItem.path);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryState]);


    if (categoryState == null || categoryState.schedules == null || categoryState.loading) {
        return (
            <Grid container justifyContent='center'>
                <CircularProgress/>
            </Grid>
        )
    }

    if (categoryState.error) {
        return (
            <Grid container justifyContent='center'>
                <Typography>
                    {categoryState.error}
                </Typography>
                <Button
                    variant='outlined'
                    color='error'
                    onClick={() => fetchCategorySchedules(categoryItem.path)}
                >
                    Повторить
                </Button>
            </Grid>
        )
    }

    return (
        <div>
            <Grid container spacing={2}>
                {categoryState.schedules.map(item =>
                    <Grid key={item.name} item xs={12} md={6} lg={3}>
                        <ScheduleCard item={item} categoryPath={categoryItem.path}/>
                    </Grid>
                )}
            </Grid>
        </div>
    )
}

export default ScheduleCategory;