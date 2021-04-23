/* eslint-disable react/prop-types */
import * as React from 'react';
import { View } from 'react-native';
import { EdgeInsets, SafeAreaInsetsContext } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from 'constants/Colors';
import useColorScheme from 'hooks/useColorScheme';
import ExploreScreen from 'screens/ExploreScreen';
import MoveScreen from 'screens/MoveScreen';
import PortifolioScreen from 'screens/PortifolioScreen';
import SettingsScreen from 'screens/SettingsScreen';
import { headerStyle, tabOptions } from 'styles/globalStyles';
import {
  BottomTabParamList,
  ExploreTabParamList,
  MoveTabParamList,
  PortifolioTabParamList,
  SettingsTabParamList,
} from 'types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  function renderTabs(insets: EdgeInsets | null) {
    return (
      <>
        <BottomTab.Navigator
          initialRouteName="ExploreTab"
          tabBarOptions={{ ...tabOptions, activeTintColor: Colors[colorScheme].tint }}
        >
          <BottomTab.Screen
            name="ExploreTab"
            component={ExploreTab}
            options={{
              tabBarIcon: (props) => <TabBarIcon {...props} name="compass-sharp" />,
            }}
          />
          <BottomTab.Screen
            name="PortifolioTab"
            component={PortifolioTab}
            options={{
              tabBarIcon: (props) => <TabBarIcon {...props} name="wallet-sharp" />,
            }}
          />
          <BottomTab.Screen
            name="MoveTab"
            component={MoveTab}
            options={{
              tabBarIcon: (props) => <TabBarIcon {...props} name="people-sharp" />,
            }}
          />
          <BottomTab.Screen
            name="SettingsTab"
            component={SettingsTab}
            options={{
              tabBarIcon: (props) => <TabBarIcon {...props} name="settings-sharp" />,
            }}
          />
        </BottomTab.Navigator>
        <View style={{ height: insets?.bottom }} backgroundColor={Colors[colorScheme].background} />
      </>
    );
  }

  return <SafeAreaInsetsContext.Consumer>{renderTabs}</SafeAreaInsetsContext.Consumer>;
}

function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const ExploreTabStack = createStackNavigator<ExploreTabParamList>();
const SettingsTabStack = createStackNavigator<SettingsTabParamList>();
const PortifolioTabStack = createStackNavigator<PortifolioTabParamList>();
const MoveTabStack = createStackNavigator<MoveTabParamList>();

function ExploreTab() {
  return (
    <ExploreTabStack.Navigator>
      <ExploreTabStack.Screen
        name="ExploreScreen"
        component={ExploreScreen}
        options={{ headerTitle: 'Explore', ...headerStyle }}
      />
    </ExploreTabStack.Navigator>
  );
}

function SettingsTab() {
  return (
    <SettingsTabStack.Navigator>
      <SettingsTabStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerTitle: 'Settings', ...headerStyle }}
      />
    </SettingsTabStack.Navigator>
  );
}
function PortifolioTab() {
  return (
    <PortifolioTabStack.Navigator>
      <PortifolioTabStack.Screen
        name="PortifolioScreen"
        component={PortifolioScreen}
        options={{ headerTitle: 'Portfolio', ...headerStyle }}
      />
    </PortifolioTabStack.Navigator>
  );
}

function MoveTab() {
  return (
    <MoveTabStack.Navigator>
      <MoveTabStack.Screen
        name="MoveScreen"
        component={MoveScreen}
        options={{ headerTitle: 'Move', ...headerStyle }}
      />
    </MoveTabStack.Navigator>
  );
}
