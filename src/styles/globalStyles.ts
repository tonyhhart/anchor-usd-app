import { StyleSheet } from 'react-native';

import Colors from 'constants/Colors';
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

    shadowColor: '#6394c6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.46,
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
    marginHorizontal: -Metrics.base,
  },
  col: {
    flex: 1,
    paddingHorizontal: Metrics.base,
  },
  loadingContainer: {
    minHeight: Layout.window.height - 300,
    justifyContent: 'center',
  },
});
