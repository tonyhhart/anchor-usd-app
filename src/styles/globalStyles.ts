import { StyleSheet } from 'react-native';

import { BottomTabBarOptions } from '@react-navigation/bottom-tabs';
import { StackNavigationOptions } from '@react-navigation/stack';
import Colors, { tintColorLight } from 'constants/Colors';
import Layout from 'constants/Layout';
import Metrics from 'constants/Metrics';
import { isIOS } from 'services/helpers-service';

export default StyleSheet.create({
  safeareaview: {
    flex: 1,
  },
  containerVerticalCenter: {
    flex: 1,
    paddingHorizontal: Metrics.base,
  },
  input: {
    paddingHorizontal: 0,
  },
  inputError: {
    color: Colors.danger,
    height: 30,
    lineHeight: 30,
    marginLeft: isIOS() ? -4 : 0,
  },
  button: {
    marginBottom: Metrics.base,
    height: 56,
    justifyContent: 'center',
  },
  card: {
    elevation: 1,

    borderRadius: Metrics.radius,

    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.46,
  },
  cardDisabled: {
    elevation: 0,
    borderRadius: 0,
    shadowOpacity: 0,
  },
  avatar: {
    alignSelf: 'center',
    marginHorizontal: Metrics.base / 3,
    backgroundColor: 'transparent',
  },
  content: {
    padding: Metrics.base,
  },
  contentDescription: {
    fontSize: Metrics.label - 2,
    opacity: 0.5,
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: Metrics.base * -0.5,
  },
  col: {
    flex: 1,
    paddingHorizontal: Metrics.base / 2,
  },
  loadingContainer: {
    minHeight: Layout.window.height - 300,
    justifyContent: 'center',
  },
  tint: { color: tintColorLight },
  link: { width: '100%', backgroundColor: 'red' },
});

export const headerStyle: StackNavigationOptions = {
  headerStyle: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    borderBottomWidth: 0,
  },
  headerTitleStyle: {
    fontWeight: '700',
    letterSpacing: 1,
  },
};

export const headerGreenStyle: StackNavigationOptions = {
  headerStyle: {
    ...headerStyle.headerStyle,
    backgroundColor: Colors.light.tint,
  },
  headerTintColor: Colors.white,
};

export const tabOptions: BottomTabBarOptions = {
  safeAreaInsets: {
    bottom: 0,
  },
  style: {
    height: 80,
  },
  showLabel: false,
};
