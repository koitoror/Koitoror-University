// import axios from 'axios/index';
import axios from "axios";

// Backend API URL
// import { API_HOST as uri } from '../../api/fetch/api'
import { API_HOST } from '../api/fetch/api'


// const limit = (count, p) => `limit=${count}&offset=${p ? (p - 1) * count : 0}`;


// eslint-disable-next-line import/prefer-default-export
export const api = {
  auth: {
    // signup: data => axios.post(`${API_HOST}/rest-auth/registration/`, data),
    signup: data => axios.post(`${API_HOST}/api/signup/`, data),
    // login: data => axios.post(`${API_HOST}/auth/login/`, data),
    login: data => axios.post(`${API_HOST}/api/token/`, data),

    // loginSocial: data => axios.post(`${API_HOST}/auth/${data.url}/`, data.payload),
    // resetPasswordLink: data => axios.post(`${API_HOST}/auth/password_reset/`, data),
    // resetPassword: data => axios.patch(`${API_HOST}/auth/password_reset/${data.token}/`, data.resetData),
    // verifyEmail: data => axios.get(`${API_HOST}/verify-email/${data.token}/${data.uid}/`),
  },
  profile: {
    getMyProfile: () => axios.get(`${API_HOST}/profiles/`),
  }
}