export interface IColorHues {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : never;

export type Leaves<T> = T extends object
  ? { [K in keyof T]-?: Join<K, Leaves<T[K]>> }[keyof T]
  : '';

const colors = {
  contrastThreshold: 7,
  // Singleton colors
  primary: '#2C91A7',
  darkPrimary: '#065060',
  secondary: '#E7F3F5',
  text: '#1C1C1E',
  lightText: '#3C3C43',
  danger: 'rgba(195, 0, 0, 0.36)',
  darkDanger: 'rgba(195, 0, 0, 0.8)',
  border: 'rgba(120, 120, 128, 0.36)',
  greyLight: '#EBEBF5',
  messageBg: 'rgba(240, 242, 242, 0.6)',
  messageBgDark: 'rgba(118, 118, 128, 0.24)',

  white: '#FFFFFF',
  black: '#1C1C1E',
  darkText: '#000000',
  transparent: 'rgba(255, 255, 255, 0)',
  lightTransparentBg: 'rgba(249, 250, 251, 0.9)',
  darkTransparentBg: 'rgba(31, 41, 55, 0.9)',
  lightGreyTransparent: 'rgba(118, 118, 128, 0.12)',
  lightBg: '#fafaff',
  defaultGrey: 'rgba(60, 60, 67, 0.6)',
  chipBg: 'rgba(235, 235, 245, 0.6)',
  greyIcon: '#38383A',
};

export default colors;

// export type IColors = Leaves<ITheme['colors']>;
export type IColors = Leaves<typeof colors>;
