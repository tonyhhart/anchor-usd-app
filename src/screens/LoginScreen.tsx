import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, TextInput, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { StackScreenProps } from '@react-navigation/stack';
import Logo from 'components/Logo';
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
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      centerContent
      style={globalStyles.safeareaview}
      contentContainerStyle={styles.scroll}
    >
      <SafeAreaView>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Logo width={120} height={120} />
          </View>
          <Text style={styles.h1}>Log in</Text>
        </View>
        <Text style={styles.error}>
          {` `}
          {error}
        </Text>

        <TextInput
          mode="outlined"
          keyboardType="email-address"
          textContentType="emailAddress"
          onChangeText={onChangeEmail}
          label="Email address"
          placeholder="Email address"
          style={globalStyles.input}
          onSubmitEditing={onSubmit}
          autoCapitalize="none"
        />

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

        <Button mode="contained" disabled={loading} style={globalStyles.button} onPress={onSubmit}>
          Sign in
        </Button>
        <Text style={styles.copyright}>© 2021 </Text>
      </SafeAreaView>
    </KeyboardAwareScrollView>
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
    width: 120,
    height: 120,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: Metrics.base,
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
  copyright: { textAlign: 'center', marginBottom: Metrics.base * 5 },
});
