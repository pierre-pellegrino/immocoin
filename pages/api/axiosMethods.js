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
  // static async getProperty() {
  //   const response = await API.get(API_URL);
  //   console.log('>>> getProperty response: ', response)
  //   return response.data;
  // }
  // static async editProperty(id, newProperty) {
  //   const response = await API.put(`/Property/${id}`, newProperty);
  //   console.log('>>> editProperty response: ', response)
  //   return response.data;
  // }
  // static async deleteProperty(id) {
  //   const response = await API.delete(`/Property/${id}`);
  //   console.log('>>> deleteProperty response: ', response)
  //   return response.data;
  // }
}
