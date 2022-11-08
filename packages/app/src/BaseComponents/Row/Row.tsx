import React, { Component, ReactNode } from 'react';
import styles from './Row.module.scss';
import classNames from 'classnames';

class RowComponent extends Component<JSX.IntrinsicElements['div']> {
    render(): ReactNode {
        const { children, className, ...props } = this.props;
        return (
            <div className={classNames(styles.container, className)} {...props}>
                {children}
            </div>
        );
    }
}

const Row = RowComponent;
export default Row;
