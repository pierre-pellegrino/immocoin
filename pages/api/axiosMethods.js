import axios from "axios";
import Cookies from 'js-cookie';

const API = axios.create({ baseURL: 'https://api-immocoin.herokuapp.com' });

API.interceptors.request.use(({ headers, ...config }) => ({
  ...config,
  headers: {
    ...headers,
    'Content-Type': 'application/json',
    Authorization: `${headers.Authorization ||  Cookies.get('token')}`,
  },
}));

export default class APIManager {

  static async register(payload) {
    const response = await API.post(`/users`, payload)
    console.log('>>> REGISTER response.headers.auth: ', response.headers.authorization)
    Cookies.set('token', response.headers.authorization)
  }
  static async logIn(payload) {
    const response = await API.post(`/users/sign_in`, payload)
    console.log('>>> LOGIN response: ', response)
    Cookies.set('token', response.headers.authorization)
  }
  static async logOut() {
    const response = await API.delete(`/users/sign_out`)
    console.log('>>> LOGOUT response: ', response)
    Cookies.remove('token')
  }
}