import React from 'react';
import App from './App';
import {Provider} from 'react-redux';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {HashRouter} from 'react-router-dom';
import {store} from './store/store';
import './index.css';
import ReactDOM  from "react-dom/client";


const theme = createTheme({
    palette: {
        // mode: "dark",
        // primary: {
        //     main: "#ff0000"
        // },
    },
});


const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!);
root.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <HashRouter>
                <React.StrictMode>
                    <App/>
                </React.StrictMode>
            </HashRouter>
        </ThemeProvider>
    </Provider>,
);
