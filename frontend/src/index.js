import React from 'react';
import ReactDOM from 'react-dom';

import './assets/scss/global.scss';

import App from './App';

import * as serviceWorker from './serviceWorker';

// Redux
import { Provider } from 'react-redux';
import store from './store';

// Routing Wrapper
import { BrowserRouter } from "react-router-dom";

// Toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Style component theme wrapper
import { ThemeProvider } from "styled-components";

import theme from './components/UI/Theme'

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <App />
                <ToastContainer />
            </BrowserRouter>
        </ThemeProvider>
    </Provider>
    , document.getElementById('root'));

serviceWorker.unregister();
