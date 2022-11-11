import { remove } from 'lodash';
import ToasterService from '../../Services/ToasterService';
import { NewTask, Task } from '@roid/models/src/tasks.model';
import TasksStore from './Stores/TasksStore';
import TasksFiltersStore, { TasksFiltersStoreValue } from './Stores/TasksFiltersStore';
import GetTasksXhr from './Xhrs/GetTasksXhr';
import CreateTaskXhr from './Xhrs/CreateTaskXhr';
import DeleteTaskXhr from './Xhrs/DeleteTaskXhr';
import UpdateTaskXhr from './Xhrs/UpdateTaskXhr';
import IncrementTaskViewsXhr from './Xhrs/IncrementTaskViewsXhr';

class TasksProvider {
    static stores = {
        TasksStore,
        TasksFiltersStore,
    };

    ///////////////////////////////////////////////////////////////////////////////////////
    ///////// Tasks
    ///////////////////////////////////////////////////////////////////////////////////////
    static async fetchTasks() {
        const tasksFilters = TasksProvider.getTasksFilters();
        return await GetTasksXhr.request(tasksFilters).catch((error) =>
            ToasterService.addXHRError('Fetch Tasks', error)
        );
    }

    static async fetchSetGetTasks(background = false) {
        !background && TasksProvider.stores.TasksStore.setIsLoading(true);
        const response = await TasksProvider.fetchTasks();
        TasksProvider.setTasks(response || []);
        !background && TasksProvider.stores.TasksStore.setIsLoading(false);
        return response;
    }

    static async createNewTask(newTask: NewTask) {
        const response = await CreateTaskXhr.request({ newTask }).catch((error) =>
            ToasterService.addXHRError('Create New Task', error)
        );
        if (response) {
            TasksProvider.fetchSetGetTasks().then();
            ToasterService.addSuccess('The task was successfully created');
        }
        return response;
    }

    static async updateTask(taskId: number, data: Partial<Task>) {
        const response = await UpdateTaskXhr.request({ id: taskId, data }).catch((error) =>
            ToasterService.addXHRError('Update Task', error)
        );
        if (response) {
            TasksProvider.fetchSetGetTasks(true).then();
            ToasterService.addSuccess('The task was successfully updated');
        }
        return response;
    }

    static async deleteTask(taskId: number, background = false) {
        !background && TasksProvider.stores.TasksStore.setIsLoading(true);
        const response = await DeleteTaskXhr.request({ id: taskId }).catch((error) =>
            ToasterService.addXHRError('Delete Task', error)
        );
        if (response) {
            TasksProvider.removeTask(taskId);
            ToasterService.addSuccess('The task was successfully deleted');
        }
        !background && TasksProvider.stores.TasksStore.setIsLoading(false);
        return response;
    }

    static async IncrementTaskViews(taskId: number) {
        const response = await IncrementTaskViewsXhr.request({ id: taskId }).catch((error) =>
            ToasterService.addXHRError('Update Task', error)
        );
        if (response) {
            TasksProvider.fetchSetGetTasks(true).then();
        }
        return response;
    }

    //////////////////////////////////
    static getTasks() {
        return TasksProvider.stores.TasksStore.value();
    }

    static setTasks(tasks: Array<Task>) {
        TasksProvider.stores.TasksStore.set(tasks);
    }

    static removeTask(taskId: number) {
        const tasks = TasksProvider.getTasks();
        remove(tasks, { id: taskId });
        TasksProvider.setTasks(tasks || []);
    }

    static clearTasks() {
        return TasksProvider.stores.TasksStore.reset();
    }

    ///////////////////////////////////////////////////////////////////////////////////////
    ///////// Tasks Filters
    ///////////////////////////////////////////////////////////////////////////////////////
    static getTasksFilters() {
        return TasksProvider.stores.TasksFiltersStore.value();
    }

    static setTasksFilters(tasksFilters: TasksFiltersStoreValue) {
        TasksProvider.stores.TasksFiltersStore.set(tasksFilters);
    }

    static clearTasksFilters() {
        return TasksProvider.stores.TasksFiltersStore.reset();
    }

    static setTasksFiltersSearch(value: string) {
        const tasksFilters = TasksProvider.getTasksFilters();
        tasksFilters.search = value;
        TasksProvider.setTasksFilters(tasksFilters);
    }
}

export default TasksProvider;
