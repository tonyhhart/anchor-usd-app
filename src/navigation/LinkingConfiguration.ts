/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */

import * as Linking from 'expo-linking';
import { Coin } from 'store';

function getConfig(routeName, config) {
  if (config.screens) {
    return getConfig(routeName, config.screens);
  }

  for (const screen in config) {
    // console.log(`Scre `, screen);
    if (screen === routeName) return config[screen];
  }

  for (const screen in config) {
    if (typeof config[screen] === 'object' && config[screen].screens) {
      const r = getConfig(routeName, config[screen].screens);

      if (typeof r === 'string') {
        return r;
      }
    }
  }

  return false;
}

export function routeToLink(routeName) {
  const config = getConfig(routeName, linkingConfiguration.config);

  if (typeof config === 'string') {
    return config;
  }

  if (typeof config?.path === 'string') {
    return config.path;
  }

  return config;
}

const linkingConfiguration = {
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

export default linkingConfiguration;
