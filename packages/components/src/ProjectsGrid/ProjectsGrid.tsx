import React, { Component, ReactNode } from 'react';
import { ProjectsGridProps, ProjectsGridState } from './ProjectsGrid.model';
import styles from './ProjectsGrid.module.scss';
import { LinearProgress, Typography } from '@material-ui/core';
import ProjectCard from './ProjectCard/ProjectCard';

class ProjectsGridComponent extends Component<ProjectsGridProps, ProjectsGridState> {
    state: ProjectsGridState = {};

    render(): ReactNode {
        const { fetchingMore, projects, onDeleteProject, onClickProject } = this.props;

        return (
            <div className={styles.container}>
                <div className={styles.cardsContainer}>
                    {projects?.map((project, index) => (
                        <ProjectCard
                            key={index}
                            project={project}
                            onDeleteProject={onDeleteProject}
                            onClickProject={onClickProject}
                        />
                    ))}
                </div>
                {fetchingMore && <LinearProgress />}
                {!fetchingMore && !projects?.length && (
                    <div className={styles.noResults}>
                        <Typography variant="h6" color="secondary">
                            No Results
                        </Typography>
                    </div>
                )}
            </div>
        );
    }
}

const ProjectsGrid = ProjectsGridComponent;
export default ProjectsGrid;
