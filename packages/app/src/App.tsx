import React, { Component, ReactNode, Suspense } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import styles from './App.module.scss';
import NavigationService, { Routes } from './Services/NavigationService';
import Error404Page from './Pages/Errors/Error404Page';

export type AppProps = {};

class AppComponent extends Component<AppProps> {
    static defaultProps: Partial<AppProps> = {};

    render(): ReactNode {
        return (
            <div className={styles.container}>
                <Router history={NavigationService.history}>
                    <Suspense fallback={<div />}>
                        <Switch>
                            {Object.keys(Routes).map((route, index) => (
                                <Route
                                    key={index}
                                    exact
                                    path={Routes[route].path}
                                    component={Routes[route].component}
                                />
                            ))}
                            <Route component={Error404Page as any} />
                        </Switch>
                    </Suspense>
                </Router>
            </div>
        );
    }
}

const App = AppComponent;
export default App;
