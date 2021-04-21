/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { useSelector } from 'react-redux';

import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from 'screens/LoginScreen';
import NotFoundScreen from 'screens/NotFoundScreen';
import { selectApiToken } from 'store';
import { PublicStackParamList, RootStackParamList } from 'types';

import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const RootStack = createStackNavigator<RootStackParamList>();
const PublicStack = createStackNavigator<PublicStackParamList>();

function RootNavigator() {
  const api_token = useSelector(selectApiToken);

  if (!api_token) {
    return (
      <PublicStack.Navigator screenOptions={{ headerShown: false }}>
        <PublicStack.Screen name="Login" component={LoginScreen} />
      </PublicStack.Navigator>
    );
  }

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Root" component={BottomTabNavigator} />
      <RootStack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </RootStack.Navigator>
  );
}
