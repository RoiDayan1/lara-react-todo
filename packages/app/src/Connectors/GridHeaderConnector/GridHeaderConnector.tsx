import BaseConnector, { connectState } from '../BaseConnector';
import BaseStore from '../../Services/StateService';
import GridHeader from '@roid/components/src/GridHeader/GridHeader';
import { GridHeaderProps } from '@roid/components/src/GridHeader/GridHeader.model';
import ModalService from '../../Services/ModalService';
import ProjectsProvider from '../../Providers/projects/ProjectsProvider';
import CreateNewProjectModal from '@roid/components/src/Modals/CreateNewProjectModal/CreateNewProjectModal';
import NavigationService, { Routes } from '../../Services/NavigationService';
import TasksProvider from '../../Providers/tasks/TasksProvider';
import CreateNewTaskModal from '@roid/components/src/Modals/CreateNewTaskModal/CreateNewTaskModal';

const stores: Array<BaseStore<any>> = [ProjectsProvider.stores.SelectedProjectStore];

export type GridHeaderConnectorProps = {};

class GridHeaderConnectorComponent extends BaseConnector<GridHeaderConnectorProps, GridHeaderProps> {
    readonly component = GridHeader;

    componentWillMount() {
        if (NavigationService.routeIs(Routes.ProjectTasks)) {
            const projectId = NavigationService.routeParams.id;
            if (projectId !== ProjectsProvider.getSelectedProject()?.id) {
                ProjectsProvider.clearSelectedProject();
                ProjectsProvider.fetchSetGetProject(projectId).then();
            }
        }
    }

    onSearch = async (value: string) => {
        ProjectsProvider.setProjectsFiltersSearch(value);
        await ProjectsProvider.fetchSetGetProjects();
    };

    handleOnCreateClick = () => {
        if (NavigationService.routeIs(Routes.ProjectsManagement)) {
            ModalService.show(CreateNewProjectModal, {
                createNewProject: ProjectsProvider.createNewProject,
            });
        } else if (NavigationService.routeIs(Routes.ProjectTasks)) {
            const projectId = NavigationService.routeParams.id;
            ModalService.show(CreateNewTaskModal, {
                projectId,
                createNewTask: TasksProvider.createNewTask,
            });
        }
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
            onCreateClick: this.handleOnCreateClick,
            createLabel: this.getCreateLabel(),
            title: this.getTitle(),
        };
    }
}

const GridHeaderConnector = connectState(GridHeaderConnectorComponent, stores);
export default GridHeaderConnector;
