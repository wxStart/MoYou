import {View, Image, StatusBar, StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';

import {HelperText, TextInput} from 'react-native-paper';
import {pxToDp} from '../../../utils/styleHelper';
import {validatePhone} from '../../../utils/validator';

import {Drawer} from 'react-native-drawer-layout';
import Toast from '../../../components/toast/Toast';

const Login = () => {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = useState<string>('');

  const onChangeText = (str: string) => setText(str);

  const hasErrors = () => {
    return !validatePhone(text);
  };
  const showToast = () => {
    Toast.loading('网络请求中');
    setTimeout(() => {
      Toast.hide();
    }, 5000);
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
