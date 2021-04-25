import React, { useEffect, useState } from 'react';
import { StyleSheet, View, RefreshControl, Animated, Pressable } from 'react-native';
import DraggableFlatList, {
  DragEndParams,
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import { ActivityIndicator } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { Link, useNavigation } from '@react-navigation/native';
import CoinItem from 'components/CoinItem';
import Layout from 'constants/Layout';
import Metrics from 'constants/Metrics';
import useReduxDispatch from 'hooks/useReduxDispatch';
import { animateNextFlatList, isWeb } from 'services/helpers-service';
import { Coin, listCoinsAsync, selectApiToken, selectCoinState, updateUserInfoAsync } from 'store';
import globalStyles from 'styles/globalStyles';

export default function SettingsScreen() {
  const dispatch = useReduxDispatch();
  const navigation = useNavigation();

  const { data: coinData, success } = useSelector(selectCoinState);
  const api_token = useSelector(selectApiToken);

  const [refreshing, setRefreshing] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [data, setData] = useState(coinData);
  const [key, setKey] = useState(new Date().toString());

  useEffect(() => {
    if (data.length) {
      onRefresh();
    } else {
      dispatch(listCoinsAsync(api_token))
        .then(setData)
        .finally(() => {
          setKey(new Date().toString());
        });
    }
  }, []);

  function onRefresh() {
    setRefreshing(true);
    dispatch(listCoinsAsync(api_token))
      .then((d) => {
        animateNextFlatList();
        setData(d);
      })
      .finally(() => {
        setRefreshing(false);
        setKey(new Date().toString());
      });
  }

  function onDragBegin() {
    Animated.spring(animation, {
      toValue: 1,
      speed: 100,
      useNativeDriver: true,
    }).start();
  }

  function onRelease() {
    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }

  function onDragEnd({ data: reorderedData }: DragEndParams<Coin>) {
    setData(reorderedData);

    dispatch(updateUserInfoAsync(api_token, { coins_order: reorderedData.map((c) => c.id) }));
  }

  function renderCoinItem({ item, drag, isActive }: RenderItemParams<Coin>) {
    const animatedStyle = {
      transform: [
        {
          scale: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, isActive ? 1.06 : 1],
          }),
        },
      ],
      width: Layout.window.width,
      position: 'relative',
    };

    if (isWeb()) {
      return (
        <Link onLongPress={drag} to={`/coins/${item.id}`}>
          <Animated.View style={animatedStyle}>
            <CoinItem item={item} />
          </Animated.View>
        </Link>
      );
    }

    return (
      <Pressable onLongPress={drag} onPress={() => navigation.navigate('ViewCoin', { coin: item })}>
        <Animated.View style={animatedStyle}>
          <CoinItem item={item} />
        </Animated.View>
      </Pressable>
    );
  }

  function keyExtractor(item: Coin) {
    return item.id.toString();
  }

  return (
    <DraggableFlatList
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
      onDragEnd={onDragEnd}
      onDragBegin={onDragBegin}
      onRelease={onRelease}
      layoutInvalidationKey={key}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: Metrics.base,
  },
});
