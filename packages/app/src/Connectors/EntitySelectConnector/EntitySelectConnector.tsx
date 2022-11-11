import BaseConnector, { connectState } from '../BaseConnector';
import BaseStore from '../../Services/StateService';
import EntitySelect from '@roid/components/src/EntitySelect/EntitySelect';
import { EntitySelectProps } from '@roid/components/src/EntitySelect/EntitySelect.model';
import * as React from 'react';
import { MouseEvent } from 'react';
import UsersProvider from '../../Providers/users/UsersProvider';

const stores: Array<BaseStore<any>> = [UsersProvider.stores.UsersStore];

export type EntitySelectConnectorProps = {
    value?: number | string;
    onSelect?: (key: number | string, event: MouseEvent<HTMLLIElement>) => void;
    label?: string;
    error?: boolean;
    helperText?: React.ReactNode;
};

class EntitySelectConnectorComponent extends BaseConnector<EntitySelectConnectorProps, EntitySelectProps> {
    readonly component = EntitySelect;

    get items() {
        return UsersProvider.getUsers().map((user) => ({ key: user.id, label: user.name }));
    }

    connect(): EntitySelectProps {
        return {
            ...this.props,
            items: this.items,
        };
    }
}

const EntitySelectConnector = connectState(EntitySelectConnectorComponent, stores);
export default EntitySelectConnector;
