import * as React from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {ActivityIndicator, MD2Colors, Button} from 'react-native-paper';

export default function PaymentScreen() {
  const theme = useTheme();

  return (
    <View style={{backgroundColor: theme.colors.primary, height: 300}}>
      <ActivityIndicator animating={true} color={MD2Colors.green100} />
      <Button
        icon="camera"
        mode="contained"
        onPress={() => console.log('Pressed')}>
        Press me
      </Button>
    </View>
  );
}
