/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import store from '@/Store';
import Application from './Navigators/Application';
import React from 'react';
import {Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <SafeAreaProvider>
          <View style={{flex: 1}}>
            <Application />
          </View>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
