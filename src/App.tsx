import React from 'react';
import { Route, Routes } from 'react-router-dom';


import {
    HomePage,
    StankinScheduleOverview,
    StankinSchedulePolicy,
    StankinScheduleTerms,
    StankinScheduleEditor,
    StankinScheduleStorage
} from 'components';

import SiteDrawer from 'components/common/SiteDrawer';


const App = () => {
    return (
        <SiteDrawer title='Nikolay Vereshchagin Repository'>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path='/stankin-schedule' element={<StankinScheduleOverview />} />
                <Route path='/stankin-schedule/terms' element={<StankinScheduleTerms />} />
                <Route path='/stankin-schedule/policy' element={<StankinSchedulePolicy />} />
                <Route path='/stankin-schedule/storage' element={<StankinScheduleStorage />} />
                <Route path='/stankin-schedule-editor' element={<StankinScheduleEditor />} />
            </Routes>
        </SiteDrawer>
    );
}

export default App;
