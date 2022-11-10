import { MouseEvent } from 'react';

export type EntitySelectProps = {
    value?: number | string;
    items?: { key: number | string; label: string }[];
    onSelect?: (key: number | string, event: MouseEvent<HTMLLIElement>) => void;
    label?: string;
};

export interface EntitySelectState {}
