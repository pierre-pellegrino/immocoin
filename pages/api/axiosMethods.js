import axios from "axios";
import Cookies from 'js-cookie';

const API = axios.create({ baseURL: 'https://api-immocoin.herokuapp.com' });

API.interceptors.request.use(({ headers, ...config }) => ({
  ...config,
  headers: {
    ...headers,
    'Content-Type': 'application/json',
    Authorization: `Bearer ${headers.Authorization ||  Cookies.get('token')}`,
  },
}));

export default class APIManager {

  static async register(payload) {
    const response = await API.post(`/users`, payload);
    console.log('>>> REGISTER response: ', response)
    return response.headers.authorization.split(' ')[1];
  }
  static async logIn(payload) {
    const response = await API.post(`/users/sign_in`, payload);
    console.log('>>> LOGIN response: ', response)
    return response;
  }
  static async logOut() {
    const response = await API.delete(`/users/sign_out`);
    console.log('>>> LOGOUT response: ', response)
    return response;
  }
  // static async getFlat() {
  //   const response = await API.get(API_URL);
  //   console.log('>>> getFlat response: ', response)
  //   return response.data;
  // }
  // static async editFlat(id, newFlat) {
  //   const response = await API.put(`/flats/${id}`, newFlat);
  //   console.log('>>> editFlat response: ', response)
  //   return response.data;
  // }
  // static async deleteFlat(id) {
  //   const response = await API.delete(`/flats/${id}`);
  //   console.log('>>> deleteFlat response: ', response)
  //   return response.data;
  // }
}
