import axios from 'axios'
import Cookies from 'js-cookie'


const APIBaseUrl = 'https://api-immocoin.herokuapp.com'

const APIRequest = axios.create({ baseURL: APIBaseUrl });

APIRequest.interceptors.request.use(({ headers, ...config }) => ({
  ...config,
  headers: {
    ...headers,
    'Content-Type': 'application/json',
    Authorization: `${headers.Authorization ||  Cookies.get('token')}`,
  },
}));

export default class APIManager {

  static async register(data) {
    const url = '/users'
    const response = await APIRequest.post(url, data) 
    Cookies.set('token', response.headers.authorization)
    return response
  }

  static async logIn(data) {
    const url = '/users/sign_in'
    const response = await APIRequest.post(url, data)
    Cookies.set('token', response.headers.authorization)
    return response;
  }

  static async logOut() {
    const url = '/users/sign_out'
    const response = await APIRequest.delete(url)
    Cookies.remove('token')
    return response;
  }

  static async logInFromToken() {
    const url = '/member-data'
    const response = await APIRequest.get(url)
    return response;
  }
  
  static async editProfile(data) {
    const url = '/users'
    const response = await APIRequest.patch(url, data)
    return response;
  }

  static async getAllProperties() {
    const url = '/properties'
    const response = await APIRequest.get(url);
    return response;
  }

  static async newProperty(data) {
    const url = '/properties'
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    }
    const response = await APIRequest.post(url, data, config)
    return response;
  }
  
  static async getPropertyDetails(id) {
    const url = `/properties/${id}`
    const response = await APIRequest.get(url)
    return response;
  }

}