import { useDispatch } from 'react-redux';

import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { StoreState } from 'store';

export type ReduxDispatch = ThunkDispatch<StoreState, any, AnyAction>;

export default function useReduxDispatch(): ReduxDispatch {
  return useDispatch<ReduxDispatch>();
}
