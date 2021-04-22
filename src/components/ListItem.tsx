import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Divider, List, Surface } from 'react-native-paper';

import Metrics from 'constants/Metrics';

function ListItem(props: Props) {
  return (
    <Surface style={styles.surface}>
      <Divider />
      <List.Item
        style={[styles.item, props.destructive && styles.itemDestructive]}
        titleStyle={[
          styles.title,
          props.size === 'large' && styles.titleLarge,
          props.destructive && styles.titleDestructive,
        ]}
        left={
          props.icon
            ? (iconProps) => <List.Icon {...iconProps} icon={props.icon} style={styles.icon} />
            : null
        }
        right={
          props.onPress
            ? (iconProps) => (
                <List.Icon {...iconProps} icon="chevron-right" style={styles.icon} color="red" />
              )
            : null
        }
        {...props}
      />
      <Divider />
    </Surface>
  );
}

ListItem.defaultProps = {
  size: 'default',
  destructive: false,
  onPress: null,
};

export default ListItem;

type Props = React.ComponentProps<List.Item> & {
  size?: 'small' | 'default' | 'large';
  destructive?: boolean;
  onPress?: () => any;
};

const styles = StyleSheet.create({
  surface: {
    elevation: 0,
  },
  title: {
    marginBottom: Metrics.base / 4,
    fontWeight: '500',
  },
  titleLarge: {
    fontSize: Metrics.base * 1.2,
    fontWeight: '600',
  },
  titleDestructive: {
    color: '#ff0000',
  },
  item: {
    paddingHorizontal: Metrics.base,
    elevation: 0,
  },
  itemDestructive: {
    backgroundColor: '#ff000011',
  },
  icon: {
    margin: 0,
    alignSelf: 'center',
  },
});
