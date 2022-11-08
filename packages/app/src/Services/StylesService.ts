import { createMuiTheme, StyledProps, Theme } from '@material-ui/core';
import { Styles as MuiStyles } from '@material-ui/core/styles/withStyles';
import { ClassNameMap } from '@material-ui/styles/withStyles/withStyles';

class StylesService {
    static colors = {
        primary: '#111111',
        secondary: '#FF8E40',
        lightGray: '#f5f5f5',
        gray: '#94999a',
        darkGray: '#6d6d6d',
        lightBlack: '#434343',
        black: '#1a1a1a',
        white: '#ffffff',
        darkRed: '#bc0a07',
        lightBlue: '#e2f0f6', // lightBlueHighlight
        lighterBlue: '#f2f8fb', // lighterBlueHover
        background: '#f0f3f5',
    };

    static theme = createMuiTheme({
        palette: {
            primary: { main: StylesService.colors.primary },
            secondary: { main: StylesService.colors.secondary },
            background: {
                default: StylesService.colors.background,
                paper: StylesService.colors.background,
            },
            common: {
                black: StylesService.colors.black,
                white: StylesService.colors.white,
            },
            text: {
                primary: StylesService.colors.black,
                secondary: StylesService.colors.lightBlack,
            },
        },
        typography: {
            fontFamily: 'Roboto',
            fontSize: 14,
        },
        overrides: {
            MuiTooltip: {
                tooltip: {
                    fontSize: 14,
                    backgroundColor: StylesService.colors.lightBlack,
                    maxWidth: '50vw',
                    whiteSpace: 'pre-wrap',
                },
                arrow: {
                    color: StylesService.colors.lightBlack,
                },
            },
        },
    });
}

export default StylesService;

export { withStyles as withMuiStyles } from '@material-ui/core/styles';
export { withTheme as withMuiTheme } from '@material-ui/core/styles';

export type StylesObject = MuiStyles<Theme, {}, string>;

export type Classes<ClassKey extends string = string> = Partial<ClassNameMap<ClassKey>>;

export interface StyledComponentProps<ClassKey extends string = string> {
    classes: Classes<ClassKey>;
}

export type StylesProps = StyledComponentProps & Partial<StyledProps>;
