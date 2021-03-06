/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { Coin } from 'store';

export type SettingsItem = {
  icon: string;
  title: string;
  description: string;
  onPress?: () => any;
};

export type SettingsSection = {
  title: string;
  data: SettingsItem[];
};

export type SettingsSectionData = SettingsSection[];

export type PublicStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type RootStackParamList = {
  Root: undefined;
  ViewCoin: { coin: Coin };
  NotFound: undefined;
};

export type BottomTabParamList = {
  ExploreTab: undefined;
  PortifolioTab: undefined;
  MoveTab: undefined;
  SettingsTab: undefined;
};

export type ExploreTabParamList = {
  ExploreScreen: undefined;
};

export type PortifolioTabParamList = {
  PortifolioScreen: undefined;
};

export type MoveTabParamList = {
  MoveScreen: undefined;
};

export type SettingsTabParamList = {
  SettingsScreen: undefined;
};
