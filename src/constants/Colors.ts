import { Colors } from 'react-native-paper';

export const tintColorLight = '#21d23e';
export const tintColorDark = '#fff';

export default {
  success: Colors.green500,
  danger: Colors.red800,
  white: Colors.white,
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
