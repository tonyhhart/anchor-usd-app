import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Avatar, List } from 'react-native-paper';

import Colors from 'constants/Colors';
import Metrics from 'constants/Metrics';
import { formatMoney, formatPercentage } from 'services/helpers-service';
import { Coin } from 'store';
import globalStyles from 'styles/globalStyles';

import { Surface, Text } from './Themed';

function CoinItem({
  item,
  content,
  showGraphImage,
}: {
  item: Coin;
  content?: React.ReactElement;
  showGraphImage?: boolean;
}) {
  function leftComponent() {
    return <Avatar.Image style={globalStyles.avatar} size={40} source={{ uri: item.image_url }} />;
  }

  function rightComponent() {
    return (
      <View style={styles.righComponent}>
        {showGraphImage && (
          <Image
            style={styles.chartImage}
            source={{
              uri: `https://images.cryptocompare.com/sparkchart/${item.symbol}/USD/latest.png`,
            }}
          />
        )}

        <View>
          <Text style={styles.price}>{formatMoney(item.usd_price)}</Text>
          <Text
            style={[
              styles.percentage,
              { color: item.usd_change_pct_24_hours > 0 ? Colors.success : Colors.danger },
            ]}
          >
            {item.usd_change_pct_24_hours > 0 ? '▴' : '▾'}
            {formatPercentage(item.usd_change_pct_24_hours)}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <Surface style={styles.card}>
      <List.Item
        title={item.coinname}
        titleStyle={styles.title}
        description={item.name}
        descriptionStyle={styles.description}
        left={leftComponent}
        descriptionNumberOfLines={1}
        right={rightComponent}
      />

      {content}
    </Surface>
  );
}

CoinItem.defaultProps = {
  showGraphImage: true,
  content: undefined,
};

export default CoinItem;

const styles = StyleSheet.create({
  card: {
    marginBottom: Metrics.base,
    marginHorizontal: Metrics.base,
  },
  title: {
    marginBottom: Metrics.base / 4,
    fontWeight: '600',
    fontSize: Metrics.label,
  },
  description: {
    opacity: 0.8,
    fontSize: Metrics.small,
  },
  righComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 180,
  },
  chartImage: {
    flex: 1,
    height: '100%',
    maxWidth: 150 * 0.8,
    maxHeight: 35 * 0.8,
    resizeMode: 'contain',
  },
  price: {
    fontWeight: '700',
    fontSize: Metrics.label - 2,
    minWidth: 90,
    textAlign: 'right',
    marginBottom: 2,
  },
  percentage: {
    fontSize: Metrics.label - 3,
    textAlign: 'right',
    fontWeight: '500',
  },
});
