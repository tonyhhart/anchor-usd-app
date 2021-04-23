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
import { formatMoney } from 'services/helpers-service';
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
          left={() => <IconButton color={Colors.white} icon="speedometer" style={styles.icon} />}
          title="Margin Account"
          description="Available buying power"
        />
      </View>

      <View style={[styles.card]}>
        <ListItem
          left={() => <UsdIcon style={[styles.icon, styles.iconUsd]} />}
          title="High Yield Interest Account"
          description="Interest Rate: 7.83% APR"
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
});
