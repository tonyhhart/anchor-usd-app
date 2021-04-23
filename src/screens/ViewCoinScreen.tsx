import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Divider, List, Surface, Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import { RouteProp, useRoute } from '@react-navigation/core';
import CoinGraph from 'components/CoinGraph';
import CoinItem from 'components/CoinItem';
import { Text, View as ViewThemed } from 'components/Themed';
import Colors, { tintColorLight } from 'constants/Colors';
import Metrics from 'constants/Metrics';
import useReduxDispatch from 'hooks/useReduxDispatch';
import { formatMoney, formatPercentage, hapticsLight, jsonConsole } from 'services/helpers-service';
import { getCoinAsync, selectApiToken, selectCoinState } from 'store';
import globalStyles from 'styles/globalStyles';
import { RootStackParamList } from 'types';

export default function ViewCoinScreen() {
  const route: RouteProp<RootStackParamList, 'ViewCoin'> = useRoute();
  const [coin, setCoin] = useState(route.params.coin);

  const dispatch = useReduxDispatch();
  const api_token = useSelector(selectApiToken);
  const { loading } = useSelector(selectCoinState);
  const [data, setData] = useState([0]);
  const [period, setPeriod] = useState('day');

  React.useEffect(() => {
    refresh();
  }, []);

  function refresh(_period = 'day') {
    dispatch(getCoinAsync(api_token, coin, _period))
      .then((c) => {
        setCoin(c);
        setData(c.historic.map((h) => h.close));
      })
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
          <View key={action} style={globalStyles.col}>
            <Button
              mode={period === actions[action] ? 'contained' : 'text'}
              onPress={
                period !== actions[action]
                  ? () => {
                      setPeriod(actions[action]);
                      refresh(actions[action]);
                      hapticsLight();
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
    <>
      <View style={styles.topBackground} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <CoinItem
          item={coin}
          showGraphImage={false}
          content={
            <>
              <CoinGraph data={data} loading={loading} />
              {renderActions()}
            </>
          }
        />

        <ViewThemed style={styles.container}>
          <View style={globalStyles.content}>
            <Title>{`What is ${coin.coinname}?`}</Title>
            <Text
              style={[globalStyles.contentDescription, styles.description]}
            >{`${coin.description}`}</Text>

            <Title>{`${coin.coinname} Statistics`}</Title>
          </View>

          <List.Item
            title={`${coin.coinname} Price`}
            right={() => <Text style={styles.value}>{formatMoney(coin.usd_price)}</Text>}
          />
          <Divider />
          <List.Item
            title="Price Change Last Hour"
            right={() => (
              <Text style={styles.value}>{formatPercentage(coin.usd_change_pct_hour ?? 0)}</Text>
            )}
          />
          <Divider />
          <List.Item
            title="Price Change Last 24 hours"
            right={() => (
              <Text style={styles.value}>
                {formatPercentage(coin.usd_change_pct_24_hours ?? 0)}
              </Text>
            )}
          />
        </ViewThemed>
      </ScrollView>

      <Surface style={styles.surface}>
        <SafeAreaView edges={['bottom']}>
          <View style={globalStyles.row}>
            <View style={globalStyles.col}>
              <Button style={globalStyles.button} mode="contained" color={tintColorLight}>
                Buy
              </Button>
            </View>
            <View style={globalStyles.col}>
              <Button style={globalStyles.button} color={Colors.dark.background} mode="contained">
                Sell
              </Button>
            </View>
          </View>
        </SafeAreaView>
      </Surface>
    </>
  );
}

const styles = StyleSheet.create({
  topBackground: {
    height: 56,
    backgroundColor: tintColorLight,
    marginBottom: -56,
  },
  scroll: { paddingTop: Metrics.base },
  container: { paddingBottom: Metrics.base * 2 },
  description: {
    marginBottom: Metrics.base,
  },
  value: {
    alignSelf: 'center',
  },
  surface: {
    paddingHorizontal: Metrics.base,
    paddingTop: Metrics.base,
  },
  actions: {
    paddingHorizontal: Metrics.base / 4,
    paddingBottom: Metrics.base / 4,
  },
});
