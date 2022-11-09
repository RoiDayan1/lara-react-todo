import { createBrowserHistory } from 'history';
import { objToUrlQueryString } from '../Utils/url';
import { ComponentType, lazy, LazyExoticComponent } from 'react';
import { isString } from 'lodash';
import { RouteComponentProps } from 'react-router';

export interface NavigationOptions {
    inNewTab?: boolean;
    replace?: boolean;
    force?: boolean;
    query?: { [key: string]: any };
}

class NavigationService {
    static history = createBrowserHistory();
    static routeProps: RouteComponentProps;

    static get routeParams() {
        return NavigationService.routeProps.match.params as { [key: string]: any };
    }

    static routeIs(route: Route) {
        return NavigationService.routeProps.match.path === route.path;
    }

    static refresh() {
        NavigationService.history.go(0);
    }

    static goHome(force?: boolean) {
        NavigationService.goTo(Routes.Root, { force });
    }

    static goTo(route: Route | string, options?: NavigationOptions) {
        if (isString(route)) {
            if (/^https?:\/\//i.test(route)) {
                window.open(route, '_blank');
            }
            return;
        }

        if (
            NavigationService.history.location.pathname !== route.path ||
            options?.inNewTab ||
            options?.force
        ) {
            const url = route.path + objToUrlQueryString(options?.query);
            if (options?.inNewTab) {
                window.open(url, '_blank');
            } else if (options?.replace) {
                NavigationService.history.replace(url);
            } else {
                NavigationService.history.push(url);
            }
        }
    }
}

export default NavigationService;

export interface Route {
    path: string;
    component: LazyExoticComponent<ComponentType<any>>;
}

export class Routes {
    static Root: Route = {
        path: '/',
        component: lazy(() => import('../Pages/Root/RootPage') as any),
    };

    static ProjectsManagement: Route = {
        path: '/projects-management',
        component: lazy(() => import('../Pages/ProjectsManagement/ProjectsManagementPage') as any),
    };

    static ProjectTasks: Route = {
        path: '/projects-management/:id/tasks',
        component: lazy(() => import('../Pages/ProjectsManagement/ProjectTasks/ProjectTasksPage') as any),
    };
}
