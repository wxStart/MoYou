import {Text, View, StyleSheet} from 'react-native';
import React, {useMemo, useState} from 'react';

import {TextInput, HelperText} from 'react-native-paper';
import type {StackScreenProps} from '../../../env';
import WithAuth from '../../../components/hoc/WithAuth';
import {pxToDp} from '../../../utils/styleHelper';
import Man from '../../../asset/svg/man.svg';
import Woman from '../../../asset/svg/woman.svg';
import {withTranslation} from 'react-i18next';

import DateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {t} from 'i18next';
import PopUp from '../../../components/pop/PopUp';

type Tran = typeof t;

enum Gender {
  'man',
  'woman',
}
const UserInfo = (
  props: StackScreenProps & {
    t: Tran;
  },
) => {
  const [userName, setUserName] = useState('');
  const [birthday, setBirthday] = useState(new Date(1598051730000));
  const [city, setCity] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [gender, setGender] = useState<Gender>();
  const handleChangeName = (text: string) => {
    setUserName(text);
  };

  const onChangeTime = (event: DateTimePickerEvent, date: Date | undefined) => {
    setBirthday(date as Date);
  };
  const nameIsEmpty = useMemo(() => !userName.length, [userName]);
  console.log('props: ', props);
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{props.t('common.title')}</Text>

      <View style={styles.genderBox}>
        {/* 性别 */}
        <View
          style={[styles.gender, gender === Gender.man && styles.genderActive]}
          onTouchEnd={() => {
            setGender(Gender.man);
          }}>
          <Man width={120} height={40} />
        </View>
        <View
          style={[
            styles.gender,
            gender === Gender.woman && styles.genderActive,
          ]}
          onTouchEnd={() => {
            setGender(Gender.woman);
          }}>
          <Woman width={120} height={40} />
        </View>
      </View>

      <View style={styles.userName}>
        <TextInput
          value={userName}
          placeholder="昵称设置"
          onChangeText={handleChangeName}
          maxLength={13}
          textColor="red"
          underlineColor="yellow"
          activeUnderlineColor="green"
          contentStyle={{backgroundColor: '#fefefe'}}
        />
        <HelperText type="error" visible={nameIsEmpty}>
          请填写昵称
        </HelperText>
      </View>

      <View
        style={styles.userName}
        onTouchEnd={() => {
          setShowTimePicker(true);
        }}>
        <TextInput
          value={birthday?.toDateString()}
          placeholder="生日设置"
          textColor="red"
          underlineColor="yellow"
          activeUnderlineColor="green"
          disabled
          contentStyle={{backgroundColor: '#fefefe'}}
        />
        <HelperText type="error" visible={nameIsEmpty}>
          请选择出生日期
        </HelperText>
      </View>

      <PopUp
        visible={showTimePicker}
        onClose={() => {
          setShowTimePicker(false);
        }}>
        <DateTimePicker
          value={birthday as Date}
          mode="date"
          display="inline"
          onChange={onChangeTime}
        />
      </PopUp>
    </View>
  );
};
export default WithAuth<StackScreenProps>(withTranslation()(UserInfo));

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    flex: 1,
    padding: pxToDp(20),
  },
  title: {
    marginTop: pxToDp(60),
    fontSize: pxToDp(25),
    fontWeight: 'bold',
    marginBottom: pxToDp(20),
    color: '#353535',
  },
  userName: {
    marginBottom: pxToDp(16),
  },
  genderBox: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  gender: {
    width: pxToDp(70),
    height: pxToDp(70),
    padding: pxToDp(10),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: pxToDp(10),
    borderWidth: pxToDp(2),
    borderColor: '#ddd',
    borderRadius: pxToDp(40),
    backgroundColor: '#f9f9f9',
  },
  genderActive: {
    backgroundColor: '#f3D456',
  },
});
