import * as React from 'react';
import { StyleSheet, View, RefreshControl, ScrollView } from 'react-native';
import { IconButton } from 'react-native-paper';

import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import ListItem from 'components/ListItem';
import { Text } from 'components/Themed';
import UsdIcon from 'components/UsdIcon';
import Colors, { tintColorLight } from 'constants/Colors';
import Metrics from 'constants/Metrics';
import { formatMoney, formatPercentage } from 'services/helpers-service';
import { RootStackParamList } from 'types';

export default function PortifolioScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    onRefresh();

    navigation.setOptions({
      headerRight: () => (
        <IconButton size={16} color={Colors.white} style={styles.headerIcon} icon="plus" />
      ),
    });
  }, []);

  function onRefresh() {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }

  function rightComponent() {
    return (
      <View style={styles.righComponent}>
        <View>
          <Text style={styles.price}>{formatMoney(0)} USD</Text>
          <Text style={[styles.percentage]}>{formatPercentage(0)} USD</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={styles.topBackground}>
        <Text lightColor={Colors.dark.text} darkColor={Colors.dark.text} style={styles.label}>
          Total balance
        </Text>
        <Text lightColor={Colors.dark.text} darkColor={Colors.dark.text} style={styles.amount}>
          {formatMoney(0)}
        </Text>
      </View>

      <View style={[styles.card]}>
        <ListItem
          title="Margin Account"
          description="Available buying power"
          left={() => <IconButton color={Colors.white} icon="speedometer" style={styles.icon} />}
          right={rightComponent}
          descriptionNumberOfLines={1}
        />
      </View>

      <View style={[styles.card]}>
        <ListItem
          title="High Yield Interest Account"
          description="Interest Rate: 7.83% APR"
          left={() => <UsdIcon style={[styles.icon, styles.iconUsd]} />}
          right={rightComponent}
          descriptionNumberOfLines={1}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  topBackground: {
    backgroundColor: tintColorLight,
    marginBottom: -Metrics.base - 1,
    borderBottomLeftRadius: Metrics.base,
    borderBottomRightRadius: Metrics.base,
    padding: Metrics.base,
    paddingBottom: Metrics.base * 2,
  },
  label: {
    fontSize: Metrics.small,
  },
  amount: {
    fontWeight: 'bold',
    fontSize: Metrics.h1,
  },
  card: {
    marginBottom: Metrics.base,
    marginHorizontal: Metrics.base + 2,
  },
  icon: {
    marginLeft: 0,
    marginHorizontal: Metrics.small / 2,
    alignSelf: 'center',
    backgroundColor: Colors.purple,
    width: 36,
    height: 36,
  },
  iconUsd: {
    backgroundColor: Colors.transparent,
  },
  headerIcon: {
    backgroundColor: tintColorLight,
    marginRight: Metrics.base,
  },
  righComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
