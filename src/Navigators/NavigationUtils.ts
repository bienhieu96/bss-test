import { PageName } from '@/Configs';
import {
  CommonActions,
  createNavigationContainerRef,
  StackActions,
  ParamListBase,
} from '@react-navigation/native';

type NativeStackAnimationType =
  | 'default'
  | 'fade'
  | 'flip'
  | 'none'
  | 'slide_from_bottom'
  | 'slide_from_right'
  | 'slide_from_left';
  
type RootStackParamList = {
    HomeScreen: undefined,
    Products: undefined
  // Add other screen definitions as needed
};
type screenOptionsType = {
  headerShown: boolean;
  statusBarAnimation: 'slide' | 'none' | 'fade' | undefined;
  animation: NativeStackAnimationType | undefined;
  // Add other properties as needed
};
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const navigate = (name: string, params?: RootStackParamList[keyof RootStackParamList]) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};

export const navigatePush = (name: keyof RootStackParamList, params?: RootStackParamList[keyof RootStackParamList]) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(name, params));
  }
};

export const navigateAndReset = (routes: (keyof RootStackParamList)[], index = 0) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: routes.map((route) => ({ name: route })),
      }),
    );
  }
};

export const navigateAndSimpleReset = (name: keyof RootStackParamList, index = 0) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: [{ name }],
      }),
    );
  }
};

export function navigateReplace(name: keyof RootStackParamList, param: RootStackParamList[keyof RootStackParamList]) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      StackActions.replace(name, {
        param,
      }),
    );
  }
}

export const goBack = () => {
  navigationRef.goBack();
};

export const screenOptions : screenOptionsType = {
  headerShown: false, // default header is making the screen flicker on android
  statusBarAnimation: 'slide',
  animation: 'slide_from_right',
};
