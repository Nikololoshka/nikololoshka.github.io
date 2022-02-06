import React from 'react'
import {
    Typography
} from '@mui/material'
import ContentBox from 'components/common/ContentBox';

const StankinScheduleEditor = () => {
    return (
        <ContentBox>
            <Typography variant='h4' gutterBottom>
                Stankin Schedule Editor
            </Typography>

            <Typography paragraph>
                <b>StankinScheduleEditor2</b> - не официальный редактор и генератор
                еженедельного расписания для МГТУ "СТАНКИН".
            </Typography>

            <Typography paragraph>
                Цель создания проекта - это возможность перевода расписаний из PDF в JSON с
                последующей генерации альтернативного (еженедельного, с дополнениями и т.п.)
                расписания или использование получаемых JSON в других
                программах (например, при создании расписания для Google Calendar).
            </Typography>

        </ContentBox>
    )
}

export default StankinScheduleEditor
