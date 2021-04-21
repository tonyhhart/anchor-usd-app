import { StyleSheet } from 'react-native';

import Metrics from 'constants/Metrics';

export default StyleSheet.create({
  safeareaview: {
    flex: 1,
  },
  containerVerticalCenter: {
    flex: 1,
    paddingHorizontal: Metrics.base,
  },
  input: {
    marginBottom: Metrics.base,
  },
  button: {
    marginBottom: Metrics.base,
    height: 56,
    justifyContent: 'center',
  },
  card: {
    elevation: 0,

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
});
