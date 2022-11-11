import React, { Component, ReactNode } from 'react';
import { ProjectTaskCardProps, ProjectTaskCardState } from './ProjectTaskCard.model';
import styles from './ProjectTaskCard.module.scss';
import { Card, CardActions, CardContent, IconButton, Typography } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

class ProjectTaskCardComponent extends Component<ProjectTaskCardProps, ProjectTaskCardState> {
    state: ProjectTaskCardState = {};

    render(): ReactNode {
        const { task, onDeleteTask } = this.props;

        return (
            <Card className={styles.container}>
                <CardContent>
                    <Typography variant="h6" className={styles.text}>
                        {task.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton onClick={() => onDeleteTask?.(task.id)}>
                        <DeleteForeverIcon color="secondary" />
                    </IconButton>
                </CardActions>
            </Card>
        );
    }
}

const ProjectTaskCard = ProjectTaskCardComponent;
export default ProjectTaskCard;
