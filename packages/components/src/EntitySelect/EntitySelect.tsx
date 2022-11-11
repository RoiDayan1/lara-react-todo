import React, { Component, ReactNode } from 'react';
import { EntitySelectProps, EntitySelectState } from './EntitySelect.model';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core';
import { uniqueId } from 'lodash';

class EntitySelectComponent extends Component<EntitySelectProps, EntitySelectState> {
    uid = uniqueId(this.constructor.name);

    render(): ReactNode {
        const { value = '', items = [], onSelect, label, error, helperText } = this.props;

        return (
            <FormControl fullWidth error={error}>
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
                {error && <FormHelperText>{helperText}</FormHelperText>}
            </FormControl>
        );
    }
}

const EntitySelect = EntitySelectComponent;
export default EntitySelect;
