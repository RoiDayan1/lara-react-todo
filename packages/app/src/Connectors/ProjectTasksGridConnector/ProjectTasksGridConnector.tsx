import BaseConnector, { connectState } from '../BaseConnector';
import BaseStore from '../../Services/StateService';
import ProjectTasksGrid from '@roid/components/src/ProjectTasksGrid/ProjectTasksGrid';
import { ProjectTasksGridProps } from '@roid/components/src/ProjectTasksGrid/ProjectTasksGrid.model';
import TasksProvider from '../../Providers/tasks/TasksProvider';
import ModalService from '../../Services/ModalService';
import VerificationModal from '@roid/components/src/Modals/VerificationModal/VerificationModal';
import ViewTaskModal from '@roid/components/src/Modals/ViewTaskModal/ViewTaskModal';

const stores: Array<BaseStore<any>> = [TasksProvider.stores.TasksStore];

export type ProjectTasksGridConnectorProps = {};

class ProjectTasksGridConnectorComponent extends BaseConnector<
    ProjectTasksGridConnectorProps,
    ProjectTasksGridProps
> {
    readonly component = ProjectTasksGrid;

    constructor(props: ProjectTasksGridConnectorProps) {
        super(props);
        TasksProvider.fetchSetGetTasks().then();
    }

    handleDeleteTask = (taskId: number) => {
        ModalService.show(VerificationModal, {
            title: 'Delete Task',
            message: 'Are you sure you want to delete this task ?',
            onYes: () => TasksProvider.deleteTask(taskId),
        });
    };

    handleClickTask = async (taskId: number) => {
        let task = await TasksProvider.IncrementTaskViews(taskId);
        if (task) {
            const modal = ModalService.show(ViewTaskModal, {
                task,
                onUpdate: async (data) => {
                    const res = await TasksProvider.updateTask(taskId, data);
                    res && modal.update({ task: res });
                },
            });
        }
    };

    connect(): ProjectTasksGridProps {
        return {
            ...this.props,
            fetchingMore: TasksProvider.stores.TasksStore.isLoading(),
            tasks: TasksProvider.getTasks(),
            onDeleteTask: this.handleDeleteTask,
            onClickTask: this.handleClickTask,
        };
    }
}

const ProjectTasksGridConnector = connectState(ProjectTasksGridConnectorComponent, stores);
export default ProjectTasksGridConnector;
