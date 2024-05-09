import {View, StyleSheet, Text} from 'react-native';
import React, {useEffect, useState} from 'react';

import {ActivityIndicator, MD2Colors} from 'react-native-paper';

import {pxToDp} from '../../utils/styleHelper';
import {screenWidth, screenHeight} from '../../utils/styleHelper';

const LoadingToast = (props: any) => {
  const {
    text1,
    rootStyle,
    textSttyle = {},
    loadingColor = MD2Colors.white,
    isLoading = false,
  } = props;
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    function clearTimer(timer: NodeJS.Timeout | null) {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
    }
    let timer: NodeJS.Timeout | null = setTimeout(() => {
      setShow(true);
      clearTimer(timer);
    }, 200);
    return () => {
      clearTimer(timer);
    };
  }, []);

  return (
    <View style={[style.loadingRoot]}>
      <View style={[style.container, rootStyle, {opacity: show ? 1 : 0}]}>
        {isLoading && (
          <ActivityIndicator animating={true} size={60} color={loadingColor} />
        )}
        <Text style={[style.textSttyle, textSttyle]}>{text1}</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  loadingRoot: {
    width: screenWidth / 2,
    height: screenHeight / 2,
    position: 'absolute',
    top: (screenHeight - screenHeight / 2) / 2,
    left: (screenWidth - screenWidth / 2) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    padding: pxToDp(20),
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  textSttyle: {
    color: '#fff',
    fontSize: pxToDp(18),
  },
});

export default LoadingToast;
