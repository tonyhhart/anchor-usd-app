import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Divider, List, Surface, Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RouteProp, useRoute } from '@react-navigation/core';
import CoinItem from 'components/CoinItem';
import { Text } from 'components/Themed';
import Colors, { tintColorLight } from 'constants/Colors';
import Metrics from 'constants/Metrics';
import { formatMoney } from 'services/helpers-service';
import globalStyles from 'styles/globalStyles';
import { RootStackParamList } from 'types';

export default function ViewCoinScreen() {
  const route: RouteProp<RootStackParamList, 'ViewCoin'> = useRoute();
  const { coin } = route.params;

  return (
    <>
      <ScrollView contentContainerStyle={styles.scroll}>
        <CoinItem item={coin} showGraphImage={false} showGraph />

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
  scroll: { paddingTop: Metrics.base, paddingBottom: Metrics.base * 2 },
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
});
