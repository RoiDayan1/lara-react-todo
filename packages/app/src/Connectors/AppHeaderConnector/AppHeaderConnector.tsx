import BaseConnector, { connectState } from '../BaseConnector';
import BaseStore from '../../Services/StateService';
import AppHeader from '@roid/components/src/AppHeader/AppHeader';
import { AppHeaderProps } from '@roid/components/src/AppHeader/AppHeader.model';
import ConfigService from '../../Services/ConfigService';
import NavigationService, { Routes } from '../../Services/NavigationService';

const stores: Array<BaseStore<any>> = [];

export type AppHeaderConnectorProps = {};

class AppHeaderConnectorComponent extends BaseConnector<AppHeaderConnectorProps, AppHeaderProps> {
    readonly component = AppHeader;

    get onHomeClick() {
        if (!NavigationService.routeIs(Routes.Root)) return () => NavigationService.goHome();
        return undefined;
    }

    get onBackClick() {
        if (NavigationService.routeIs(Routes.ProjectTasks))
            return () => NavigationService.goToProjectsManagement();
        return undefined;
    }

    connect(): AppHeaderProps {
        return {
            ...this.props,
            appName: ConfigService.appName,
            onHomeClick: this.onHomeClick,
            onBackClick: this.onBackClick,
        };
    }
}

const AppHeaderConnector = connectState(AppHeaderConnectorComponent, stores);
export default AppHeaderConnector;
