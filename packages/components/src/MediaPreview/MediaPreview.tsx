import React, { Component, ReactNode, SyntheticEvent } from 'react';
import { MediaPreviewProps, MediaPreviewState } from './MediaPreview.model';
import styles from './MediaPreview.module.scss';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
import { Skeleton } from '@material-ui/lab';

class MediaPreviewComponent extends Component<MediaPreviewProps, MediaPreviewState> {
    state: MediaPreviewState = {
        imageLoaded: false,
        imageError: !this.props.src,
    };

    imageRef: HTMLImageElement | null = null;

    componentDidMount() {
        if (this.imageRef && this.imageRef.complete) {
            // image loaded before the component rendered (e.g. SSR)
            if (this.imageRef.naturalWidth === 0) {
                this.onError();
            } else {
                this.onLoad();
            }
        }
    }

    onLoad = (_event?: SyntheticEvent<HTMLImageElement, Event>) => {
        this.setState({ imageLoaded: true, imageError: false });
    };

    onError = (_event?: SyntheticEvent<HTMLImageElement, Event>) => {
        this.setState({ imageLoaded: false, imageError: true });
    };

    render(): ReactNode {
        const { src, alt, className } = this.props;
        const { imageLoaded, imageError } = this.state;

        return (
            <div className={className}>
                <div className={styles.container}>
                    <img
                        ref={(ref) => (this.imageRef = ref)}
                        style={{ opacity: imageLoaded ? 1 : 0 }}
                        className={styles.image}
                        src={src}
                        alt={alt}
                        onLoad={this.onLoad}
                        onError={this.onError}
                    />
                    {!imageLoaded && !imageError && (
                        <div
                            className={styles.skeletonContainer}
                            style={{ opacity: imageLoaded || imageError ? 0 : 1 }}>
                            <Skeleton variant="rect" width={'100%'} height={'100%'} animation="wave" />
                        </div>
                    )}
                    {imageError && (
                        <div className={styles.errorContainer} style={{ opacity: imageError ? 1 : 0 }}>
                            <BrokenImageIcon color="secondary" fontSize={'large'} />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const MediaPreview = MediaPreviewComponent;
export default MediaPreview;
