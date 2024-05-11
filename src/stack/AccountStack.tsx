import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../pages/account/login';
import UserInfo from '../pages/account/info';

import Toast from '../components/toast/Toast';

const Stack = createNativeStackNavigator();

function AccountStack() {
  return (
    <>
      <Stack.Navigator initialRouteName="userInfo">
        <Stack.Screen
          name="login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="userInfo"
          component={UserInfo}
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
