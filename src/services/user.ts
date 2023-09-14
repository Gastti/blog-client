import axios from "axios"
import { ENDPOINT } from "./endpoints"

export const getMyUser = async (token: string) => {
  const response = axios.get(`${ENDPOINT}/users/me`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  return response
}