import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AccountStack from './AccountStack';

function AppStack() {
  return (
    <NavigationContainer>
      <AccountStack />
    </NavigationContainer>
  );
}

export default AppStack;
