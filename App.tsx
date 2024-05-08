/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {Provider as StoreProvider} from 'react-redux';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';

import PaymentScreen from './src/screen/PaymentScreen';
import store from './src/store/index';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

function App(): React.JSX.Element {
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <SafeAreaView>
          <Text>
            APPadssssdsaFDDSAFDASFGDSAHJFGDHJKASGFDJKDSsssssssssssssssssssss
          </Text>
          <PaymentScreen />
        </SafeAreaView>
      </PaperProvider>
    </StoreProvider>
  );
}

export default App;
