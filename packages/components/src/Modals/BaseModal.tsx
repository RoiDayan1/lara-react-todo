import React, { Component, ReactNode } from 'react';
import styles from './BaseModal.module.scss';
import { BaseModalButton, BaseModalProps, BaseModalState } from './BaseModal.model';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { isString } from 'lodash';

class BaseModalComponent extends Component<BaseModalProps, BaseModalState> {
    renderButton = (button: BaseModalButton, index?: number) => {
        return (
            <Button
                key={index}
                onClick={() => {
                    button.onClick?.();
                    !button.modalShouldStayOpen?.() && this.props.onClose?.();
                }}
                color={button.color || 'secondary'}
                variant={button.variant}>
                {button.label}
            </Button>
        );
    };

    render(): ReactNode {
        const {
            open,
            title,
            onClose,
            children,
            leftButtons,
            rightButtons,
            fullWidth = true,
            maxWidth,
        } = this.props;

        const renderTitle = isString(title) ? (
            <Typography variant="h6" color="secondary">
                {title}
            </Typography>
        ) : (
            title
        );

        return (
            <Dialog open={!!open} onClose={onClose} fullWidth={fullWidth} maxWidth={maxWidth}>
                <DialogTitle disableTypography className={styles.titleContainer}>
                    <div className={styles.title}>{renderTitle}</div>
                    {onClose ? (
                        <IconButton onClick={onClose}>
                            <CloseIcon color="secondary" />
                        </IconButton>
                    ) : null}
                </DialogTitle>
                <DialogContent dividers>{children}</DialogContent>
                {(leftButtons?.length || rightButtons?.length) && (
                    <div className={styles.actionsContainer}>
                        <DialogActions>{leftButtons?.map(this.renderButton)}</DialogActions>
                        <DialogActions>{rightButtons?.map(this.renderButton)}</DialogActions>
                    </div>
                )}
            </Dialog>
        );
    }
}

const BaseModal = BaseModalComponent;
export default BaseModal;
