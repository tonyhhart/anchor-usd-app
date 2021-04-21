import React from 'react';

import { applyMiddleware, combineReducers, createStore } from '@reduxjs/toolkit';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
import thunk from 'redux-thunk';

import authReducer, { AuthState } from './authReducer';
import coinsReducer, { CoinsState } from './coinsReducer';

const reducer = storage.reducer(
  combineReducers({
    auth: authReducer,
    coins: coinsReducer,
  })
);

const engine = createEngine('anchor-usd-app');

const middleware = storage.createMiddleware(engine);

const createStoreWithMiddleware = applyMiddleware(thunk, middleware)(createStore);

const store = createStoreWithMiddleware(reducer);

const load = storage.createLoader(engine);

export default function useStore() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      await load(store);

      setLoadingComplete(true);
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete ? store : false;
}

export type StoreState = {
  auth: AuthState;
  coins: CoinsState;
};

export type StoreDispatch = typeof store.dispatch;

export * from './authReducer';
export * from './coinsReducer';
