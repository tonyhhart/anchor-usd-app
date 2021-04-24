import { Linking, Platform, LayoutAnimation } from 'react-native';

import { API_ENDPOINT } from '@env';
import * as Haptics from 'expo-haptics';
import * as WebBrowser from 'expo-web-browser';

export function animateNext(): void {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
}

export function animateNextSpring(): void {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
}

export function animateNextFlatList(): void {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
}

export const isWeb = (): boolean => Platform.OS === 'web';
export const isIOS = (): boolean => Platform.OS === 'ios';
export const isAndroid = (): boolean => Platform.OS === 'android';

export function jsonConsole(...any: unknown[]): void {
  for (let i = 0; i < any.length; i += 1) {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(any[i], null, 2));
  }
}

export function hapticsSelect(): void {
  if (isIOS()) Haptics.selectionAsync();
}

export function hapticsLight(): void {
  if (isIOS()) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
}

export function imageUrl(path: string): string {
  const [baseUrl] = API_ENDPOINT.split('api');
  return baseUrl + path;
}

export function formatMoney(money: number): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(money);
}

export function formatPercentage(money: number): string {
  return `${money.toFixed(2)}%`;
}

export function hexToRgbA(hex: string, opacity = 1): string {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = `0x${c.join('')}`;
    // eslint-disable-next-line no-bitwise
    return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')},${opacity})`;
  }
  throw new Error('Bad Hex');
}

export function openUrl(url: string) {
  return WebBrowser.openBrowserAsync(url).catch(() => Linking.openURL(url));
}
