import React, { Component, ReactNode } from 'react';
import styles from './ViewTaskModal.module.scss';
import { ViewTaskModalProps, ViewTaskModalState } from './ViewTaskModal.model';
import { Typography } from '@material-ui/core';
import BaseModal from '../BaseModal';
import { BaseModalButton } from '../BaseModal.model';
import EntitySelectConnector from '@roid/app/src/Connectors/EntitySelectConnector/EntitySelectConnector';
import { TaskState } from '@roid/models/src/tasks.model';

class ViewTaskModalComponent extends Component<ViewTaskModalProps, ViewTaskModalState> {
    get rightButtons(): BaseModalButton[] {
        return [{ label: 'Close' }];
    }

    get leftButtons(): BaseModalButton[] {
        return this.props.task.state === TaskState.Todo
            ? [
                  {
                      label: 'Mark As Done',
                      onClick: () => this.props.onUpdate?.({ state: TaskState.Done }),
                      modalShouldStayOpen: () => true,
                  },
              ]
            : [];
    }

    state: ViewTaskModalState = {};

    render(): ReactNode {
        const { task } = this.props;

        return (
            <BaseModal
                title={`Task ${task.id}`}
                leftButtons={this.leftButtons}
                rightButtons={this.rightButtons}
                {...this.props}>
                <div className={styles.container}>
                    <Typography variant="h5" className={styles.text}>
                        {task.description}
                    </Typography>
                    <Typography variant="subtitle2">Views: {task.views}</Typography>
                    <Typography variant="subtitle2">State: {task.state}</Typography>
                    <EntitySelectConnector value={task.user_id} readOnly={true} />
                </div>
            </BaseModal>
        );
    }
}

const ViewTaskModal = ViewTaskModalComponent;
export default ViewTaskModal;
