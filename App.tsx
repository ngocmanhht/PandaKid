/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import AppNavigator from './src/routers/navigators/AppNavigator';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'mobx-react';
import stores from './src/stores';
import LoadingSpinner from './src/components/loading-spinner';
import CameraOption from './src/components/camera-option';

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <Provider {...stores}>
        <NativeBaseProvider>
          <NavigationContainer>
            <AppNavigator />
            <LoadingSpinner />
            <CameraOption />
          </NavigationContainer>
        </NativeBaseProvider>
      </Provider>
    </>
  );
};
export default App;
