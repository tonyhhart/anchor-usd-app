/* eslint-disable react/prop-types */
import * as React from 'react';

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from 'constants/Colors';
import useColorScheme from 'hooks/useColorScheme';
import ExploreScreen from 'screens/ExploreScreen';
import PortifolioScreen from 'screens/PortifolioScreen';
import SettingsScreen from 'screens/SettingsScreen';
import { headerStyle } from 'styles/globalStyles';
import {
  BottomTabParamList,
  ExploreTabParamList,
  PortifolioTabParamList,
  SettingsTabParamList,
} from 'types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="ExploreTab"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint, showLabel: false }}
    >
      <BottomTab.Screen
        name="ExploreTab"
        component={ExploreTab}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="compass-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="PortifolioTab"
        component={PortifolioTab}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="wallet-sharp" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="SettingsTab"
        component={SettingsTab}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const ExploreTabStack = createStackNavigator<ExploreTabParamList>();
const SettingsTabStack = createStackNavigator<SettingsTabParamList>();
const PortifolioTabStack = createStackNavigator<PortifolioTabParamList>();

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
