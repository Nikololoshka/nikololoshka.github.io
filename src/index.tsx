import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {HashRouter} from 'react-router-dom';
import {store} from './store/store';
import './index.css';


const theme = createTheme({
    palette: {
        // mode: "dark",
        // primary: {
        //     main: "#ff0000"
        // },
    },
});


ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <HashRouter>
                <React.StrictMode>
                    <App/>
                </React.StrictMode>
            </HashRouter>
        </ThemeProvider>
    </Provider>,
    document.getElementById('root')
);
