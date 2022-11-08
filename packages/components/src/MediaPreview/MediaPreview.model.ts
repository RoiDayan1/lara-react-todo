export type MediaPreviewProps = {
    className?: string;
    src: string;
    alt: string;
};

export interface MediaPreviewState {
    imageLoaded: boolean;
    imageError: boolean;
}
