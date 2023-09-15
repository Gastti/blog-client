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

export const getPostsByAuthor = async (username: string) => {
  const response = await axios.get(`${ENDPOINT}/posts/author/${username}`)
  return response
}

export const createPost = async (body: FormData, token: string) => {
  const response = await axios.post(`${ENDPOINT}/posts`, body, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  return response
}

export const editPost = async (body: FormData, token: string, id: string) => {
  const response = await axios.put(`${ENDPOINT}/posts/${id}`, body, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  return response
}