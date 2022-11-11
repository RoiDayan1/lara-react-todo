import React, { Component, MouseEvent, ReactNode } from 'react';
import { ProjectCardProps, ProjectCardState } from './ProjectCard.model';
import styles from './ProjectCard.module.scss';
import { Card, CardActions, CardContent, IconButton, Typography } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

class ProjectCardComponent extends Component<ProjectCardProps, ProjectCardState> {
    state: ProjectCardState = {};

    handleClickButton = (event: MouseEvent<HTMLDivElement>, projectId: number) => {
        event.stopPropagation();
        this.props.onClickProject?.(projectId);
    };

    handleDeleteButton = (event: MouseEvent<HTMLButtonElement>, projectId: number) => {
        event.stopPropagation();
        this.props.onDeleteProject?.(projectId);
    };

    render(): ReactNode {
        const { project } = this.props;

        return (
            <Card className={styles.container} onClick={(event) => this.handleClickButton(event, project.id)}>
                <CardContent>
                    <Typography variant="h6" className={styles.text}>
                        {project.name}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton onClick={(event) => this.handleDeleteButton(event, project.id)}>
                        <DeleteForeverIcon color="secondary" />
                    </IconButton>
                </CardActions>
            </Card>
        );
    }
}

const ProjectCard = ProjectCardComponent;
export default ProjectCard;
