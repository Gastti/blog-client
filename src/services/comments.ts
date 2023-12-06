import axios from "axios"
import { baseUrl } from "./shared"

export const getCommentsByPostId = async (postId: string) => {
  const response = await axios.get(`${baseUrl}/comments/${postId}`)
  return response
}