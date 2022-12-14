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

const stores: Array<BaseStore<any>> = [
    ProjectsProvider.stores.SelectedProjectStore,
    ProjectsProvider.stores.ProjectsFiltersStore,
    TasksProvider.stores.TasksFiltersStore,
];

export type GridHeaderConnectorProps = {};

class GridHeaderConnectorComponent extends BaseConnector<GridHeaderConnectorProps, GridHeaderProps> {
    readonly component = GridHeader;

    constructor(props: GridHeaderConnectorProps) {
        super(props);
        if (NavigationService.routeIs(Routes.ProjectTasks)) {
            const projectId = Number(NavigationService.routeParams.id);
            if (projectId !== ProjectsProvider.getSelectedProject()?.id) {
                ProjectsProvider.clearSelectedProject();
                ProjectsProvider.fetchSetGetProject(projectId).then();
            }
        }
    }

    onSearch = async (value: string) => {
        if (NavigationService.routeIs(Routes.ProjectsManagement)) {
            ProjectsProvider.setProjectsFiltersSearch(value);
            await ProjectsProvider.fetchSetGetProjects();
        } else if (NavigationService.routeIs(Routes.ProjectTasks)) {
            TasksProvider.setTasksFiltersSearch(value);
            await TasksProvider.fetchSetGetTasks();
        }
    };

    handleOnCreateClick = () => {
        if (NavigationService.routeIs(Routes.ProjectsManagement)) {
            ModalService.show(CreateNewProjectModal, {
                createNewProject: ProjectsProvider.createNewProject,
            });
        } else if (NavigationService.routeIs(Routes.ProjectTasks)) {
            const projectId = Number(NavigationService.routeParams.id);
            ModalService.show(CreateNewTaskModal, {
                projectId,
                createNewTask: TasksProvider.createNewTask,
            });
        }
    };

    getTitle = () => {
        if (NavigationService.routeIs(Routes.ProjectsManagement)) return 'Projects';
        if (NavigationService.routeIs(Routes.ProjectTasks))
            return ProjectsProvider.getSelectedProject()?.name + ' tasks';
        return '';
    };

    getSearchValue = () => {
        if (NavigationService.routeIs(Routes.ProjectsManagement))
            return ProjectsProvider.getProjectsFilters().search;
        if (NavigationService.routeIs(Routes.ProjectTasks)) return TasksProvider.getTasksFilters().search;
        return '';
    };

    getCreateLabel = () => {
        if (NavigationService.routeIs(Routes.ProjectsManagement)) return 'Create New Project';
        if (NavigationService.routeIs(Routes.ProjectTasks)) return 'Create New Task';
        return '';
    };

    connect(): GridHeaderProps {
        return {
            ...this.props,
            searchValue: this.getSearchValue(),
            onSearch: this.onSearch,
            onCreateClick: this.handleOnCreateClick,
            createLabel: this.getCreateLabel(),
            title: this.getTitle(),
        };
    }
}

const GridHeaderConnector = connectState(GridHeaderConnectorComponent, stores);
export default GridHeaderConnector;
