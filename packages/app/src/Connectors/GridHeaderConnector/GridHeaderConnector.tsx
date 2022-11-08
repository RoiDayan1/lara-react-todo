import BaseConnector, { connectState } from '../BaseConnector';
import BaseStore from '../../Services/StateService';
import GridHeader from '@roid/components/src/GridHeader/GridHeader';
import { GridHeaderProps } from '@roid/components/src/GridHeader/GridHeader.model';
import ModalService from '../../Services/ModalService';
import ProjectsProvider from '../../Providers/projects/ProjectsProvider';
import CreateNewProjectModal from '@roid/components/src/Modals/CreateNewProjectModal/CreateNewProjectModal';

const stores: Array<BaseStore<any>> = [];

export type GridHeaderConnectorProps = {
    title?: string;
    createLabel?: string;
};

class GridHeaderConnectorComponent extends BaseConnector<GridHeaderConnectorProps, GridHeaderProps> {
    readonly component = GridHeader;

    onSearch = async (value: string) => {
        ProjectsProvider.setProjectsFiltersSearch(value);
        await ProjectsProvider.fetchSetGetProjects();
    };

    handleCreateNewProject = () => {
        ModalService.show(CreateNewProjectModal, {
            createNewProject: ProjectsProvider.createNewProject,
        });
    };

    connect(): GridHeaderProps {
        const { createLabel, title } = this.props;
        return {
            searchValue: ProjectsProvider.getProjectsFilters().search,
            onSearch: this.onSearch,
            onCreateClick: this.handleCreateNewProject,
            createLabel: createLabel,
            title: title,
        };
    }
}

const GridHeaderConnector = connectState(GridHeaderConnectorComponent, stores);
export default GridHeaderConnector;
