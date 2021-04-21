/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

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
};

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  ExploreTab: undefined;
  SettingsTab: undefined;
};

export type ExploreTabParamList = {
  ExploreScreen: undefined;
};

export type SettingsTabParamList = {
  SettingsScreen: undefined;
};
