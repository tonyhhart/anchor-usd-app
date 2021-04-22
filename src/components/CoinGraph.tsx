import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import { useSelector } from 'react-redux';

import Colors from 'constants/Colors';
import Layout from 'constants/Layout';
import Metrics from 'constants/Metrics';
import useReduxDispatch from 'hooks/useReduxDispatch';
import { jsonConsole } from 'services/helpers-service';
import { Coin, getCoinAsync, selectApiToken, selectCoinState } from 'store';
import globalStyles from 'styles/globalStyles';

import { LineChart } from './Themed';

function CoinGraph({ item }: { item: Coin }) {
  const dispatch = useReduxDispatch();
  const api_token = useSelector(selectApiToken);
  const { loading } = useSelector(selectCoinState);
  const [data, setData] = useState([0]);
  const [period, setPeriod] = useState('day');

  useEffect(() => {
    refresh();
  }, []);

  function refresh(_period = 'day') {
    dispatch(getCoinAsync(api_token, item, _period))
      .then((coin) => setData(coin.historic.map((h) => h.close)))
      .catch((error) => jsonConsole(error));
  }

  function renderActions() {
    const actions: Record<string, string> = {
      '1H': 'hour',
      '1D': 'day',
      '1W': 'week',
      '1M': 'month',
    };

    return (
      <View style={[globalStyles.row, styles.actions]}>
        {Object.keys(actions).map((action) => (
          <View style={globalStyles.col}>
            <Button
              mode={period === actions[action] ? 'contained' : 'text'}
              onPress={
                period !== actions[action]
                  ? () => {
                      setPeriod(actions[action]);
                      refresh(actions[action]);
                    }
                  : undefined
              }
            >
              {action}
            </Button>
          </View>
        ))}
      </View>
    );
  }

  return (
    <View>
      <View style={styles.container}>
        <LineChart data={data} width={58 + Layout.window.width - Metrics.base * 2} height={220} />

        <View style={styles.loadingContainer}>
          <ActivityIndicator size={40} animating={loading} />
        </View>
      </View>

      {renderActions()}
    </View>
  );
}

export default CoinGraph;

const styles = StyleSheet.create({
  container: { marginLeft: -60, position: 'relative' },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    left: 60,
    justifyContent: 'center',
  },
  actions: {
    paddingHorizontal: Metrics.base / 4,
    paddingBottom: Metrics.base / 4,
  },
});
