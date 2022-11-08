import React, { Component, ReactNode } from 'react';
import { ProjectCardProps, ProjectCardState } from './ProjectCard.model';
import styles from './ProjectCard.module.scss';
import { Card, CardActions, CardContent, IconButton, Typography } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

class ProjectCardComponent extends Component<ProjectCardProps, ProjectCardState> {
    state: ProjectCardState = {};

    render(): ReactNode {
        const { project, onDeleteProject } = this.props;

        return (
            <Card className={styles.container}>
                <CardContent>
                    <Typography variant="h6" className={styles.text}>
                        {project.name}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton onClick={() => onDeleteProject?.(project.id)}>
                        <DeleteForeverIcon color="secondary" />
                    </IconButton>
                </CardActions>
            </Card>
        );
    }
}

const ProjectCard = ProjectCardComponent;
export default ProjectCard;
