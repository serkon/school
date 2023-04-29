import axios, { AxiosResponse } from "axios";
import { from, lastValueFrom, of } from "rxjs";
import { switchMap, catchError } from "rxjs/operators";

const API_URL = process.env.REACT_APP_API_URL;

export const api = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Accept-Language": "en-US,en;q=0.9",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Timeout: 20000,
    Expires: "0",
    WithCredentials: true,
  },
});

api.defaults.withCredentials = true;

const fetchToken = () =>
  from(axios.post(`${API_URL}/Identity/loginTry`, {
    "userName": "string",
    "userId": 0,
    "sessionType": 0
  })).pipe(
    switchMap((response: AxiosResponse) => {
      const token = response.data;
      window.localStorage.setItem("token", token);
      return of(token);
    }),
    catchError((error: Error) => {
      console.error("Error fetching token:", error);
      return of(null);
    })
  );

api.interceptors.request.use(
  async (request: any) => {
    const token = window.localStorage.getItem("token");
    if (token && request.headers) {
      request.headers["Authorization"] = "Bearer " + token;
      return request;
    } else {
      const newToken = await lastValueFrom(fetchToken());
      window.localStorage.setItem("token", newToken);
      if (newToken && request.headers) {
        request.headers['Authorization'] = 'Bearer ' + newToken;
      }
      return request;
    }
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const res = error.response;
    if (res.status === 401) {
      window.localStorage.removeItem("token");
      return Promise.reject(new Error("401 Unauthorized", {cause: res}));
    }
    console.error("Looks like there was a problem. Status Code: " + res.status);
    return Promise.reject(error);
  }
);
