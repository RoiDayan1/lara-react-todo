export type GridHeaderProps = {
    searchValue?: string;
    onSearch?: (value: string) => void;
    onCreateClick?: () => void;
    createLabel?: string;
    title?: string;
};

export interface GridHeaderState {}
