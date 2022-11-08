import React, { Component, ReactNode } from 'react';
import styles from './TextWithTooltip.module.scss';
import { TextWithTooltipProps, TextWithTooltipState } from './TextWithTooltip.model';
import { Tooltip } from '@material-ui/core';

class TextWithTooltipComponent extends Component<TextWithTooltipProps, TextWithTooltipState> {
    render(): ReactNode {
        const { amountOfLines, children, tooltipContent } = this.props;

        return (
            <Tooltip interactive arrow title={tooltipContent || children || ''}>
                <div className={styles.container} style={{ WebkitLineClamp: amountOfLines }}>
                    {children}
                </div>
            </Tooltip>
        );
    }
}

const TextWithTooltip = TextWithTooltipComponent;
export default TextWithTooltip;
