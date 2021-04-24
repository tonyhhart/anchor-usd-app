import { AnyAction, createSlice, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import api, { getErrorMessage } from 'services/api-service';

import { StoreState, StoreDispatch, AppThunk } from '.';

export const coinsSlice = createSlice<CoinsState, CoinsReducers>({
  name: 'coins',
  initialState: {
    data: [],
    loading: false,
    success: false,
    error: undefined,
  },
  reducers: {
    list_coins: (state) => {
      state.loading = true;
      state.success = false;
      state.error = undefined;
    },
    list_coins_success: (state, action) => {
      state.loading = false;
      state.success = true;
      state.data = action.payload;
    },
    list_coins_error: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    get_coin: (state) => {
      state.loading = true;
      state.success = false;
      state.error = undefined;
    },
    get_coin_success: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    get_coin_error: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
  },
});

export const {
  list_coins,
  list_coins_success,
  list_coins_error,
  get_coin,
  get_coin_success,
  get_coin_error,
} = coinsSlice.actions;

export const listCoinsAsync = (
  api_token: string
): ThunkAction<Promise<Coin[]>, any, any, AnyAction> => (dispatch) => {
  dispatch(list_coins());

  return new Promise((resolve, reject) => {
    api(api_token)
      .get('coins')
      .then(({ data }: AxiosResponse<{ data: Coin[] }>) => {
        dispatch(list_coins_success(data.data));
        resolve(data.data);
      })
      .catch((error) => {
        dispatch(list_coins_error(getErrorMessage(error)));
        reject(getErrorMessage(error));
      });
  });
};

// export type ThunkAction<
//   R, // Return type of the thunk function
//   S, // state type used by getState
//   E, // any "extra argument" injected into the thunk
//   A extends Action // known types of actions that can be dispatched
// > = (dispatch: ThunkDispatch<S, E, A>, getState: () => S, extraArgument: E) => R;

export const getCoinAsync = (
  api_token: string,
  coin: Coin,
  period: string
): ThunkAction<Promise<Coin>, any, any, AnyAction> => (dispatch) => {
  dispatch(get_coin());
  return new Promise((resolve, reject) => {
    api(api_token)
      .get(`coins/${coin.id}`, { params: { period } })
      .then(({ data }: AxiosResponse<{ data: Coin }>) => {
        dispatch(get_coin_success(data.data));
        resolve(data.data);
      })
      .catch((error) => {
        dispatch(get_coin_error(getErrorMessage(error)));
        reject(getErrorMessage(error));
      });
  });
};

export const selectCoinState = (state: StoreState) => state.coins;

export default coinsSlice.reducer;

export type CoinsState = {
  data: Coin[];
  loading: boolean;
  success: boolean;
  error?: string;
};

export type CoinsReducers = {
  list_coins: (state: CoinsState) => void;
  list_coins_success: (state: CoinsState, params: { payload: Coin[] }) => void;
  list_coins_error: (state: CoinsState, params: { payload: string }) => void;
  get_coin: (state: CoinsState) => void;
  get_coin_success: (state: CoinsState, params: { payload: Coin }) => void;
  get_coin_error: (state: CoinsState, params: { payload: string }) => void;
};

export type CoinHistory = {
  time: number;
  high: number;
  low: number;
  open: number;
  volumefrom: number;
  volumeto: number;
  close: number;
  conversionType: string;
  conversionSymbol: string;
};

export type Coin = {
  id: number;
  name: string;
  coinname: string;
  fullname: string;
  description: string;
  symbol: string;
  image: string;
  image_url: string;
  usd_price: number;
  usd_change_pct_day: number;
  usd_change_pct_24_hours: number;
  usd_change_pct_hour: number;
  historic: CoinHistory[];
  created_at: string;
  updated_at: string;
  deleted_at?: string;
};
