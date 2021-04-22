import * as React from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import Logo from 'components/Logo';
import TextInput from 'components/TextInput';
import Metrics from 'constants/Metrics';
import { Formik, FormikProps } from 'formik';
import { loginAsync, selectAuth } from 'store';
import globalStyles from 'styles/globalStyles';
import * as Yup from 'yup';

export default function LoginScreen() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(selectAuth);

  function handleSubmitAsync(values: LoginFormValues) {
    Keyboard.dismiss();

    dispatch(loginAsync(values));
  }

  function renderLoginForm(props: FormikProps<LoginFormValues>) {
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

        <Text style={styles.copyright}>© 2021 </Text>
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
