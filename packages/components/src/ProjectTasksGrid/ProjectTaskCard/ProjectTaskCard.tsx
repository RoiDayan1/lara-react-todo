import React, { Component, MouseEvent, ReactNode } from 'react';
import { ProjectTaskCardProps, ProjectTaskCardState } from './ProjectTaskCard.model';
import styles from './ProjectTaskCard.module.scss';
import { Card, CardActions, CardContent, IconButton, Typography } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

class ProjectTaskCardComponent extends Component<ProjectTaskCardProps, ProjectTaskCardState> {
    state: ProjectTaskCardState = {};

    handleClickButton = (event: MouseEvent<HTMLDivElement>, taskId: number) => {
        event.stopPropagation();
        this.props.onClickTask?.(taskId);
    };

    handleDeleteButton = (event: MouseEvent<HTMLButtonElement>, taskId: number) => {
        event.stopPropagation();
        this.props.onDeleteTask?.(taskId);
    };

    render(): ReactNode {
        const { task } = this.props;

        return (
            <Card className={styles.container} onClick={(event) => this.handleClickButton(event, task.id)}>
                <CardContent>
                    <Typography variant="h6" className={styles.text}>
                        {task.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton onClick={(event) => this.handleDeleteButton(event, task.id)}>
                        <DeleteForeverIcon color="secondary" />
                    </IconButton>
                </CardActions>
            </Card>
        );
    }
}

const ProjectTaskCard = ProjectTaskCardComponent;
export default ProjectTaskCard;
