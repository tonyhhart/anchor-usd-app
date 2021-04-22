import * as React from 'react';
import { TextInput as DefaultTextInput } from 'react-native-paper';

import globalStyles from 'styles/globalStyles';

import { Text } from './Themed';

export default function TextInput(props: Props) {
  const { label, error, ...otherProps } = props;

  return (
    <>
      <Text>{label}</Text>
      <DefaultTextInput
        style={globalStyles.input}
        {...otherProps}
        theme={{ colors: { background: 'transparent' } }}
        error={!!error}
      />
      <Text style={globalStyles.inputError}> {`${error || ''} `}</Text>
    </>
  );
}

export type DefaultTextInputProps = React.ComponentProps<typeof DefaultTextInput>;
export type Props = Pick<
  DefaultTextInputProps,
  Exclude<keyof DefaultTextInputProps, 'error' | 'onSubmitEditing'>
> & {
  error?: string;
  // eslint-disable-next-line no-unused-vars
  onSubmitEditing?: (e?: React.FormEvent<HTMLFormElement>) => void;
};
