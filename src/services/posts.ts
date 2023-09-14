import axios from "axios"
import { ENDPOINT } from "./endpoints"

export const getAllPosts = async () => {
  const response = await axios.get(`${ENDPOINT}/posts`)
  return response
}

export const getPostById = async (id: string) => {
  const response = await axios.get(`${ENDPOINT}/posts/find/${id}`)
  return response
}