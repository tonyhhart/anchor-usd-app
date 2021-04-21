import { useSelector } from 'react-redux';

import { createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import api, { getErrorMessage } from 'services/api-service';
import { jsonConsole } from 'services/helpers-service';

import { StoreState, StoreDispatch } from '.';
import { selectApiToken } from './authReducer';

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
  },
});

export const { list_coins, list_coins_success, list_coins_error } = coinsSlice.actions;

export const listCoinsAsync = (api_token?: string) => (dispatch: StoreDispatch, state) => {
  dispatch(list_coins());

  api(api_token)
    .get('index')
    .then(({ data }: AxiosResponse<{ data: CoinResponse[] }>) => {
      dispatch(list_coins_success(data.data));
    })
    .catch((error) => {
      dispatch(list_coins_error(getErrorMessage(error)));
    });
};

export const selectCoinState = (state: StoreState) => state.coins;

export default coinsSlice.reducer;

export type CoinsState = {
  data: CoinResponse[];
  loading: boolean;
  success: boolean;
  error?: string;
};

export type CoinsReducers = {
  list_coins: (state: CoinsState) => void;
  list_coins_success: (state: CoinsState, params: { payload: CoinResponse[] }) => void;
  list_coins_error: (state: CoinsState, params: { payload: string }) => void;
};

export type Coin = {
  id: number;
  name: string;
  fullname: string;
  internal: string;
  dominant_color: string;
  image: string;
  image_url: string;
  type: string;
  documenttype: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
};

export type CoinResponse = {
  CoinModel: Coin;
};
