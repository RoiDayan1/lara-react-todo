import React, { Component, createRef, ReactNode } from 'react';
import styles from './GridHeader.module.scss';
import { GridHeaderProps, GridHeaderState } from './GridHeader.model';
import CreateIcon from '@material-ui/icons/Create';
import { Button, IconButton, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

class GridHeaderComponent extends Component<GridHeaderProps, GridHeaderState> {
    searchTF = createRef<HTMLInputElement>();

    handleSearch = () => {
        const value = this.searchTF.current?.value;
        this.props.onSearch?.(value || '');
    };

    handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            this.handleSearch();
        }
    };

    render(): ReactNode {
        const { searchValue = '', onCreateClick, createLabel = 'Create New' } = this.props;

        return (
            <div className={styles.container}>
                <div className={styles.leftSection}>
                    <TextField
                        inputRef={this.searchTF}
                        defaultValue={searchValue}
                        label="Search"
                        variant="outlined"
                        onKeyPress={this.handleKeyPress}
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={this.handleSearch} edge="end">
                                    <SearchIcon />
                                </IconButton>
                            ),
                        }}
                    />
                </div>
                <div>
                    <Button
                        variant="contained"
                        color="secondary"
                        endIcon={<CreateIcon />}
                        onClick={onCreateClick}>
                        {createLabel}
                    </Button>
                </div>
            </div>
        );
    }
}

const GridHeader = GridHeaderComponent;
export default GridHeader;
