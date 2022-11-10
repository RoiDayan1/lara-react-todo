import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'reflect-metadata';
import 'fontsource-roboto';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import ConfigService from './Services/ConfigService';
import StylesService from './Services/StylesService';
import { ThemeProvider } from '@material-ui/core';
import { Provider } from 'react-redux';
import { store } from './Services/StateService';
import { ToastProvider, withToastManager } from 'react-toast-notifications';
import ToasterService, { ToastManager } from './Services/ToasterService';
import ModalProvider, { useModal } from 'mui-modal-provider';
import ModalService from './Services/ModalService';

import App from './App';
import UsersProvider from './Providers/users/UsersProvider';

document.title = ConfigService.appName;
console.log(
    '%c' + ConfigService.appName + '\n%c[' + ConfigService.env + '] Api URL: ' + ConfigService.apiUrl,
    'color:' + StylesService.theme.palette.primary.main + ';font-size:40px;',
    'color:' + StylesService.theme.palette.secondary.main + ';font-size:12px;'
);

///////////////////////////////////////////////////////////////////////////////////////
///////// App
//////////////////////////////////////////////////////////////////////////////////////
const IndexApp = withToastManager((props: { toastManager: ToastManager }) => {
    const modalManager = useModal();
    useEffect(() => {
        ModalService.initModalManager(modalManager);
        ToasterService.initToastManager(props.toastManager);
        UsersProvider.fetchSetGetUsers().then();
    }, []);
    return <App />;
});

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={StylesService.theme}>
            <ModalProvider>
                <ToastProvider
                    autoDismiss={ToasterService.config.autoDismiss}
                    autoDismissTimeout={ToasterService.config.autoDismissTimeout}>
                    <IndexApp />
                </ToastProvider>
            </ModalProvider>
        </ThemeProvider>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
