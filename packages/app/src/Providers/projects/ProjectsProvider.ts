import { remove } from 'lodash';
import ToasterService from '../../Services/ToasterService';
import { NewProject, Project } from '@roid/models/src/projects.model';
import ProjectsStore from './Stores/ProjectsStore';
import ProjectsFiltersStore, { ProjectsFiltersStoreValue } from './Stores/ProjectsFiltersStore';
import GetProjectsXhr from './Xhrs/GetProjectsXhr';
import CreateProjectXhr from './Xhrs/CreateProjectXhr';
import DeleteProjectXhr from './Xhrs/DeleteProjectXhr';

class ProjectsProvider {
    static stores = {
        ProjectsStore,
        ProjectsFiltersStore,
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

    static async createNewProject(newProject: NewProject) {
        const response = await CreateProjectXhr.request({ newProject }).catch((error) =>
            ToasterService.addXHRError('Create New Project', error)
        );
        if (response) {
            ProjectsProvider.fetchSetGetProjects().then();
            ToasterService.addSuccess('The project was successfully created');
        }
    }

    static async deleteProject(projectId: string) {
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
    static getProjects() {
        return ProjectsProvider.stores.ProjectsStore.value();
    }

    static setProjects(projects: Array<Project>) {
        ProjectsProvider.stores.ProjectsStore.update(projects);
    }

    static removeProject(projectId: string) {
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
        ProjectsProvider.stores.ProjectsFiltersStore.update(projectsFilters);
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
