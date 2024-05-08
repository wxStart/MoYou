/**
 *
 *
 * 每个切片包括ACTION-CREATOR & REDUCER
 */
import {createSlice} from '@reduxjs/toolkit';

export interface VoteSliceState {
  supNum: number;
  oppNum: number;
}

const initial: VoteSliceState = {
  supNum: 10,
  oppNum: 6,
};

export const voteSlice = createSlice({
  // 切片名字
  name: 'vote',
  // 设置切面对应reducer的初始状态
  initialState: {...initial},
  // 编写不同 的业务逻辑 对状态更改
  reducers: {
    setSupNum(state, action) {
      // state： redux 当前切片中的公共状态信信息 (基于 immer库管理，不需要自己克隆)
      // action: 派发的行为对象，我们无需考虑行为标识的问题，传递其他的信息，都是以action.payload传递进来的值
      state.supNum = action.payload;
    },

    addSupNum(state, {payload = 1}) {
      state.supNum = state.supNum + payload;
    },
    addOppNum(state, {payload = 1}) {
      state.oppNum = state.oppNum + payload;
    },
  },
  selectors: {
    selectSupNum: vote => vote.supNum,
    selectOppNum: vote => vote.oppNum,
  },
});

console.log('voteSlice: ', voteSlice);

// 切片 获取 actionCreator
export const {setSupNum, addSupNum, addOppNum} = voteSlice.actions;
console.log(addSupNum(10)); // {type:'vote/addSupNum',payload：10}

const delay = (time = 1000) => {
  return new Promise<number>(resolve => {
    setTimeout(() => {
      resolve(10);
    }, time);
  });
};

// 实现异步派发
// 基于redux-thunk
export const addOppNumAsyncThunk = (timer = 1000) => {
  return async (dispatch: (arg0: {payload: any; type: string}) => void) => {
    let result = 0;
    try {
      result = await delay(timer);
      // eslint-disable-next-line no-empty
    } catch (error) {}
    dispatch(addOppNum(result));
  };
};

export const addOppNumAsyncPromise = async (timer = 2000) => {
  let result = 0;
  try {
    result = await delay(timer);
    // eslint-disable-next-line no-empty
  } catch (error) {}
  return addOppNum(result);
};
export default voteSlice.reducer;
