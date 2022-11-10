import React, { Component, ReactNode } from 'react';
import { EntitySelectProps, EntitySelectState } from './EntitySelect.model';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { uniqueId } from 'lodash';

class EntitySelectComponent extends Component<EntitySelectProps, EntitySelectState> {
    uid = uniqueId(this.constructor.name);

    render(): ReactNode {
        const { value = '', items = [], onSelect, label } = this.props;

        return (
            <FormControl fullWidth>
                <InputLabel id={this.uid}>{label}</InputLabel>
                <Select labelId={this.uid} value={value}>
                    {items.map((item) => (
                        <MenuItem
                            key={item.key}
                            value={item.key}
                            onClick={(event) => onSelect?.(item.key, event)}>
                            {item.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }
}

const EntitySelect = EntitySelectComponent;
export default EntitySelect;
