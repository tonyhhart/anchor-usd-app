import * as React from 'react';
import { FlatList, StyleSheet, ListRenderItemInfo, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigation } from '@react-navigation/core';
import CoinItem from 'components/CoinItem';
import Metrics from 'constants/Metrics';
import { Coin, listCoinsAsync, selectApiToken, selectCoinState } from 'store';

export default function SettingsScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { data } = useSelector(selectCoinState);
  const api_token = useSelector(selectApiToken);

  React.useEffect(() => {
    dispatch(listCoinsAsync(api_token));
  }, []);

  function renderCoinItem({ item }: ListRenderItemInfo<Coin>) {
    function navigateToViewCoinScreen() {
      navigation.navigate('ViewCoin', { coin: item });
    }

    return (
      <Pressable onPress={navigateToViewCoinScreen}>
        <CoinItem item={item} />
      </Pressable>
    );
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
