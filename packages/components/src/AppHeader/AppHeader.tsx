import React, { Component, ReactNode } from 'react';
import styles from './AppHeader.module.scss';
import { AppHeaderProps, AppHeaderState } from './AppHeader.model';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

class AppHeaderComponent extends Component<AppHeaderProps, AppHeaderState> {
    render(): ReactNode {
        const { appName, onHomeClick } = this.props;

        return (
            <div className={styles.container}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={styles.title}>
                            {appName}
                        </Typography>
                        {onHomeClick && (
                            <IconButton onClick={onHomeClick}>
                                <HomeIcon />
                            </IconButton>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

const AppHeader = AppHeaderComponent;
export default AppHeader;
