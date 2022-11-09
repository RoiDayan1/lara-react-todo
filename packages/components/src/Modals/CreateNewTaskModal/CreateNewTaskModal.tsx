import React, { Component, createRef, ReactNode } from 'react';
import styles from './CreateNewTaskModal.module.scss';
import { CreateNewTaskModalProps, CreateNewTaskModalState } from './CreateNewTaskModal.model';
import { TextField } from '@material-ui/core';
import BaseModal from '../BaseModal';
import { BaseModalButton } from '../BaseModal.model';
import { isEmpty } from 'lodash';
import { TaskState } from '@roid/models/src/tasks.model';

class CreateNewTaskModalComponent extends Component<CreateNewTaskModalProps, CreateNewTaskModalState> {
    // it's better to use some validation library
    isValidForm: boolean = false;
    validateForm = () => {
        const errors: CreateNewTaskModalState['errors'] = {};

        const description = this.descriptionTF.current?.value || '';
        if (!description) errors.description = 'Description is required';
        else if (description.length < 5) errors.description = 'Description must be at least 5 characters';

        this.setState({ errors });
        this.isValidForm = isEmpty(errors);
    };

    onCreate = () => {
        this.validateForm();
        if (this.isValidForm) {
            this.props.createNewTask?.({
                description: this.descriptionTF.current?.value || '',
                state: TaskState.Todo,
                views: 1,
                project_id: this.props.projectId,
                user_id: 1,
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

    descriptionTF = createRef<HTMLInputElement>();

    state: CreateNewTaskModalState = {
        errors: {},
    };

    render(): ReactNode {
        const { errors } = this.state;

        return (
            <BaseModal title={'Create New Task'} rightButtons={this.rightButtons} {...this.props}>
                <div className={styles.container}>
                    <TextField
                        inputRef={this.descriptionTF}
                        className={styles.input}
                        multiline={true}
                        label="Description"
                        error={!!errors.description}
                        helperText={errors.description || ' '}
                    />
                </div>
            </BaseModal>
        );
    }
}

const CreateNewTaskModal = CreateNewTaskModalComponent;
export default CreateNewTaskModal;
