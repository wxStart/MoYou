import {Text, View} from 'react-native';
import React from 'react';
import type {StackScreenProps} from '../../../env';
import WithAuth from '../../../components/hoc/WithAuth';

const UserInfo = (props: StackScreenProps) => {
  console.log('props: ', props);
  return (
    <View>
      <Text>UserInfo</Text>
    </View>
  );
};
export default WithAuth(UserInfo);

// const styles = StyleSheet.create({});
