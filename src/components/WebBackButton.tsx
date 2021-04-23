import * as React from 'react';
import { Pressable } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import Metrics from 'constants/Metrics';
import { isWeb } from 'services/helpers-service';

function WebBackButton({ tintColor }: { tintColor?: string }) {
  if (isWeb()) {
    return (
      <Pressable style={{ paddingHorizontal: Metrics.base }} onPress={() => window.history.back()}>
        <Ionicons name="arrow-back" size={32} color={tintColor} />
      </Pressable>
    );
  }

  return undefined;
}

WebBackButton.defaultProps = { tintColor: undefined };

export default WebBackButton;
