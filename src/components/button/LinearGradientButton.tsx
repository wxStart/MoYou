//import liraries
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type IProps = PropsWithChildren<{
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}>;

function LinearGradientButton(props: IProps) {
  return (
    <TouchableOpacity
      style={[styles.root, props.style]}
      disabled={props.disabled}
      onPress={props.onPress}>
      <LinearGradient
        colors={['#9b63cd', '#C0708C']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.linearGradient}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

// define your styles
const styles = StyleSheet.create({
  root: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    position: 'relative',
    top: -2,
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});

export default LinearGradientButton;
