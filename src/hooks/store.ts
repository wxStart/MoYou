import {useDispatch, useSelector} from 'react-redux';
// import {Dispatch} from 'redux';

import type {AppDispatch, RootState} from '../store/index';

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch: any = useDispatch.withTypes<AppDispatch>();
