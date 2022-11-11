import { remove } from 'lodash';
import ToasterService from '../../Services/ToasterService';
import { NewProject, Project } from '@roid/models/src/projects.model';
import ProjectsStore from './Stores/ProjectsStore';
import ProjectsFiltersStore, { ProjectsFiltersStoreValue } from './Stores/ProjectsFiltersStore';
import SelectedProjectStore from './Stores/SelectedProjectStore';
import GetProjectsXhr from './Xhrs/GetProjectsXhr';
import CreateProjectXhr from './Xhrs/CreateProjectXhr';
import DeleteProjectXhr from './Xhrs/DeleteProjectXhr';
import GetProjectXhr from './Xhrs/GetProjectXhr';

class ProjectsProvider {
    static stores = {
        ProjectsStore,
        ProjectsFiltersStore,
        SelectedProjectStore,
    };

    ///////////////////////////////////////////////////////////////////////////////////////
    ///////// Projects
    ///////////////////////////////////////////////////////////////////////////////////////
    static async fetchProjects() {
        const projectsFilters = ProjectsProvider.getProjectsFilters();
        return await GetProjectsXhr.request(projectsFilters).catch((error) =>
            ToasterService.addXHRError('Fetch Projects', error)
        );
    }

    static async fetchSetGetProjects() {
        ProjectsProvider.stores.ProjectsStore.setIsLoading(true);
        const response = await ProjectsProvider.fetchProjects();
        ProjectsProvider.setProjects(response || []);
        ProjectsProvider.stores.ProjectsStore.setIsLoading(false);
        return response;
    }

    static async fetchSetGetProject(id: number) {
        ProjectsProvider.stores.SelectedProjectStore.setIsLoading(true);
        const response = await GetProjectXhr.request({ id }).catch((error) =>
            ToasterService.addXHRError('Fetch Project', error)
        );
        if (response) {
            ProjectsProvider.stores.SelectedProjectStore.set(response);
        }
        ProjectsProvider.stores.SelectedProjectStore.setIsLoading(false);
        return response;
    }

    static async createNewProject(newProject: NewProject) {
        const response = await CreateProjectXhr.request({ newProject }).catch((error) =>
            ToasterService.addXHRError('Create New Project', error)
        );
        if (response) {
            ProjectsProvider.fetchSetGetProjects().then();
            ToasterService.addSuccess('The project was successfully created');
        }
    }

    static async fetchProject(newProject: NewProject) {
        const response = await CreateProjectXhr.request({ newProject }).catch((error) =>
            ToasterService.addXHRError('Create New Project', error)
        );
        if (response) {
            ProjectsProvider.fetchSetGetProjects().then();
            ToasterService.addSuccess('The project was successfully created');
        }
    }

    static async deleteProject(projectId: number) {
        ProjectsProvider.stores.ProjectsStore.setIsLoading(true);
        const response = await DeleteProjectXhr.request({ id: projectId }).catch((error) =>
            ToasterService.addXHRError('Delete Project', error)
        );
        if (response) {
            ProjectsProvider.removeProject(projectId);
            ToasterService.addSuccess('The project was successfully deleted');
        }
        ProjectsProvider.stores.ProjectsStore.setIsLoading(false);
    }

    //////////////////////////////////

    static getSelectedProject() {
        return ProjectsProvider.stores.SelectedProjectStore.value();
    }

    static setSelectedProject(project: Project) {
        ProjectsProvider.stores.SelectedProjectStore.set(project);
    }

    static clearSelectedProject() {
        return ProjectsProvider.stores.SelectedProjectStore.reset();
    }

    static getProjects() {
        return ProjectsProvider.stores.ProjectsStore.value();
    }

    static setProjects(projects: Array<Project>) {
        ProjectsProvider.stores.ProjectsStore.set(projects);
    }

    static removeProject(projectId: number) {
        const projects = ProjectsProvider.getProjects();
        remove(projects, { id: projectId });
        ProjectsProvider.setProjects(projects || []);
    }

    static clearProjects() {
        return ProjectsProvider.stores.ProjectsStore.reset();
    }

    ///////////////////////////////////////////////////////////////////////////////////////
    ///////// Projects Filters
    ///////////////////////////////////////////////////////////////////////////////////////
    static getProjectsFilters() {
        return ProjectsProvider.stores.ProjectsFiltersStore.value();
    }

    static setProjectsFilters(projectsFilters: ProjectsFiltersStoreValue) {
        ProjectsProvider.stores.ProjectsFiltersStore.set(projectsFilters);
    }

    static clearProjectsFilters() {
        return ProjectsProvider.stores.ProjectsFiltersStore.reset();
    }

    static setProjectsFiltersSearch(value: string) {
        const projectsFilters = ProjectsProvider.getProjectsFilters();
        projectsFilters.search = value;
        ProjectsProvider.setProjectsFilters(projectsFilters);
    }
}

export default ProjectsProvider;
