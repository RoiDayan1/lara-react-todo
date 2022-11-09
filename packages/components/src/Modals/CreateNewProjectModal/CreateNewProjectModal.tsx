import React, { Component, createRef, ReactNode } from 'react';
import styles from './CreateNewProjectModal.module.scss';
import { CreateNewProjectModalProps, CreateNewProjectModalState } from './CreateNewProjectModal.model';
import { TextField } from '@material-ui/core';
import BaseModal from '../BaseModal';
import { BaseModalButton } from '../BaseModal.model';
import { isEmpty } from 'lodash';

class CreateNewProjectModalComponent extends Component<
    CreateNewProjectModalProps,
    CreateNewProjectModalState
> {
    // it's better to use some validation library
    isValidForm: boolean = false;
    validateForm = () => {
        const errors: CreateNewProjectModalState['errors'] = {};

        const name = this.nameTF.current?.value || '';
        if (!name) errors.name = 'Name is required';
        else if (name.length < 5) errors.name = 'Name must be at least 5 characters';

        this.setState({ errors });
        this.isValidForm = isEmpty(errors);
    };

    onCreate = () => {
        this.validateForm();
        if (this.isValidForm) {
            this.props.createNewProject?.({
                name: this.nameTF.current?.value || '',
            });
        }
    };

    rightButtons: BaseModalButton[] = [
        { label: 'Cancel' },
        {
            label: 'Create',
            onClick: this.onCreate,
            modalShouldStayOpen: () => !this.isValidForm,
        },
    ];

    nameTF = createRef<HTMLInputElement>();

    state: CreateNewProjectModalState = {
        errors: {},
    };

    render(): ReactNode {
        const { errors } = this.state;

        return (
            <BaseModal title={'Create New Project'} rightButtons={this.rightButtons} {...this.props}>
                <div className={styles.container}>
                    <TextField
                        inputRef={this.nameTF}
                        className={styles.input}
                        label="Name"
                        error={!!errors.name}
                        helperText={errors.name || ' '}
                    />
                </div>
            </BaseModal>
        );
    }
}

const CreateNewProjectModal = CreateNewProjectModalComponent;
export default CreateNewProjectModal;
