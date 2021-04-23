import * as React from 'react';
import { useState } from 'react';
import { ListRenderItemInfo, Pressable, StyleSheet, View as ViewBase } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Button, IconButton } from 'react-native-paper';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Surface, Text } from 'components/Themed';
import Colors, { tintColorLight } from 'constants/Colors';
import Layout from 'constants/Layout';
import Metrics from 'constants/Metrics';
import useColorScheme from 'hooks/useColorScheme';
import { formatMoney, hapticsLight } from 'services/helpers-service';
import globalStyles from 'styles/globalStyles';
import { RootStackParamList } from 'types';

export default function PortifolioScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [amount, setAmount] = useState(0);
  const colorScheme = useColorScheme();
  const buttons: Array<CalculatorButton> = [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, 'BACKSPACE'];

  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Ionicons
          size={20}
          color={Colors[colorScheme].text}
          style={styles.headerIcon}
          name="qr-code-outline"
        />
      ),
      headerRight: () => (
        <Ionicons
          size={20}
          color={Colors[colorScheme].text}
          style={styles.headerIcon}
          name="document-outline"
        />
      ),
    });
  }, [colorScheme]);

  function renderHeader() {
    return <Text style={styles.amount}>{formatMoney(amount)}</Text>;
  }

  function renderButton({ item: button }: ListRenderItemInfo<CalculatorButton>) {
    function pressButton() {
      hapticsLight();

      const localAmount = Number((amount * 100).toFixed(0));

      if (typeof button === 'number') {
        return setAmount(Number(`${localAmount}${button}`) / 100);
      }

      return setAmount(Number(localAmount.toString().slice(0, -1)) / 100);
    }

    return (
      <ViewBase style={styles.button}>
        {button !== '.' ? (
          <Pressable onPress={pressButton}>
            <Surface style={styles.buttonRound}>
              {typeof button === 'number' ? (
                <Text style={styles.buttonText}>{button}</Text>
              ) : (
                <Ionicons
                  style={styles.buttonText}
                  name="backspace-outline"
                  color={Colors[colorScheme].text}
                />
              )}
            </Surface>
          </Pressable>
        ) : null}
      </ViewBase>
    );
  }

  function keyExtractor(item: CalculatorButton) {
    return item.toString();
  }

  return (
    <>
      <ViewBase style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={buttons}
          ListHeaderComponent={renderHeader}
          renderItem={renderButton}
          keyExtractor={keyExtractor}
          numColumns={3}
        />
      </ViewBase>

      <ViewBase style={[globalStyles.row, styles.actions]}>
        <ViewBase style={globalStyles.col}>
          <Button
            disabled={amount === 0}
            style={globalStyles.button}
            mode="contained"
            color={tintColorLight}
          >
            Request
          </Button>
        </ViewBase>
        <ViewBase style={globalStyles.col}>
          <Button
            disabled={amount === 0}
            style={globalStyles.button}
            color={Colors.dark.background}
            mode="contained"
          >
            Pay
          </Button>
        </ViewBase>
      </ViewBase>
    </>
  );
}

type CalculatorButton = number | '.' | 'BACKSPACE';

const BUTTON_SIZE = (Layout.window.width * 0.8) / 3 - Metrics.base * 1.5;

const styles = StyleSheet.create({
  headerIcon: {
    marginHorizontal: Metrics.base,
  },
  container: {
    flex: 1,
    width: Layout.window.width * 0.8,
    alignSelf: 'center',
  },
  listContent: {
    maxWidth: Layout.window.width * 0.8,
    justifyContent: 'center',
  },
  amount: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: Metrics.base * 1.5,
  },
  button: {
    flex: 1,
    marginHorizontal: 1,
  },
  buttonRound: {
    borderRadius: BUTTON_SIZE / 2,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    marginBottom: Metrics.base,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.05,
  },
  buttonText: {
    fontSize: Metrics.h1,
    opacity: 0.6,
  },
  actions: {
    paddingHorizontal: Metrics.base,
  },
});
