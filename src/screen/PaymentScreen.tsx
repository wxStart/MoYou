import * as React from 'react';
import {View, Text} from 'react-native';
import {useTheme} from 'react-native-paper';
import {ActivityIndicator, MD2Colors, Button} from 'react-native-paper';

import {useAppSelector, useAppDispatch} from '../hooks/store';

import {
  addOppNumAsyncThunk,
  addOppNumAsyncPromise,
} from '../store/features/voteSlice';

export default function PaymentScreen() {
  const theme = useTheme();
  const {oppNum, supNum} = useAppSelector(state => state.vote);
  const dispatch = useAppDispatch();
  return (
    <View style={{backgroundColor: theme.colors.primary, height: 300}}>
      <ActivityIndicator animating={true} color={MD2Colors.green100} />
      <Button
        icon="camera"
        mode="contained"
        onPress={() => console.log('Pressed')}>
        Press me
      </Button>
      <Text>oppNum:{oppNum}</Text>
      <Text>supNum:{supNum}</Text>

      <Button
        icon="camera"
        mode="contained"
        onPress={() => {
          dispatch(addOppNumAsyncThunk());
        }}>
        addOppNumAsyncPromise
      </Button>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => {
          dispatch(addOppNumAsyncPromise());
        }}>
        addOppNumAsyncPromise
      </Button>
    </View>
  );
}
