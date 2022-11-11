import React, { Component, ReactNode } from 'react';
import styles from './VerificationModal.module.scss';
import { VerificationModalProps, VerificationModalState } from './VerificationModal.model';
import BaseModal from '../BaseModal';
import { BaseModalButton } from '../BaseModal.model';

class VerificationModalComponent extends Component<VerificationModalProps, VerificationModalState> {
    get rightButtons(): BaseModalButton[] {
        return [
            { label: this.props.labelNo || 'No' },
            {
                label: this.props.labelYes || 'Yes',
                onClick: this.props.onYes,
            },
        ];
    }

    render(): ReactNode {
        const { message } = this.props;

        return (
            <BaseModal rightButtons={this.rightButtons} {...this.props}>
                <div className={styles.container}>{message}</div>
            </BaseModal>
        );
    }
}

const VerificationModal = VerificationModalComponent;
export default VerificationModal;
