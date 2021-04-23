/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { useSelector } from 'react-redux';

import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import Colors from 'constants/Colors';
import LoginScreen from 'screens/LoginScreen';
import NotFoundScreen from 'screens/NotFoundScreen';
import RegisterScreen from 'screens/RegisterScreen';
import ViewCoinScreen from 'screens/ViewCoinScreen';
import { selectApiToken } from 'store';
import { PublicStackParamList, RootStackParamList } from 'types';

import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

const headerStyle: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: Colors.light.tint,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  headerTintColor: Colors.white,
};

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
        <PublicStack.Screen name="Register" component={RegisterScreen} />
      </PublicStack.Navigator>
    );
  }

  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
          title: 'Explore',
        }}
      />
      <RootStack.Screen
        name="ViewCoin"
        component={ViewCoinScreen}
        options={{
          headerShown: true,
          title: '',
          ...headerStyle,
        }}
      />
      <RootStack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </RootStack.Navigator>
  );
}
