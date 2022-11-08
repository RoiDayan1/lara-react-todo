import BaseConnector, { connectState } from '../BaseConnector';
import BaseStore from '../../Services/StateService';
import HomeMenu from '@roid/components/src/HomeMenu/HomeMenu';
import { AccordionSection, HomeMenuProps } from '@roid/components/src/HomeMenu/HomeMenu.model';
import NavigationService, { Routes } from '../../Services/NavigationService';

const stores: Array<BaseStore<any>> = [];

export type HomeMenuConnectorProps = {};

class HomeMenuConnectorComponent extends BaseConnector<HomeMenuConnectorProps, HomeMenuProps> {
    readonly component = HomeMenu;

    accordionSections: AccordionSection[] = [
        {
            title: 'Projects Management',
            subtitle: 'managing projects',
            details:
                'The Projects management, where all the magic of managing projects happens.\nBe a Projects manager!',
            button: {
                text: 'Go To Projects Management',
                action: () => NavigationService.goTo(Routes.ProjectsManagement),
            },
        },
        {
            title: 'About Me',
            subtitle: 'Roi Dayan',
            details:
                'Throughout my career, I have developed web applications and multi-platform mobile applications. Whenever I develop a product, I aim to write clean, readable and efficient code, both server-side and client-side, to ensure an excellent developer and user experience.',
            button: {
                text: 'Go To roidayan.net',
                action: () => NavigationService.goTo('https://roidayan.net/'),
                color: 'secondary',
            },
        },
        {
            title: 'About The Company',
            subtitle: '360 AFFILIATES',
            details:
                'We are an affiliate network whose core team consists of individuals who are dedicated, passionate, and amazingly skilled at what they do!',
            button: {
                text: 'Go To 360affiliates.network',
                action: () => NavigationService.goTo('https://360affiliates.network/'),
                color: 'secondary',
            },
        },
    ];

    connect(): HomeMenuProps {
        return {
            accordionSections: this.accordionSections,
        };
    }
}

const HomeMenuConnector = connectState(HomeMenuConnectorComponent, stores);
export default HomeMenuConnector;
