import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Avatar, List, Surface } from 'react-native-paper';

import Metrics from 'constants/Metrics';
import { CoinResponse } from 'store';
import globalStyles from 'styles/globalStyles';

function CoinItem({ item }: { item: CoinResponse }) {
  const { CoinModel: model } = item;
  return (
    <Surface style={[globalStyles.card, styles.card]}>
      <List.Item
        title={model.name}
        titleStyle={styles.title}
        description={model.fullname}
        left={() => (
          <Avatar.Image
            style={globalStyles.avatar}
            size={48}
            backgroundColor="transparent"
            source={{ uri: model.image_url }}
          />
        )}
      />
    </Surface>
  );
}

CoinItem.defaultProps = {};

export default CoinItem;

const styles = StyleSheet.create({
  card: {
    marginBottom: Metrics.base,
    marginHorizontal: Metrics.base,
  },
  title: {
    marginBottom: Metrics.base / 4,
    fontWeight: '500',
  },
});
