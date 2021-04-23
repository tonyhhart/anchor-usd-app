import * as React from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { CommonActions, useNavigation } from '@react-navigation/core';
import Logo from 'components/Logo';
import TextInput from 'components/TextInput';
import { Text } from 'components/Themed';
import Metrics from 'constants/Metrics';
import { Formik, FormikProps } from 'formik';
import { loginAsync, selectAuth } from 'store';
import globalStyles from 'styles/globalStyles';
import * as Yup from 'yup';

export default function LoginScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { loading, error } = useSelector(selectAuth);

  function handleSubmitAsync(values: LoginFormValues) {
    Keyboard.dismiss();

    dispatch(loginAsync(values));
  }

  function renderLoginForm(props: FormikProps<LoginFormValues>) {
    const { values, errors, setFieldValue, handleSubmit } = props;

    return (
      <>
        <TextInput
          keyboardType="email-address"
          textContentType="emailAddress"
          onChangeText={(value: string): void => setFieldValue('email', value)}
          label="Email address"
          placeholder="enter email address"
          style={globalStyles.input}
          onSubmitEditing={handleSubmit}
          autoCapitalize="none"
          value={values.email}
          error={errors.email}
          autoCompleteType="email"
        />

        <TextInput
          textContentType="password"
          secureTextEntry
          label="Password"
          onChangeText={(value: string): void => setFieldValue('password', value)}
          placeholder="enter your password"
          style={globalStyles.input}
          value={values.password}
          error={errors.password}
          autoCompleteType="password"
          autoCapitalize="none"
          onSubmitEditing={handleSubmit}
          returnKeyType="send"
        />

        <Button
          mode="contained"
          disabled={loading}
          style={globalStyles.button}
          onPress={handleSubmit}
        >
          Log in
        </Button>
      </>
    );
  }

  function navigateToRegister() {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Register' }],
      })
    );
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

        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validations}
          validateOnChange={false}
          onSubmit={handleSubmitAsync}
        >
          {renderLoginForm}
        </Formik>

        <Button onPress={navigateToRegister} style={styles.register} mode="text" uppercase={false}>
          <Text>
            Already have an account? <Text style={globalStyles.tint}>Login</Text>
          </Text>
        </Button>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

/**
 * Validações do formulário
 */
const validations = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

type LoginFormValues = {
  email: string;
  password: string;
};

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: Metrics.base,
    justifyContent: 'center',
    flex: 1,
  },
  logoContainer: {
    marginTop: Metrics.base,
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
  register: {
    marginTop: Metrics.base,
    marginBottom: Metrics.base,
  },
});
