import BaseConnector, { connectState } from '../BaseConnector';
import BaseStore from '../../Services/StateService';
import AppHeader from '@roid/components/src/AppHeader/AppHeader';
import { AppHeaderProps } from '@roid/components/src/AppHeader/AppHeader.model';
import ConfigService from '../../Services/ConfigService';
import NavigationService from '../../Services/NavigationService';

const stores: Array<BaseStore<any>> = [];

export type AppHeaderConnectorProps = {};

class AppHeaderConnectorComponent extends BaseConnector<AppHeaderConnectorProps, AppHeaderProps> {
    readonly component = AppHeader;

    connect(): AppHeaderProps {
        return {
            appName: ConfigService.appName,
            onHomeClick: () => NavigationService.goHome(),
        };
    }
}

const AppHeaderConnector = connectState(AppHeaderConnectorComponent, stores);
export default AppHeaderConnector;
