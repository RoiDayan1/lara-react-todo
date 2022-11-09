import BaseConnector, { connectState } from '../BaseConnector';
import BaseStore from '../../Services/StateService';
import GridHeader from '@roid/components/src/GridHeader/GridHeader';
import { GridHeaderProps } from '@roid/components/src/GridHeader/GridHeader.model';
import ModalService from '../../Services/ModalService';
import ProjectsProvider from '../../Providers/projects/ProjectsProvider';
import CreateNewProjectModal from '@roid/components/src/Modals/CreateNewProjectModal/CreateNewProjectModal';
import NavigationService, { Routes } from '../../Services/NavigationService';

const stores: Array<BaseStore<any>> = [ProjectsProvider.stores.SelectedProjectStore];

export type GridHeaderConnectorProps = {};

class GridHeaderConnectorComponent extends BaseConnector<GridHeaderConnectorProps, GridHeaderProps> {
    readonly component = GridHeader;

    componentWillMount() {
        if (NavigationService.routeIs(Routes.ProjectTasks)) {
            const projectId = NavigationService.routeParams.id;
            ProjectsProvider.fetchSetGetProject(projectId).then();
        }
    }

    onSearch = async (value: string) => {
        ProjectsProvider.setProjectsFiltersSearch(value);
        await ProjectsProvider.fetchSetGetProjects();
    };

    handleCreateNewProject = () => {
        ModalService.show(CreateNewProjectModal, {
            createNewProject: ProjectsProvider.createNewProject,
        });
    };

    getTitle = () => {
        if (NavigationService.routeIs(Routes.ProjectsManagement)) return 'Projects';
        if (NavigationService.routeIs(Routes.ProjectTasks))
            return ProjectsProvider.getSelectedProject()?.name;
        return '';
    };

    getCreateLabel = () => {
        if (NavigationService.routeIs(Routes.ProjectsManagement)) return 'Create New Project';
        if (NavigationService.routeIs(Routes.ProjectTasks)) return 'Create New Task';
        return '';
    };

    connect(): GridHeaderProps {
        return {
            searchValue: ProjectsProvider.getProjectsFilters().search,
            onSearch: this.onSearch,
            onCreateClick: this.handleCreateNewProject,
            createLabel: this.getCreateLabel(),
            title: this.getTitle(),
        };
    }
}

const GridHeaderConnector = connectState(GridHeaderConnectorComponent, stores);
export default GridHeaderConnector;
