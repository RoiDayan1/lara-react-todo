import React, { ComponentType, ReactNode } from 'react';
import BasePage from '../BasePage';
import styles from './RootPage.module.scss';
import HomeMenuConnector from '../../Connectors/HomeMenuConnector/HomeMenuConnector';

export type RootPageProps = {};

class RootPageComponent extends BasePage<RootPageProps> {
    static defaultProps: Partial<RootPageProps> = {};

    async onLoad() {}

    render(): ReactNode {
        return (
            <div className={styles.container}>
                <HomeMenuConnector style={{ width: '60%', height: '80%' }} />
            </div>
        );
    }
}

const RootPage = RootPageComponent;
export default RootPage as unknown as ComponentType;
