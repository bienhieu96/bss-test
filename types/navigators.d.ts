import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParams = {
    HomeScreen: undefined,
    Products: undefined
  };
export type RootStackParamList = {
    [P in Exclude<keyof typeof SCREENS, keyof RootStackParams>]: undefined;
  } & RootStackParams;
export type Props =
    StackScreenProps<RootStackParams>;