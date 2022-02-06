import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/store';
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
            <BrowserRouter>
                <React.StrictMode>
                    <App />
                </React.StrictMode>
            </BrowserRouter>
        </ThemeProvider>
    </Provider>,
    document.getElementById('root')
);
