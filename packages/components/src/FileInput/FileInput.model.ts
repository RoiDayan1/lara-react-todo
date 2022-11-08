import { PropTypes } from '@material-ui/core';
import { ReactNode } from 'react';
import * as React from 'react';

export type FileInputProps = {
    className?: string;
    inputClassName?: string;
    labelClassName?: string;
    buttonClassName?: string;
    filesClassName?: string;
    inputRef?: React.Ref<any>;
    color?: PropTypes.Color;
    variant?: 'text' | 'outlined' | 'contained';
    accept?: string;
    multiple?: boolean;
    label?: string;
    icon?: ReactNode;
    onChange?: (files: File[]) => void;
};

export interface FileInputState {
    files: File[];
}
