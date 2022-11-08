import React, { Component, createRef, ReactNode } from 'react';
import styles from './FileInput.module.scss';
import { FileInputProps, FileInputState } from './FileInput.model';
import { uniqueId } from 'lodash';
import { Button, IconButton, Typography } from '@material-ui/core';
import { AttachFile, Close } from '@material-ui/icons';
import classNames from 'classnames';
import TextWithTooltip from '../TextWithTooltip/TextWithTooltip';

class FileInputComponent extends Component<FileInputProps, FileInputState> {
    uniqueId = uniqueId('file-input-');
    state: FileInputState = {
        files: [],
    };

    fileInput = createRef<HTMLInputElement>();

    handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const files = Array.from(event.target.files || []);
        if (this.fileInput.current) this.fileInput.current.value = '';
        this.setState({ files });
        this.props.onChange?.(files);
    };

    handleRemoveFile = (index: number): void => {
        const { files } = this.state;
        files.splice(index, 1);
        this.setState({ files });
        this.props.onChange?.(files);
    };

    render(): ReactNode {
        const {
            className,
            inputClassName,
            labelClassName,
            buttonClassName,
            filesClassName,
            accept,
            multiple,
            variant,
            color,
            label,
            icon,
            children,
        } = this.props;
        const { files } = this.state;

        return (
            <div className={classNames(styles.container, className)}>
                <div>
                    <input
                        ref={this.fileInput}
                        id={this.uniqueId}
                        type="file"
                        hidden
                        className={inputClassName}
                        onChange={this.handleFileSelected}
                        accept={accept}
                        multiple={multiple}
                    />
                </div>
                <label htmlFor={this.uniqueId} className={labelClassName}>
                    <Button
                        className={classNames(styles.button, buttonClassName)}
                        component="span"
                        variant={variant || 'contained'}
                        color={color || 'primary'}
                        endIcon={icon || <AttachFile />}>
                        {children || label || 'Upload'}
                    </Button>
                </label>
                <div className={classNames(styles.files, filesClassName)}>
                    {files.map((file, index) => (
                        <TextWithTooltip key={index} amountOfLines={1} tooltipContent={file.name}>
                            <Typography className={styles.file} color="secondary">
                                <span className={styles.fileName}>{file.name}</span>
                                <IconButton
                                    size="small"
                                    className={styles.removeIcon}
                                    onClick={() => this.handleRemoveFile(index)}>
                                    <Close fontSize="inherit" color="secondary" />
                                </IconButton>
                            </Typography>
                        </TextWithTooltip>
                    ))}
                </div>
            </div>
        );
    }
}

const FileInput = FileInputComponent;
export default FileInput;
