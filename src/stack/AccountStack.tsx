import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../pages/account/login';

import Toast from '../components/toast/Toast';

const Stack = createNativeStackNavigator();

function AccountStack() {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
      <Toast />
    </>
  );
}

export default AccountStack;
