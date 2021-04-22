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
});
