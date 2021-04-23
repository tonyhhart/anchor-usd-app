/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import * as Linking from 'expo-linking';
import { Coin } from 'store';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Login: '/login',
      Register: '/register',
      Root: {
        screens: {
          ExploreTab: {
            screens: {
              ExploreScreen: '/',
            },
          },
          PortifolioTab: {
            screens: {
              PortifolioScreen: '/portifolio',
            },
          },
          MoveTab: {
            screens: {
              MoveScreen: '/move',
            },
          },
          SettingsTab: {
            screens: {
              SettingsScreen: '/settings',
            },
          },
        },
      },
      ViewCoin: {
        path: '/coins/:coin',
        parse: {
          coin: (id: string): Coin => ({
            id: Number(id),
            name: '--',
            coinname: '--',
            fullname: '--',
            description: '--',
            symbol: '--',
            image: '',
            image_url: '',
            usd_price: 0,
            usd_change_pct_day: 0,
            usd_change_pct_24_hours: 0,
            usd_change_pct_hour: 0,
            historic: [],
            created_at: '',
            updated_at: '',
          }),
        },
        stringify: {
          coin: (coin: Coin) => coin.id.toString(),
        },
      },
      NotFound: '*',
    },
  },
};
