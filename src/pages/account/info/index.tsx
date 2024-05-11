import {Text, View, StyleSheet} from 'react-native';
import React, {useMemo, useState} from 'react';

import {TextInput, HelperText} from 'react-native-paper';
import type {StackScreenProps} from '../../../env';
import WithAuth from '../../../components/hoc/WithAuth';
import {pxToDp} from '../../../utils/styleHelper';
import Man from '../../../asset/svg/man.svg';
import Woman from '../../../asset/svg/woman.svg';

enum Gender {
  'man',
  'woman',
}
const UserInfo = (props: StackScreenProps) => {
  const [userName, setUserName] = useState('');
  const [birthday, setBirthday] = useState<Date>();
  const [city, setCity] = useState('');

  const [gender, setGender] = useState<Gender>();
  const handleChangeName = (text: string) => {
    setUserName(text);
  };

  const nameIsEmpty = useMemo(() => !userName.length, [userName]);
  console.log('props: ', props);
  return (
    <View style={styles.root}>
      <Text style={styles.title}>完善个人信息</Text>

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
    </View>
  );
};
export default WithAuth<StackScreenProps>(UserInfo);

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
