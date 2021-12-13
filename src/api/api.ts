import { GifsResult } from "@giphy/js-fetch-api";
import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_API_URL;
const apiKey = process.env.REACT_APP_GIPHY_KEY;

const api = axios.create({
  baseURL,
  params: {
    api_key: apiKey,
  }
});

export const apiService = {
  getGifsTrended: (): Promise<GifsResult> =>
    api.get('/trending', { params: { limit: 10 } }),

  getGifsByTerm: (term: string, offset: number):  Promise<GifsResult> =>
    api.get('/search', { params: { q: term, offset, limit: 10 }}),
}

api.interceptors.response.use(
  response => response.data,
  error => {

    /*
    * Here could be "better" ErrorHandling. If there will be any middleware
    * like Redux-Saga for example rejected Promise could be used in there
    * (show toast with information to user or something like that) so it
    * could be done on global level in one place.
    * */
    return Promise.reject(error)
  }
);