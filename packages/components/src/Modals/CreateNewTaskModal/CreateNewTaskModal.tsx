import React, { Component, createRef, ReactNode } from 'react';
import styles from './CreateNewTaskModal.module.scss';
import { CreateNewTaskModalProps, CreateNewTaskModalState } from './CreateNewTaskModal.model';
import { TextField } from '@material-ui/core';
import BaseModal from '../BaseModal';
import { BaseModalButton } from '../BaseModal.model';
import { isEmpty } from 'lodash';
import { TaskState } from '@roid/models/src/tasks.model';
import EntitySelectConnector from '@roid/app/src/Connectors/EntitySelectConnector/EntitySelectConnector';

class CreateNewTaskModalComponent extends Component<CreateNewTaskModalProps, CreateNewTaskModalState> {
    // it's better to use some validation library
    isValidForm: boolean = false;
    validateForm = () => {
        const errors: CreateNewTaskModalState['errors'] = {};

        const description = this.descriptionTF.current?.value || '';
        if (!description) errors.description = 'Description is required';
        else if (description.length < 5) errors.description = 'Description must be at least 5 characters';

        const user_id = this.state.userIdSelect || '';
        if (!user_id) errors.user_id = 'User is required';

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
                user_id: this.state.userIdSelect,
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
        userIdSelect: undefined,
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
                    <EntitySelectConnector
                        value={this.state.userIdSelect}
                        label="User"
                        onSelect={(id: number) => this.setState({ userIdSelect: id })}
                        error={!!errors.user_id}
                        helperText={errors.user_id || ' '}
                    />
                </div>
            </BaseModal>
        );
    }
}

const CreateNewTaskModal = CreateNewTaskModalComponent;
export default CreateNewTaskModal;
