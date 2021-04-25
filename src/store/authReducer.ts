import { createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import api, { getErrorMessage } from 'services/api-service';

import { StoreState, StoreDispatch, AppThunk } from '.';

export const authSlice = createSlice<AuthState, AuthReducers>({
  name: 'auth',
  initialState: {
    user: {
      id: 0,
      name: '',
      email: '',
      api_token: '',
      info: {
        id: 0,
        coins_order: [],
      },
    },
    api_token: '',
    loading: false,
    success: false,
    error: undefined,
  },
  reducers: {
    login: (state) => {
      state.loading = true;
      state.success = false;
      state.error = undefined;
    },
    login_success: (state, action) => {
      state.loading = false;
      state.success = true;
      state.user = action.payload;
      state.api_token = action.payload.api_token;
    },
    login_error: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
      state.api_token = '';
    },
    update_user_info: (state) => {
      state.loading = true;
      state.success = false;
      state.error = undefined;
    },
    update_user_info_success: (state, action) => {
      state.loading = false;
      state.success = true;
      state.user.info = action.payload;
    },
    update_user_info_error: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.api_token = '';
    },
  },
});

export const {
  login,
  login_success,
  login_error,
  update_user_info,
  update_user_info_success,
  update_user_info_error,
  logout,
} = authSlice.actions;

export const loginAsync = (params: { email: string; password: string }) => (
  dispatch: StoreDispatch
) => {
  dispatch(login());
  api()
    .post('login', params)
    .then(({ data }: AxiosResponse<{ data: User }>) => {
      dispatch(login_success(data.data));
    })
    .catch((error) => {
      dispatch(login_error(getErrorMessage(error)));
    });
};

export const registerAsync = (params: {
  email: string;
  password: string;
  password_confirmation: string;
}) => (dispatch: StoreDispatch) => {
  dispatch(login());
  api()
    .post('register', params)
    .then(({ data }: AxiosResponse<{ data: User }>) => {
      dispatch(login_success(data.data));
    })
    .catch((error) => {
      dispatch(login_error(getErrorMessage(error)));
    });
};

export const updateUserInfoAsync = (
  api_token: string,
  params: { coins_order: number[] }
): AppThunk<Promise<UserInfo>> => (dispatch) => {
  dispatch(update_user_info());
  return new Promise((resolve, reject) => {
    api(api_token)
      .post('user-infos', params)
      .then(({ data }: AxiosResponse<{ data: UserInfo }>) => {
        dispatch(update_user_info_success(data.data));
        resolve(data.data);
      })
      .catch((error) => {
        dispatch(update_user_info_error(getErrorMessage(error)));
        reject(getErrorMessage(error));
      });
  });
};

export const selectAuth = (state: StoreState) => state.auth;

export const selecUser = (state: StoreState) => state.auth.user;

export const selectApiToken = (state: StoreState) => state.auth.api_token;

export default authSlice.reducer;

export type AuthState = {
  user: User;
  api_token: string;
  loading: boolean;
  success: boolean;
  error?: string;
};

export type AuthReducers = {
  login: (state: AuthState) => void;
  login_success: (state: AuthState, params: { payload: User }) => void;
  login_error: (state: AuthState, params: { payload: string }) => void;
  update_user_info: (state: AuthState) => void;
  update_user_info_success: (state: AuthState, params: { payload: UserInfo }) => void;
  update_user_info_error: (state: AuthState, params: { payload: string }) => void;
  logout: (state: AuthState) => void;
};

export type User = {
  id: number;
  name: string;
  email: string;
  api_token: string;
  info: UserInfo;
};

export type UserInfo = {
  id: number;
  coins_order: number[];
};
