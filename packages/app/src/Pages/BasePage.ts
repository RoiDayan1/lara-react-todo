import { Component } from 'react';

abstract class BasePage<T = {}, S = {}> extends Component<T, S> {
    protected constructor(props: T) {
        super(props);
        this.onLoad().then();
    }

    abstract onLoad(): Promise<void>;
}

export default BasePage;
