import { API_ENDPOINT, API_DEBUG_RESPONSE } from '@env';
import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { jsonConsole } from './helpers-service';

function serialize(obj: Record<string, string | number | boolean>): string {
  if (!obj) return '';

  const str: string[] = [];

  Object.keys(obj).map((key) =>
    str.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
  );

  return str.join('&');
}

const api = (token?: string): AxiosInstance => {
  const apiLocal = axios.create({
    baseURL: API_ENDPOINT,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  apiLocal.interceptors.request.use(
    (request: AxiosRequestConfig) => {
      if (__DEV__)
        jsonConsole(
          `Sending ${request.method?.toUpperCase()} request to ${request.baseURL}${
            request.url
          }?${serialize(request.params)}`
        );
      return Promise.resolve(request);
    },
    (error) => Promise.reject(error)
  );

  apiLocal.interceptors.response.use(
    (response: AxiosResponse) => {
      if (__DEV__ && API_DEBUG_RESPONSE === 'true') jsonConsole('Response', response.data);

      return Promise.resolve(response);
    },
    (error: AxiosError) => {
      if (__DEV__ && API_DEBUG_RESPONSE === 'true')
        jsonConsole('Error:', error.response?.status, error.response?.data);

      return Promise.reject(error);
    }
  );

  return apiLocal;
};

export function getErrorMessage(error: AxiosError): string {
  if (error.response?.data?.errors) {
    const [fields]: Array<Array<string>> = Object.values(error.response.data.errors);
    const [message] = fields;
    if (message) return message;
  }

  if (error.response?.data.error) {
    return error.response?.data.error;
  }

  return error.message;
}

export default api;
