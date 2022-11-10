import React, { Component, ComponentType, CSSProperties, ReactNode } from 'react';
import { connect } from 'react-redux';
import BaseStore from '../Services/StateService';

export type BaseConnectorProps = {
    style?: CSSProperties;
    className?: string;
};

abstract class BaseConnectorComponent<P = {}, C = {}> extends Component<BaseConnectorProps & P & Partial<C>> {
    static defaultProps: Partial<BaseConnectorProps> = {
        style: {
            borderRadius: '5px',
        },
    };

    abstract component: ComponentType<any>;

    abstract connect(): C;

    readonly render = (): ReactNode => {
        const { style: _style } = BaseConnectorComponent.defaultProps;
        const { style, className } = this.props;
        const Comp = this.component;
        return (
            <div className={className} style={{ ..._style, ...style }}>
                <Comp {...this.connect()} />
            </div>
        );
    };
}

const BaseConnector = BaseConnectorComponent;
export default BaseConnector;

export function mapStateToProps(...stores: Array<BaseStore<any>>) {
    return function (state: any) {
        const props = {};
        stores.forEach((store) => {
            props[store.name] = state[store.name];
        });
        return props;
    };
}

export function connectState(component: ComponentType<any>, stores: Array<BaseStore<any>>) {
    return connect(mapStateToProps(...stores))(component);
}
