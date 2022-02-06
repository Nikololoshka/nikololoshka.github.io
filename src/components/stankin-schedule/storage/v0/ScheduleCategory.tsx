import React, {FC, useEffect, useState} from 'react';
import {CategoryState, IScheduleItem} from "types/schedule-types";
import {useTypedSelector} from "hooks/use-typed-selector";
import {useActions} from "hooks/use-actions";
import {Button, CircularProgress, Grid, Typography} from "@mui/material";
import ScheduleCard from "./ScheduleCard";


interface ScheduleCategoryProps {
    categoryName: string;
}

const ScheduleCategory: FC<ScheduleCategoryProps> = ({categoryName}) => {

    const [category, setCategory] = useState<CategoryState | null>(null);

    const {categories} = useTypedSelector(state => state.scheduleStorage);

    const {fetchCategorySchedules} = useActions();


    useEffect(() => {
        if (categories != null) {
            const newCategory = categories.find(item => item.name === categoryName) ?? null;
            if (newCategory != null) {
                setCategory(newCategory.state);
            }
        }
    }, [categories]);

    useEffect(() => {
        if (category != null && category.schedules == null) {
            fetchCategorySchedules(categoryName);
        }
    }, [category]);


    if (category == null || category.schedules == null || category.loading) {
        return (
            <Grid container justifyContent='center'>
                <CircularProgress/>
            </Grid>
        )
    }

    if (category.error) {
        return (
            <Grid container justifyContent='center'>
                <Typography>
                    {category.error}
                </Typography>
                <Button
                    variant='outlined'
                    color='error'
                    onClick={() => fetchCategorySchedules(categoryName)}
                >
                    Повторить
                </Button>
            </Grid>
        )
    }

    return (
        <div>
            <Grid container spacing={2}>
                {category.schedules.map(item =>
                    <Grid key={item.name} item xs={12} md={6} lg={3}>
                        <ScheduleCard item={item} categoryPath={categoryName}/>
                    </Grid>
                )}
            </Grid>
        </div>
    )
}

export default ScheduleCategory;