import * as React from 'react';
import {
  FlatList,
  StyleSheet,
  ListRenderItemInfo,
  Pressable,
  View,
  RefreshControl,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { useNavigation } from '@react-navigation/core';
import { Link } from '@react-navigation/native';
import CoinItem from 'components/CoinItem';
import Metrics from 'constants/Metrics';
import useReduxDispatch from 'hooks/useReduxDispatch';
import { hapticsLight, isWeb } from 'services/helpers-service';
import { Coin, listCoinsAsync, selectApiToken, selectCoinState } from 'store';
import globalStyles from 'styles/globalStyles';

export default function SettingsScreen() {
  const dispatch = useReduxDispatch();
  const navigation = useNavigation();

  const { data, success } = useSelector(selectCoinState);
  const api_token = useSelector(selectApiToken);
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    if (data.length) {
      onRefresh();
    } else {
      dispatch(listCoinsAsync(api_token));
    }
  }, []);

  function onRefresh() {
    setRefreshing(true);
    dispatch(listCoinsAsync(api_token)).finally(() => setRefreshing(false));
  }

  function renderCoinItem({ item }: ListRenderItemInfo<Coin>) {
    function navigateToViewCoinScreen() {
      navigation.navigate('ViewCoin', { coin: item });
      hapticsLight();
    }

    if (isWeb()) {
      return (
        <Link to={`/coins/${item.id}`}>
          <View style={globalStyles.link}>
            <CoinItem item={item} />
          </View>
        </Link>
      );
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
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      contentContainerStyle={styles.list}
      data={data}
      renderItem={renderCoinItem}
      keyExtractor={keyExtractor}
      ListEmptyComponent={
        <View style={globalStyles.loadingContainer}>
          <ActivityIndicator size={42} hidesWhenStopped animating={!success} />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: Metrics.base,
  },
});
