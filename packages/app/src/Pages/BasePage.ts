import { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import NavigationService from '../Services/NavigationService';

abstract class BasePage<T = {}, S = {}> extends Component<T & RouteComponentProps, S> {
    protected constructor(props: T & RouteComponentProps) {
        super(props);
        NavigationService.routeProps = {
            history: props.history,
            location: props.location,
            match: props.match,
            staticContext: props.staticContext,
        };
        this.onLoad().then();
    }

    abstract onLoad(): Promise<void>;
}

export default BasePage;
