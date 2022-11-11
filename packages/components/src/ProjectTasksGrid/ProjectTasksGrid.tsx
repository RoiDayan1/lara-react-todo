import React, { Component, ReactNode } from 'react';
import { ProjectTasksGridProps, ProjectTasksGridState } from './ProjectTasksGrid.model';
import styles from './ProjectTasksGrid.module.scss';
import { LinearProgress, Typography } from '@material-ui/core';
import ProjectTaskCard from './ProjectTaskCard/ProjectTaskCard';

class ProjectTasksGridComponent extends Component<ProjectTasksGridProps, ProjectTasksGridState> {
    state: ProjectTasksGridState = {};

    render(): ReactNode {
        const { fetchingMore, tasks, onDeleteTask, onClickTask } = this.props;

        return (
            <div className={styles.container}>
                <div className={styles.cardsContainer}>
                    {tasks?.map((task, index) => (
                        <ProjectTaskCard
                            key={index}
                            task={task}
                            onDeleteTask={onDeleteTask}
                            onClickTask={onClickTask}
                        />
                    ))}
                </div>
                {fetchingMore && <LinearProgress />}
                {!fetchingMore && !tasks?.length && (
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

const ProjectTasksGrid = ProjectTasksGridComponent;
export default ProjectTasksGrid;
