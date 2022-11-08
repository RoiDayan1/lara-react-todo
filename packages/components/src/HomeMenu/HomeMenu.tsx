import React, { Component, ReactNode } from 'react';
import { HomeMenuProps, HomeMenuState } from './HomeMenu.model';
import styles from './HomeMenu.module.scss';
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { isString } from 'lodash';

import logoImage from '@roid/assets/images/logo-black.png';

class HomeMenuComponent extends Component<HomeMenuProps, HomeMenuState> {
    state: HomeMenuState = {
        expandedSectionIndex: false,
    };

    handleAccordionChange = (panelIndex: number) => (_event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        this.setState({ expandedSectionIndex: isExpanded ? panelIndex : false });
    };

    render(): ReactNode {
        const { accordionSections = [] } = this.props;
        const { expandedSectionIndex } = this.state;

        return (
            <div className={styles.container}>
                <img className={styles.logoImg} src={logoImage} alt="logo-colors.png" />

                <div className={styles.accordionContainer}>
                    {accordionSections.map((section, index) => (
                        <Accordion
                            key={index}
                            expanded={expandedSectionIndex === index}
                            onChange={this.handleAccordionChange(index)}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h5" color="textPrimary" className={styles.title}>
                                    {section.title}
                                </Typography>
                                <Typography color="textSecondary" className={styles.subtitle}>
                                    {section.subtitle}
                                </Typography>
                            </AccordionSummary>
                            {section.details && (
                                <AccordionDetails>
                                    {isString(section.details) ? (
                                        <Typography className={styles.details}>{section.details}</Typography>
                                    ) : (
                                        section.details
                                    )}
                                    {section.button && (
                                        <div>
                                            <Button
                                                className={styles.button}
                                                variant={section.button.variant || 'contained'}
                                                color={section.button.color || 'primary'}
                                                onClick={section.button.action}>
                                                {section.button.text}
                                            </Button>
                                        </div>
                                    )}
                                </AccordionDetails>
                            )}
                        </Accordion>
                    ))}
                </div>
            </div>
        );
    }
}

const HomeMenu = HomeMenuComponent;
export default HomeMenu;
