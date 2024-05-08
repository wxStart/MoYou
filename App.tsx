/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Provider as StoreProvider} from 'react-redux';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';

import store from './src/store/index';
// import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import AppStack from './src/stack';

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
        <AppStack />
      </PaperProvider>
    </StoreProvider>
  );
}

export default App;
