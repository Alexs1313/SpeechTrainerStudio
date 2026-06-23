import {Platform} from 'react-native';

import {fonts} from './fonts';
import {speechTrainerStudioShadow} from './shadow';

export const DESIGN_WIDTH = 393;
export const DESIGN_HEIGHT = 852;

export {colors} from './colors';
export {fonts};

export const spacing = {
  s: 8,
  m: 12,
  l: 16,
  xl: 20,
  xxl: 28,
};

export const radius = {
  card: 16,
  button: 16,
  chip: 8,
  pill: 999,
};

export const fontSize = {
  caption: 9.5,
  small: 11,
  body: 13,
  button: 15,
  title: 22,
  hero: 28,
};

export const layout = {
  screenPadding: 20,
  tabHeight: 66,
  buttonHeight: 56,
};

export const topInset = (value: number) =>
  Platform.OS === 'android' ? Math.max(value, 30) : value;

export {speechTrainerStudioShadow};
