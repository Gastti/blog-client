import axios from 'axios'
import jwt_decode, { JwtPayload } from 'jwt-decode';
import dayjs from 'dayjs'
import { baseUrl } from '../services/shared';

let accessToken = localStorage.getItem('access') ? localStorage.getItem('access') : null
const refreshToken = localStorage.getItem('refresh') ? localStorage.getItem('refresh') : null

const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: { Authorization: `Bearer ${accessToken}` }
  })

  axiosInstance.interceptors.request.use(async req => {
    const user = jwt_decode(accessToken as string) as JwtPayload;
    const isExpired = dayjs.unix(user.exp as number).diff(dayjs()) < 1;

    if (!isExpired) return req

    const response = await axios.post(`${baseUrl}/auth/refresh`, {}, {
      headers: {
        'Authorization': `Bearer ${refreshToken}`
      }
    })

    localStorage.setItem('access', response.data.data.access)
    accessToken = response.data.data.access
    req.headers.Authorization = `Bearer ${response.data.data.access}`
    return req
  })

  return axiosInstance
}

export default useAxios