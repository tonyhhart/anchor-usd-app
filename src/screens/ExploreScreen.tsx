import * as React from 'react';
import { FlatList, StyleSheet, ListRenderItemInfo } from 'react-native';
import { useDispatch, useSelector, useStore } from 'react-redux';

import CoinItem from 'components/CoinItem';
import Metrics from 'constants/Metrics';
import { Coin, listCoinsAsync, selectApiToken, selectCoinState } from 'store';

export default function SettingsScreen() {
  const dispatch = useDispatch();
  const { data } = useSelector(selectCoinState);
  const api_token = useSelector(selectApiToken);

  React.useEffect(() => {
    dispatch(listCoinsAsync(api_token));
  }, []);

  function renderCoinItem({ item }: ListRenderItemInfo<Coin>) {
    return <CoinItem item={item} />;
  }

  function keyExtractor(item: Coin) {
    return item.id.toString();
  }

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={data}
      renderItem={renderCoinItem}
      keyExtractor={keyExtractor}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: Metrics.base,
  },
});
