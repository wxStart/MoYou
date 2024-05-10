import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type StackScreenProps = NativeStackScreenProps<
  Record<string, object | undefined>,
  string,
  string
>;
