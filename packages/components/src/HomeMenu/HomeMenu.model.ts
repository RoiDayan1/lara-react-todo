import { ReactNode } from 'react';

export interface AccordionSection {
    title: string;
    subtitle?: string;
    details?: ReactNode;
    button?: {
        text: string;
        action: () => void;
        color?: 'primary' | 'secondary';
        variant?: 'text' | 'outlined' | 'contained';
    };
}

export type HomeMenuProps = {
    accordionSections: AccordionSection[];
};

export interface HomeMenuState {
    expandedSectionIndex: number | false;
}
