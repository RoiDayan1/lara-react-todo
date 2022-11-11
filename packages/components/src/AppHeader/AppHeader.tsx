import React, { Component, ReactNode } from 'react';
import styles from './AppHeader.module.scss';
import { AppHeaderProps, AppHeaderState } from './AppHeader.model';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { KeyboardBackspace } from '@material-ui/icons';

class AppHeaderComponent extends Component<AppHeaderProps, AppHeaderState> {
    render(): ReactNode {
        const { appName, onHomeClick, onBackClick } = this.props;

        return (
            <div className={styles.container}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={styles.title}>
                            {appName}
                        </Typography>
                        {onBackClick && (
                            <IconButton color="secondary" onClick={onBackClick}>
                                <KeyboardBackspace />
                            </IconButton>
                        )}
                        {onHomeClick && (
                            <IconButton color="secondary" onClick={onHomeClick}>
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
