import React from 'react';

import Toast from 'react-native-toast-message';
import type {ToastOptions} from 'react-native-toast-message';

import LoadingToast from './Loading';

const toastConfig = {
  info: (props: any) => <LoadingToast key={Date.now()} {...props} />,
  loading: (props: any) => (
    <LoadingToast key={Date.now()} {...props} isLoading />
  ),
};

const MyToast = () => {
  return <Toast config={toastConfig} />;
};

MyToast.success = function (message: string, options?: ToastOptions) {
  Toast.show({
    type: 'success',
    text1: message,
    visibilityTime: 4000,
    ...options,
  });
};

MyToast.error = function (message: string, options?: ToastOptions) {
  Toast.show({
    type: 'error',
    text1: message,
    visibilityTime: 4000,
    ...options,
  });
};

MyToast.loading = function (message: string, options?: ToastOptions) {
  Toast.show({
    type: 'loading',
    text1: message,
    autoHide: false,
    topOffset: 0,
    ...options,
  });
};
MyToast.hide = function () {
  Toast.hide();
};

export default MyToast;
