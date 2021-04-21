import * as React from 'react';
import { StyleSheet } from 'react-native';
import { List } from 'react-native-paper';

import Metrics from 'constants/Metrics';

import { Text } from './Themed';

function ListSubheader(props: React.ComponentProps<List.Subheader>) {
  return (
    <List.Subheader style={styles.item} {...props}>
      <Text>{props.children}</Text>
    </List.Subheader>
  );
}

ListSubheader.defaultProps = {};

export default ListSubheader;

const styles = StyleSheet.create({
  item: {
    marginTop: Metrics.base,
    paddingHorizontal: Metrics.base,
    elevation: 0,
    fontWeight: 'bold',
    fontSize: Metrics.label,
  },
});
