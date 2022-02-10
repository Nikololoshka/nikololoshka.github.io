import React from 'react';
import {
    Grid,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Typography
} from '@mui/material';
import ContentBox from 'components/common/ContentBox';

import {
    GooglePlayBadge,
    GithubBadge,
    ScheduleDescription
} from 'assets/images';

import {
    preview1,
    preview2,
    preview3,
    preview4,
    preview5,
    preview6,
    preview7
} from 'assets/images/preview';


const StankinScheduleOverview = () => {

    const previewImages = [
        {img: preview1, title: 'Главная'},
        {img: preview2, title: 'Список расписаний'},
        {img: preview3, title: 'Просмотр расписания'},
        {img: preview4, title: 'Редактирование расписания'},
        {img: preview5, title: 'Виджет'},
        {img: preview6, title: 'Модульный журнал'},
        {img: preview7, title: 'Новости'}
    ];

    return (
        <div>
            <ContentBox sx={{background: 'url(' + ScheduleDescription + ')', backgroundSize: 'cover', padding: 3}}>
                <Typography variant='h4' gutterBottom color='common.white'>
                    Stankin Schedule
                </Typography>
                <Typography className='description' color='common.white'>
                    Stankin Schedule - это приложение для студентов МГТУ "СТАНКИН", в котором можно:
                    просматривать расписания, смотреть оценки модульного журнала и читать новости университета.
                </Typography>
                <Grid container spacing={2}>
                    <Grid item>
                        <a href='https://play.google.com/store/apps/details?id=com.vereshchagin.nikolay.stankinschedule'>
                            <img src={GooglePlayBadge} alt={'Google play'} className='badge'/>
                        </a>
                    </Grid>
                    <Grid item>
                        <a href='https://github.com/Nikololoshka/ProjectPepega'>
                            <img src={GithubBadge} alt='Github' className='badge'/>
                        </a>
                    </Grid>
                </Grid>
            </ContentBox>
            <ContentBox>
                <Typography variant='h5'>
                    Особенности
                </Typography>
                <ul>
                    <li>Расписание (создание, просмотр);</li>
                    <li>Виджет с расписанием;</li>
                    <li>Модульный журнал;</li>
                    <li>Новости университета и деканата.</li>
                </ul>
                <Typography variant='h5' gutterBottom>
                    Скриншоты
                </Typography>
                <ImageList cols={4} gap={16}>
                    {previewImages.map(({img, title}) =>
                        <ImageListItem key={img}>
                            <img src={img} srcSet={img} alt={title} loading="lazy"/>
                            <ImageListItemBar title={<b>{title}</b>} position="bottom"/>
                        </ImageListItem>
                    )}
                </ImageList>
            </ContentBox>
        </div>
    )
}

export default StankinScheduleOverview;
