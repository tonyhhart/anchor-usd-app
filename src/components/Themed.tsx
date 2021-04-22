/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import * as React from 'react';
import { Text as DefaultText, View as DefaultView } from 'react-native';
import { LineChart as DefaulLineChart } from 'react-native-chart-kit';

import Colors from 'constants/Colors';
import useColorScheme from 'hooks/useColorScheme';
import { hexToRgbA } from 'services/helpers-service';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  }
  return Colors[theme][colorName];
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type DefaulLineChartProps = ThemeProps &
  Pick<DefaulLineChart['props'], Exclude<keyof DefaulLineChart['props'], 'data'>> & {
    data: number[];
  };

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function LineChart(props: DefaulLineChartProps) {
  const { data } = props;

  const color = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');

  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    'background'
  );

  return (
    <DefaulLineChart
      {...props}
      data={{
        labels: [],
        datasets: [
          {
            data,
            color: (opacity = 1) => hexToRgbA(color, opacity), // optional
            strokeWidth: 2.2, // optional
          },
        ],
      }}
      withVerticalLabels={false}
      withHorizontalLabels={false}
      withDots={false}
      chartConfig={{
        color: (opacity) => hexToRgbA(backgroundColor, opacity),
        backgroundGradientFrom: backgroundColor,
        backgroundGradientTo: backgroundColor,
        decimalPlaces: 2, // optional, defaults to 2dp
      }}
      bezier
    />
  );
}
