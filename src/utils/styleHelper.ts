/**
 * px--->dp
 *
 *  设计稿的宽度 / 元素的宽度 = 手机屏幕 / 手机中元素的的宽度
 *  手机中元素的的宽度 =  手机屏幕 * 元素的宽度 / 设计稿的宽度
 *
 */

import {Dimensions} from 'react-native';

/**
 * 屏幕宽度
 */
export const screenWidth: number = Dimensions.get('window').width;

/**
 * 屏幕高度度
 */
export const screenHeight: number = Dimensions.get('window').height;

/**
 *
 * @param elePx 元素像素
 * @returns number  元素转换的dp
 */
export const pxToDp = (elePx: number): number => (screenWidth * elePx) / 375;
