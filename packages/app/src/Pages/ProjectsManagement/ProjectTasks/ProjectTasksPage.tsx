import React, { ReactNode } from 'react';
import BasePage from '../../BasePage';
import styles from './ProjectTasksPage.module.scss';
import Column from '../../../BaseComponents/Column/Column';
import { Container } from '@material-ui/core';
import AppHeaderConnector from '../../../Connectors/AppHeaderConnector/AppHeaderConnector';
import GridHeaderConnector from '../../../Connectors/GridHeaderConnector/GridHeaderConnector';
import ProjectsGridConnector from '../../../Connectors/ProjectsGridConnector/ProjectsGridConnector';

export type ProjectTasksPageProps = {};

class ProjectTasksPageComponent extends BasePage<ProjectTasksPageProps> {
    static defaultProps: Partial<ProjectTasksPageProps> = {};

    async onLoad() {}

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
                            <ProjectsGridConnector />
                        </Container>
                    </div>
                </Column>
            </div>
        );
    }
}

const ProjectTasksPage = ProjectTasksPageComponent;
export default ProjectTasksPage;