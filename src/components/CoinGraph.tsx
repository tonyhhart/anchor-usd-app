import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useSelector } from 'react-redux';

import Colors from 'constants/Colors';
import Layout from 'constants/Layout';
import Metrics from 'constants/Metrics';
import useReduxDispatch from 'hooks/useReduxDispatch';
import { Coin, getCoinAsync, selectApiToken } from 'store';

function CoinGraph({ item }: { item: Coin }) {
  const dispatch = useReduxDispatch();
  const api_token = useSelector(selectApiToken);
  const [data, setData] = useState<number[]>([0]);

  useEffect(() => {
    dispatch(getCoinAsync(api_token, item))
      .then((coin) => setData(coin.historic.map((h) => h.close)))
      .catch((error) => alert(error));
  }, []);

  return (
    <LineChart
      withVerticalLabels={false}
      withHorizontalLabels={false}
      withDots={false}
      data={{
        labels: [],
        datasets: [
          {
            data,
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2, // optional
          },
        ],
      }}
      width={Layout.window.width - Metrics.base * 2}
      height={220}
      chartConfig={{
        backgroundColor: '#ff0000',
        backgroundGradientFrom: '#ff0000',
        backgroundGradientTo: '#ffffff00',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
      }}
    />
  );
}

CoinGraph.defaultProps = {
  showGraphImage: true,
};

export default CoinGraph;

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
