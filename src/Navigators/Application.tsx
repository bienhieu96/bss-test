import { PageName } from '@/Configs';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screenOptions } from './NavigationUtils';
import {HomeScreen} from '@/Screens';
import {Products} from '@/Screens';
import {RootStackParamList} from 'type/navigators'

const Stack = createNativeStackNavigator<RootStackParamList>();

const Application = () => {
  const navigationRef = useNavigationContainerRef();
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={PageName.HomeScreen} // Using the imported PageName object
        screenOptions={screenOptions}
      >
        <Stack.Screen name={PageName.HomeScreen} component={HomeScreen} />
        <Stack.Screen name={PageName.Products} component={Products} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Application;
