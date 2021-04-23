import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Divider, List } from 'react-native-paper';

import Metrics from 'constants/Metrics';
import globalStyles from 'styles/globalStyles';

import { Surface } from './Themed';

function ListItem(props: Props) {
  const { size, destructive, cardDisabled, showDividers, icon, onPress } = props;

  return (
    <Surface style={[cardDisabled ? globalStyles.cardDisabled : globalStyles.card]}>
      {showDividers && <Divider />}
      <List.Item
        style={[styles.item, destructive && styles.itemDestructive]}
        titleStyle={[
          styles.title,
          size === 'large' && styles.titleLarge,
          destructive && styles.titleDestructive,
        ]}
        left={
          icon
            ? (iconProps) => <List.Icon {...iconProps} icon={icon} style={styles.icon} />
            : undefined
        }
        right={
          onPress
            ? (iconProps) => (
                <List.Icon {...iconProps} icon="chevron-right" style={styles.icon} color="red" />
              )
            : undefined
        }
        {...props}
      />
      {showDividers && <Divider />}
    </Surface>
  );
}

ListItem.defaultProps = {
  size: 'default',
  destructive: false,
  onPress: null,
  icon: undefined,
  cardDisabled: false,
  showDividers: false,
};

export default ListItem;

type Props = React.ComponentProps<typeof List.Item> & {
  size?: 'small' | 'default' | 'large';
  icon?: string;
  destructive?: boolean;
  cardDisabled?: boolean;
  showDividers?: boolean;
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
