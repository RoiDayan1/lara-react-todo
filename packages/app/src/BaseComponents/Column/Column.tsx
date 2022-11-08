import React, { Component, ReactNode } from 'react';
import styles from './Column.module.scss';
import classNames from 'classnames';

class ColumnComponent extends Component<JSX.IntrinsicElements['div']> {
    render(): ReactNode {
        const { children, className, ...props } = this.props;
        return (
            <div className={classNames(styles.container, className)} {...props}>
                {children}
            </div>
        );
    }
}

const Column = ColumnComponent;
export default Column;
