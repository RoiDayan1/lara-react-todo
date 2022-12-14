import React, { ReactNode } from 'react';
import BasePage from '../BasePage';
import styles from './ProjectsManagementPage.module.scss';
import Column from '../../BaseComponents/Column/Column';
import { Container } from '@material-ui/core';
import AppHeaderConnector from '../../Connectors/AppHeaderConnector/AppHeaderConnector';
import GridHeaderConnector from '../../Connectors/GridHeaderConnector/GridHeaderConnector';
import ProjectsGridConnector from '../../Connectors/ProjectsGridConnector/ProjectsGridConnector';

export type ProjectsManagementPageProps = {};

class ProjectsManagementPageComponent extends BasePage<ProjectsManagementPageProps> {
    static defaultProps: Partial<ProjectsManagementPageProps> = {};

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

const ProjectsManagementPage = ProjectsManagementPageComponent;
export default ProjectsManagementPage;
