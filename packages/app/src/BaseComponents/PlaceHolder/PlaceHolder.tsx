import React, { Component, ReactNode } from 'react';
import styles from './PlaceHolder.module.scss';
import BaseConnector, { BaseConnectorProps } from '../../Connectors/BaseConnector';
import StylesService from '../../Services/StylesService';

export type PlaceHolderProps = {
    title?: string;
};

class PlaceHolderComponent extends Component<BaseConnectorProps & PlaceHolderProps> {
    static defaultProps: Partial<BaseConnectorProps> = BaseConnector.defaultProps;

    render(): ReactNode {
        const { style: _style } = PlaceHolderComponent.defaultProps;
        const { style, title } = this.props;
        return (
            <div className={styles.container} style={{ ..._style, ...style }}>
                <svg style={{ width: '100%', height: '100%' }}>
                    <line
                        x1="1%"
                        y1="99%"
                        x2="99%"
                        y2="1%"
                        style={{ stroke: StylesService.colors.primary, strokeWidth: 2 }}
                    />
                    <line
                        x1="1%"
                        y1="1%"
                        x2="99%"
                        y2="99%"
                        style={{ stroke: StylesService.colors.primary, strokeWidth: 2 }}
                    />
                </svg>
                {title && <div className={styles.title}>{title}</div>}
            </div>
        );
    }
}

const PlaceHolder = PlaceHolderComponent;
export default PlaceHolder;
