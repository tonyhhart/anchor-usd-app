import * as React from 'react';
import { Pressable } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import Metrics from 'constants/Metrics';

function WebBackButton({ tintColor }: { tintColor?: string }) {
  return (
    <Pressable style={{ paddingHorizontal: Metrics.base }} onPress={() => window.history.back()}>
      <Ionicons name="arrow-back" size={32} color={tintColor} />
    </Pressable>
  );
}

WebBackButton.defaultProps = { tintColor: undefined };

export default WebBackButton;
