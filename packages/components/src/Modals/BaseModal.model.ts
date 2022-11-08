import { ReactNode } from 'react';
import { PropTypes } from '@material-ui/core';

export interface BaseModalButton {
    label: string;
    onClick?: () => void;
    modalShouldStayOpen?: () => boolean;
    color?: PropTypes.Color;
    variant?: 'text' | 'outlined' | 'contained';
}

export type BaseModalProps = {
    open?: boolean;
    title: ReactNode;
    children: ReactNode;
    onClose?: () => void;
    leftButtons?: BaseModalButton[];
    rightButtons?: BaseModalButton[];
    fullWidth?: boolean;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
};

export interface BaseModalState {}
