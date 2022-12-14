import React, { ReactNode } from 'react';
import BasePage from '../../BasePage';
import styles from './ProjectTasksPage.module.scss';
import Column from '../../../BaseComponents/Column/Column';
import { Container } from '@material-ui/core';
import AppHeaderConnector from '../../../Connectors/AppHeaderConnector/AppHeaderConnector';
import GridHeaderConnector from '../../../Connectors/GridHeaderConnector/GridHeaderConnector';
import NavigationService from '../../../Services/NavigationService';
import TasksProvider from '../../../Providers/tasks/TasksProvider';
import ProjectTasksGridConnector from '../../../Connectors/ProjectTasksGridConnector/ProjectTasksGridConnector';

export type ProjectTasksPageProps = {};

class ProjectTasksPageComponent extends BasePage<ProjectTasksPageProps> {
    static defaultProps: Partial<ProjectTasksPageProps> = {};

    async onLoad() {
        const projectId = Number(NavigationService.routeParams.id);
        TasksProvider.setTasksFilters({ project_id: projectId });
    }

    render(): ReactNode {
        return (
            <div className={styles.container}>
                <AppHeaderConnector />
                <Column className={styles.content}>
                    <Container>
                        <GridHeaderConnector />
                    </Container>
                    <div className={styles.grid}>
                        <Container>
                            <ProjectTasksGridConnector />
                        </Container>
                    </div>
                </Column>
            </div>
        );
    }
}

const ProjectTasksPage = ProjectTasksPageComponent;
export default ProjectTasksPage;
