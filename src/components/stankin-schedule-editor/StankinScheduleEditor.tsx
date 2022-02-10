import React from 'react'
import {
    Grid,
    Link,
    Typography
} from '@mui/material'
import ContentBox from 'components/common/ContentBox';
import {
    GithubBadge,
    ScheduleDescription,
    ScheduleEditorDescription
} from "assets/images";

const StankinScheduleEditor = () => {
    return (
        <div>
            <ContentBox sx={{background: 'url(' + ScheduleDescription + ')', backgroundSize: 'cover', padding: 3}}>
                <Typography variant='h4' gutterBottom color='common.white'>
                    Stankin Schedule Editor
                </Typography>

                <Typography className='description' color='common.white'>
                    StankinScheduleEditor2 - не официальный редактор и генератор
                    еженедельного расписания для МГТУ "СТАНКИН".
                </Typography>

                <Grid container spacing={2}>
                    <Grid item>
                        <a href='https://github.com/Nikololoshka/StankinScheduleEditor2'>
                            <img src={GithubBadge} alt='Github' className='badge'/>
                        </a>
                    </Grid>
                </Grid>
            </ContentBox>

            <ContentBox>
                <Typography paragraph>
                    Цель создания проекта - это возможность перевода расписаний из PDF в JSON с
                    последующей генерации альтернативного (еженедельного, с дополнениями и т.п.)
                    расписания или использование получаемых JSON в других
                    программах (например, при создании расписания для Google Calendar).
                </Typography>

                <Typography variant='h5'>
                    Особенности
                </Typography>
                <ul>
                    <li>Парсинг расписаний из PDF;</li>
                    <li>Создание и редактирование расписаний;</li>
                    <li>Генерация расписания.</li>
                </ul>

                <Typography variant='h5' gutterBottom>
                    Архив понедельного расписания
                </Typography>
                <Typography paragraph>
                    Начиная с <b>2022 года</b> понедельные расписания больше не выпускаются.
                    Архив с последними расписаниями на семестры можно найти на&nbsp;
                    <Link href='https://drive.google.com/drive/folders/1bt6Lke3yONmCtqx_lvmaNruFxPSlHdEy?usp=sharing'>
                        Google Drive
                    </Link>
                </Typography>

                <Typography variant='h5' gutterBottom>
                    Скриншоты
                </Typography>
                <img
                    src={ScheduleEditorDescription}
                    alt='Общий вид программы'
                    style={{
                        objectFit: 'scale-down',
                        width: '100%',
                        maxHeight: '800px'
                    }}
                />
            </ContentBox>
        </div>
    )
}

export default StankinScheduleEditor
