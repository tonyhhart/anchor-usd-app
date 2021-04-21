import * as React from 'react';
import { Image, StyleSheet, View, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, TextInput, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { StackScreenProps } from '@react-navigation/stack';
import Logo from 'components/Logo';
import Layout from 'constants/Layout';
import Metrics from 'constants/Metrics';
import { loginAsync, selectAuth } from 'store';
import globalStyles from 'styles/globalStyles';
import { PublicStackParamList } from 'types';

export default function LoginScreen({
  navigation,
}: StackScreenProps<PublicStackParamList, 'Login'>) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(selectAuth);

  const [formValues, setFormValues] = React.useState({
    email: '',
    password: '',
  });

  function onChange(name: string, value: string) {
    setFormValues((values) => ({
      ...values,
      [name]: value,
    }));
  }

  function onChangeEmail(value: string) {
    onChange('email', value);
  }

  function onChangePassword(value: string) {
    onChange('password', value);
  }

  function onSubmit() {
    if (loading) return;

    dispatch(loginAsync(formValues));
  }

  return (
    <SafeAreaView style={globalStyles.safeareaview}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        centerContent
        style={globalStyles.safeareaview}
        contentContainerStyle={styles.scroll}
      >
        <View>
          <View style={styles.logoContainer}>
            <Logo width={120} height={120} />
            <Text style={styles.h1}>Log in</Text>
          </View>
          <Text style={styles.error}>
            {` `}
            {error}
          </Text>
          <View>
            <TextInput
              mode="outlined"
              keyboardType="email-address"
              textContentType="emailAddress"
              onChangeText={onChangeEmail}
              label="Email address"
              placeholder="Email address"
              autoCapitalize="none"
            />
          </View>
          <View>
            <TextInput
              mode="outlined"
              textContentType="password"
              secureTextEntry
              label="Password"
              onChangeText={onChangePassword}
              placeholder="Password"
              style={globalStyles.input}
              onSubmitEditing={onSubmit}
            />
          </View>
          <Button
            mode="contained"
            disabled={loading}
            style={globalStyles.button}
            onPress={onSubmit}
          >
            Sign in
          </Button>
          <Text>© 2021 </Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: Metrics.base,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: Metrics.base * 2,
  },
  h1: {
    fontWeight: '600',
    textAlign: 'center',
    fontSize: Metrics.h1,
  },
  error: {
    textAlign: 'center',
    color: '#AA0000',
    fontSize: 16,
    marginBottom: Metrics.base,
  },
});
