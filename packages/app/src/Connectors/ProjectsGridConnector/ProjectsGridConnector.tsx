import BaseConnector, { connectState } from '../BaseConnector';
import BaseStore from '../../Services/StateService';
import ProjectsGrid from '@roid/components/src/ProjectsGrid/ProjectsGrid';
import { ProjectsGridProps } from '@roid/components/src/ProjectsGrid/ProjectsGrid.model';
import ProjectsProvider from '../../Providers/projects/ProjectsProvider';
import ModalService from '../../Services/ModalService';
import VerificationModal from '@roid/components/src/Modals/VerificationModal/VerificationModal';
import NavigationService from '../../Services/NavigationService';

const stores: Array<BaseStore<any>> = [ProjectsProvider.stores.ProjectsStore];

export type ProjectsGridConnectorProps = {};

class ProjectsGridConnectorComponent extends BaseConnector<ProjectsGridConnectorProps, ProjectsGridProps> {
    readonly component = ProjectsGrid;

    constructor(props: ProjectsGridConnectorProps) {
        super(props);
        ProjectsProvider.fetchSetGetProjects().then();
    }

    handleDeleteProject = (projectId: number) => {
        ModalService.show(VerificationModal, {
            title: 'Delete Project',
            message: 'Are you sure you want to delete this project ?',
            onYes: () => ProjectsProvider.deleteProject(projectId),
        });
    };

    handleClickProject = (projectId: number) => {
        NavigationService.goToProjectTasks(projectId);
    };

    connect(): ProjectsGridProps {
        return {
            ...this.props,
            fetchingMore: ProjectsProvider.stores.ProjectsStore.isLoading(),
            projects: ProjectsProvider.getProjects(),
            onDeleteProject: this.handleDeleteProject,
            onClickProject: this.handleClickProject,
        };
    }
}

const ProjectsGridConnector = connectState(ProjectsGridConnectorComponent, stores);
export default ProjectsGridConnector;
