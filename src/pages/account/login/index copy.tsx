import {View, Image, StatusBar, StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';

import {HelperText, TextInput} from 'react-native-paper';
import {pxToDp} from '../../../utils/styleHelper';
import {validatePhone} from '../../../utils/validator';

import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import {Drawer} from 'react-native-drawer-layout';
/*
  1. Create the config
*/
const toastConfig = {
  /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{borderLeftColor: 'pink'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
      }}
    />
  ),
  /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
  /*
      Or create a completely new type - `tomatoToast`,
      building the layout from scratch.
  
      I can consume any custom `props` I want.
      They will be passed when calling the `show` method (see below)
    */
  tomatoToast: ({text1, props}: any) => (
    <View style={{height: 60, width: '90%', backgroundColor: 'tomato'}}>
      <Text>{text1}哈哈哈</Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
};

const Login = () => {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = useState<string>('');

  const onChangeText = (str: string) => setText(str);

  const hasErrors = () => {
    return !validatePhone(text);
  };
  const showToast = () => {
    Toast.show({
      type: 'tomatoToast',
      // And I can pass any custom props I want
      text1: '12313',
      props: {uuid: 'bba1a7d0-6ab2-4a0a-a76e-ebbe05ae6d70'},
    });
    setTimeout(() => {
      Toast.hide();
    }, 1000);
  };
  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={() => {
        return <Text>Drawer content</Text>;
      }}>
      <View>
        {/*  改变背景颜色  同时设置 translucent 属性让 图片往上提 */}
        <StatusBar backgroundColor="transparent" translucent />
        <Image
          style={style.bgImag}
          source={require('../../../asset/images/login.png')}
        />
        <Toast config={toastConfig} />
        <View style={style.container}>
          <Text
            onPress={() => {
              setOpen(true);
            }}
            style={style.phoneTitle}>
            手机账号登录注册
          </Text>
          <TextInput
            label="手机号"
            value={text}
            placeholder="请输入手机号"
            onChangeText={onChangeText}
            maxLength={13}
            keyboardType="phone-pad"
            textColor="red"
            underlineColor="yellow"
            activeUnderlineColor="green"
            left={
              <TextInput.Icon
                style={style.inputLeftIcon}
                icon="phone"
                size={pxToDp(18)}
                color={'#666'}
              />
            }
            right={<TextInput.Icon icon="eye" />}
            onSubmitEditing={() => {
              showToast();
            }}
          />
          <HelperText type="error" visible={hasErrors()}>
            请输入正确的手机号
          </HelperText>
        </View>
      </View>
    </Drawer>
  );
};

const style = StyleSheet.create({
  bgImag: {
    width: '100%',
    height: pxToDp(200),
  },
  container: {
    padding: pxToDp(12),
  },
  phoneTitle: {
    fontSize: pxToDp(25),
    fontWeight: 'bold',
    marginBottom: pxToDp(20),
  },
  inputLeftIcon: {
    position: 'relative',
    top: pxToDp(2),
  },
});

export default Login;
