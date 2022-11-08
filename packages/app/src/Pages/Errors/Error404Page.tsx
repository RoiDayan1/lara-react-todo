import React, { ReactNode } from 'react';
import BasePage from '../BasePage';
import styles from './ErrorPage.module.scss';
import NavigationService from '../../Services/NavigationService';
import { Button } from '@material-ui/core';
import t from '../../Services/DictionaryService';

export type Error404PageProps = {};

class Error404PageComponent extends BasePage<Error404PageProps> {
    static defaultProps: Partial<Error404PageProps> = {};

    async onLoad() {}

    goToRootPage = (): void => {
        NavigationService.goHome();
    };

    render(): ReactNode {
        return (
            <div className={styles.container}>
                <h1>{t('errorPages.error404Page.h')}</h1>
                <p>{t('errorPages.error404Page.p')}</p>
                <Button variant="contained" color="primary" disableElevation onClick={this.goToRootPage}>
                    {t('errorPages.backHomeButton')}
                </Button>
            </div>
        );
    }
}

const Error404Page = Error404PageComponent;
export default Error404Page;
