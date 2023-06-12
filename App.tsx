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

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      {/* <Provider store={store}> */}
      <NativeBaseProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </NativeBaseProvider>
      {/* </Provider> */}
    </>
  );
};
export default App;
