import axios, {AxiosRequestConfig} from 'axios';

type MethodTypes = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

type FetchParams = {
  method?: MethodTypes;
  path: string;
  params?: object;
  headers?: object;
  data?: any;
} & AxiosRequestConfig;

var apiURL = '';

const fetch = <T>({
  method = 'GET',
  path,
  params,
  headers,
  responseType,
  data,
  withCredentials,
}: FetchParams) => {
  return new Promise<T>(async (resolve, reject) => {
    const URL = 'https://zoo-animal-api.herokuapp.com';

    const url = `${URL}${path}`;

    try {
      axios
        .request<T>({
          headers,
          url,
          method,
          params,
          responseType,
          data,
          withCredentials,
        })
        .then(async response => {
          //@ts-ignore
          if (response.data?.success === false) {
            reject({response});
          }
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};

export default fetch;
