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
import { registerAsync, selectAuth } from 'store';
import globalStyles from 'styles/globalStyles';
import * as Yup from 'yup';

export default function RegisterScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { loading, error } = useSelector(selectAuth);

  function handleSubmitAsync(values: RegisterFormValues) {
    Keyboard.dismiss();

    dispatch(registerAsync(values));
  }

  function renderLoginForm(props: FormikProps<RegisterFormValues>) {
    const { errors, setFieldValue, handleSubmit } = props;

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
          error={errors.password}
          autoCompleteType="password"
          autoCapitalize="none"
          onSubmitEditing={handleSubmit}
        />

        <TextInput
          textContentType="password"
          secureTextEntry
          label="Confirm Password"
          onChangeText={(value: string): void => setFieldValue('password_confirmation', value)}
          placeholder="confirm your password"
          style={globalStyles.input}
          error={errors.password_confirmation}
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
          Sign in
        </Button>
      </>
    );
  }

  function navigateToLogin() {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
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
          <Text style={styles.h1}>Create account</Text>
        </View>
        <Text style={styles.error}>
          {` `}
          {error}
        </Text>

        <Formik
          initialValues={{
            email: '',
            password: '',
            password_confirmation: '',
          }}
          validationSchema={validations}
          validateOnChange={false}
          onSubmit={handleSubmitAsync}
        >
          {renderLoginForm}
        </Formik>

        <Button onPress={navigateToLogin} style={styles.register} mode="text" uppercase={false}>
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
  email: Yup.string().email().required('Required'),
  password: Yup.string().required('Required'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Password must match')
    .required('Required'),
});

type RegisterFormValues = {
  email: string;
  password: string;
  password_confirmation: string;
};

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
  register: {
    marginTop: Metrics.base,
    marginBottom: Metrics.base,
  },
});
