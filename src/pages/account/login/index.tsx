import {View, Image, StatusBar, StyleSheet, Text, Platform} from 'react-native';
import React, {useState} from 'react';

import {HelperText, TextInput} from 'react-native-paper';

import type {StackScreenProps} from '../../../env';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import {pxToDp} from '../../../utils/styleHelper';
import {validatePhone} from '../../../utils/validator';

import Toast from '../../../components/toast/Toast';
import LinearGradientButton from '../../../components/button/LinearGradientButton';

import {reqLogin, getPhoneCode} from '../../../api/user/index';
import type {phoneCodeForm, loginForm} from '../../../api/user/type';

const Login = (props: StackScreenProps) => {
  const [phone, setPhone] = useState<string>('');
  const [isCountdown, setIsCountdown] = useState(false);
  const [isConfirmationCode, setIsConfirmationCode] = useState(false);

  const [btnText, setBtnText] = useState<string>('获取验证码');

  const [code, setCode] = useState('');
  const ref = useBlurOnFulfill({value: code, cellCount: 6});

  const [codeProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  const onChangeText = (str: string) => setPhone(str);

  const hasErrors = () => {
    return !validatePhone(phone);
  };

  // 获取验证码
  const getLoginCode = async () => {
    props.navigation.navigate('userInfo', {isNew: true});

    return;
    if (hasErrors()) {
      Toast.info('请输入正确的手机号');
      return;
    }
    if (isCountdown) {
      return;
    }
    const params: phoneCodeForm = {
      phoneNum: phone,
    };
    Toast.loading('获取验证码中');

    try {
      const result = await getPhoneCode(params);
      if (result.code === 1) {
        // 获取验证码成功
        startCountdown();
      }
    } catch (error) {}
    Toast.hide();
  };

  // 登录接口
  const handlerLogin = async () => {
    if (code.length !== 6) {
      Toast.info('请输入6位验证码');
    }
    Toast.loading('登录中');
    const params: loginForm = {
      phoneNum: phone,
      codeNum: code,
    };
    try {
      const result = await reqLogin(params);
      console.log('登录结果result: ', result);
      if (result.code === 1) {
        console.log('result.data: ', result.data);
        if (result.data.isNew) {
          // 新用户跳转

          props.navigation.navigate('userInfo', {isNew: true});
        } else {
          // 老用户跳转页面
          // props.navigation.navigate('NewUserInfo');
        }
      }
    } catch (error) {}
    Toast.hide();
  };

  const startCountdown = () => {
    setIsConfirmationCode(true);
    setIsCountdown(true);

    let num = 60;
    setBtnText(`重新获取（${num} s）`);
    let timer: NodeJS.Timeout | null = setInterval(() => {
      if (num === 0) {
        clearInterval(timer!);
        timer = null;
        setBtnText('获取验证码');
        setIsCountdown(false);
      } else {
        setBtnText(`重新获取（ ${--num}s ）`);
      }
    }, 1000);
  };

  const onChangeTextCodeField = (text: string) => {
    setCode(text);
    if (text.length == 6) {
      console.log('输入结束了');
    }
  };

  const renderConfirmationCode = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.phoneTitle}>输入6位验证码</Text>
        <Text>已发到+86 {phone}</Text>
        <View>
          <CodeField
            ref={ref}
            {...codeProps}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={code}
            onChangeText={onChangeTextCodeField}
            cellCount={6}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            autoComplete={
              Platform.select({
                android: 'sms-otp',
                default: 'one-time-code',
              }) as 'sms-otp'
            }
            testID="my-code-input"
            renderCell={({index, symbol, isFocused}) => (
              <View
                // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                onLayout={getCellOnLayoutHandler(index)}
                key={index}
                style={[styles.cellRoot, isFocused && styles.focusCell]}>
                <Text style={styles.cellText}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
            onBlur={handlerLogin}
            onSubmitEditing={handlerLogin}
          />
        </View>
      </View>
    );
  };

  const renderGetPhoneCode = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.phoneTitle}>手机账号登录注册</Text>
        <TextInput
          label="手机号"
          value={phone}
          placeholder="请输入手机号"
          onChangeText={onChangeText}
          maxLength={13}
          keyboardType="phone-pad"
          textColor="red"
          underlineColor="yellow"
          activeUnderlineColor="green"
          left={
            <TextInput.Icon
              style={styles.inputLeftIcon}
              icon="phone"
              size={pxToDp(18)}
              color={'#666'}
            />
          }
          onSubmitEditing={getLoginCode}
        />
        <HelperText type="error" visible={hasErrors()}>
          请输入正确的手机号
        </HelperText>
      </View>
    );
  };

  return (
    <View>
      {/*  改变背景颜色  同时设置 translucent 属性让 图片往上提 */}
      <StatusBar backgroundColor="transparent" translucent />
      <Image
        style={styles.bgImag}
        source={require('../../../asset/images/login.jpg')}
      />
      {isConfirmationCode ? renderConfirmationCode() : renderGetPhoneCode()}
      <View style={styles.getCode}>
        <LinearGradientButton style={styles.btn} onPress={getLoginCode}>
          {btnText}
        </LinearGradientButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  getCode: {
    width: '75%',
    height: pxToDp(40),
    alignSelf: 'center',
  },
  btn: {
    borderRadius: pxToDp(20),
  },

  codeFieldRoot: {marginTop: pxToDp(20)},
  cellRoot: {
    flex: 1,
    height: pxToDp(50),
    margin: pxToDp(5),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: pxToDp(1),
  },
  cellText: {
    color: '#000',
    fontSize: pxToDp(36),
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: '#9b63cd',
    borderBottomWidth: pxToDp(2),
  },
});

export default Login;
