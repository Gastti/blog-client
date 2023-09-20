import axios from "axios"
import { baseUrl } from "./shared"

export const getMyUser = async (token: string) => {
  const response = axios.get(`${baseUrl}/users/me`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  return response
}