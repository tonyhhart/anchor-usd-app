import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import Layout from 'constants/Layout';
import Metrics from 'constants/Metrics';

import { LineChart } from './Themed';

function CoinGraph({ data, loading }: { data: number[]; loading: boolean }) {
  return (
    <View style={styles.overflow}>
      <View style={styles.container}>
        <LineChart data={data} width={58 + Layout.window.width - Metrics.base * 2} height={220} />

        <View style={styles.loadingContainer}>
          <ActivityIndicator size={40} animating={loading} />
        </View>
      </View>
    </View>
  );
}

export default CoinGraph;

const styles = StyleSheet.create({
  overflow: { overflow: 'hidden' },
  container: { marginLeft: -60, position: 'relative' },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    left: 60,
    justifyContent: 'center',
  },
});
