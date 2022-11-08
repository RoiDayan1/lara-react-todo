import React, { Component, ReactNode } from 'react';
import { TemplateProps, TemplateState } from './Template.model';
import styles from './Template.module.scss';

class TemplateComponent extends Component<TemplateProps, TemplateState> {
    state: TemplateState = {};

    render(): ReactNode {
        // const {} = this.props;
        // const {} = this.state;

        return <div className={styles.container}>Template</div>;
    }
}

const Template = TemplateComponent;
export default Template;
