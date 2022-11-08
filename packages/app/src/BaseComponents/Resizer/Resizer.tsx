import React, { Component, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import styles from './Resizer.module.scss';
import StylesService from '../../Services/StylesService';

export enum ResizerDirection {
    ROW = 'ROW',
    COLUMN = 'COLUMN',
}

export type ResizerProps = {
    direction: ResizerDirection;
    minPrev?: string | number;
    maxPrev?: string | number;
};

export interface ResizerState {
    inDrag: boolean;
}

class ResizerComponent extends Component<ResizerProps, ResizerState> {
    isRow = this.props.direction === ResizerDirection.ROW;

    element!: HTMLDivElement;
    prevElement!: HTMLDivElement;
    nextElement!: HTMLDivElement;

    initialPrevElementSize!: number;

    state: ResizerState = {
        inDrag: false,
    };

    componentDidMount() {
        this.element = ReactDOM.findDOMNode(this) as HTMLDivElement;
        this.prevElement = this.element.previousElementSibling as HTMLDivElement;
        this.initialPrevElementSize = this.isRow
            ? this.prevElement.clientHeight
            : this.prevElement.clientWidth;
    }

    componentWillUnmount() {
        this.removeListeners();
    }

    addListeners = () => {
        document.body.addEventListener<'mouseup'>('mouseup', this.onMouseUp);
        document.body.addEventListener<'mousemove'>('mousemove', this.onMouseMove);
    };
    removeListeners = () => {
        document.body.removeEventListener<'mouseup'>('mouseup', this.onMouseUp);
        document.body.removeEventListener<'mousemove'>('mousemove', this.onMouseMove);
    };

    onMouseUp = (_event: MouseEvent) => {
        this.setState({ inDrag: false });
        this.removeListeners();
    };

    onMouseMove = (event: MouseEvent) => {
        const { minPrev = '5%', maxPrev = '95%' } = this.props;

        const offset = event[this.isRow ? 'y' : 'x'] - this.initialPrevElementSize;
        const calculatedSize = offset + this.initialPrevElementSize;

        let newSize = `${calculatedSize}px`;
        newSize = `max(${minPrev},${newSize})`;
        newSize = `min(${maxPrev},${newSize})`;

        this.prevElement.style[this.isRow ? 'height' : 'width'] = `${newSize}`;
        this.prevElement.style[this.isRow ? 'min-height' : 'min-width'] = `${newSize}`;
        this.prevElement.style[this.isRow ? 'max-height' : 'max-width'] = `${newSize}`;
    };

    onMouseDown = (_event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        this.setState({ inDrag: true });
        this.addListeners();
    };

    render(): ReactNode {
        const { inDrag } = this.state;

        const lineStyle = inDrag ? { backgroundColor: StylesService.colors.primary } : {};

        return (
            <div className={this.isRow ? styles.row : styles.column} onMouseDown={this.onMouseDown}>
                <div className={styles.line} style={lineStyle} />
            </div>
        );
    }
}

const Resizer = ResizerComponent;
export default Resizer;
