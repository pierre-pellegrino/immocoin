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
    return response;
  }
  static async logIn(payload) {
    const response = await API.post(`/users/sign_in`, payload)
    console.log('>>> LOGIN response: ', response)
    Cookies.set('token', response.headers.authorization)
    return response;
  }
  static async logOut() {
    const response = await API.delete(`/users/sign_out`)
    console.log('>>> LOGOUT response: ', response)
    Cookies.remove('token')
    return response;
  }
  static async logInFromToken() {
    const response = await API.get("/member-data");
    return response;
  }
  static async getAllProperties() {
    const response = await API.get("/properties");
    return response;
  }
  static async newProperty(payload) {
    const response = await API.post("/properties", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  }
  static async getPropertyDetails(id) {
    const response = await API.get(`/properties/${id}`)
    return response;
  }
  static async editProfile(userId, newProfile) {
    // const response = await API.patch(`/member-update/${userId}`, newProfile, {
    const response = await API.put(`/member-update/`, newProfile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  }
}