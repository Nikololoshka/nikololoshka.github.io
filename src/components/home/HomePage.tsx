import React from 'react';
import ContentBox from 'components/common/ContentBox';
import {
    Typography,
    Link
} from '@mui/material'

const HomePage = () => {
    return (
        <ContentBox>
            <Typography variant='h4' gutterBottom>
                Nikolay Vereshchagin Repository
            </Typography>
            <Typography paragraph>
                Добро пожаловать на сайт репозитория <Link href='https://github.com/Nikololoshka'>Nikololoshka</Link>.
                Его автором (и разрабочиком всего здесь соответственно) являюсь я - Nikolay Vereshchagin.
                На нем представлены основные проекты и инструменты созданные мною лично. Приятного времяпрепровождения!
            </Typography>
            <Typography variant='h5' gutterBottom>
                Резюме
            </Typography>
            <Typography paragraph>
                Закончил обучение по направлению "Прикладная информатика".
                Общий опыт программирования более 4 лет.
                Позиционирую себя как мобильный разработчик приложений для Android.
                При разработке руководствуюсь принципами SOLID, понимаю шаблоны проектирования
                MVVM, MVC, MVP. Знаю алгоритмы, структуры данных, ООП.
            </Typography>
            <Typography paragraph>
                Владею такими языками программирования, как:
            </Typography>

            <ul>
                {'Java и Kotlin (Android); Python (Jupyter notebook, Numpy, Pandos, OpenCV); C++ (Qt и QML); TypeScript (React)'
                    .split('; ').map((text) =>
                        <li>
                            {text}
                        </li>
                    )
                }
            </ul>

            <Typography paragraph>
                Для мобильной разработки стэк:
            </Typography>

            <ul>
                {('Kotlin + Java; Coroutines; Android SDK; Android Jetpack; Jetpack Compose; MVVM; Retrofit2 + OkHttp3; ' +
                    'Firebase (Storage, Analytics, Crashlytics); Dagger2; Glide'
                ).split('; ').map((text) =>
                    <li>
                        {text}
                    </li>
                )}
            </ul>

        </ContentBox>
    );
}

export default HomePage;