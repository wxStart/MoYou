import React from 'react';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {pxToDp} from '../../utils/styleHelper';

import type {PropsWithChildren} from 'react';

type Ipops = PropsWithChildren<{
  visible: boolean;
  onClose: () => void;
}>;

export default (props: Ipops) => {
  const {visible, onClose, children} = props;

  return (
    <Modal
      transparent
      visible={visible}
      animationType={'fade'}
      onRequestClose={() => onClose()}>
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={() => onClose()}
      />
      <View style={styles.content}>{children}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  content: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: '#ffffff',
    zIndex: 1,
    padding: pxToDp(10),
    borderTopLeftRadius: pxToDp(10),
    borderTopRightRadius: pxToDp(10),
  },
});
