import { Colors } from 'react-native-paper';

export const tintColorLight = '#21d23e';
export const tintColorDark = '#ffffff';

export default {
  success: Colors.green500,
  danger: Colors.red800,
  white: Colors.white,
  light: {
    text: '#000000',
    background: '#ffffff',
    tint: tintColorLight,
    tabIconDefault: '#cccccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ffffff',
    background: '#1e1e1e',
    tint: tintColorDark,
    tabIconDefault: '#cccccc',
    tabIconSelected: tintColorDark,
  },
};
