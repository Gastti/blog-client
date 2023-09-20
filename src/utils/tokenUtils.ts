import { refresh } from "../services/auth"

export const refreshToken = async () => {
  const tokens = await refresh(localStorage.refresh)
  localStorage.access = tokens.data.data.access
  localStorage.accessExpiration = tokens.data.data.accessExpiration
}

export function handleLocalStorageTokens(accessToken: string, accessExpiration: string, refreshToken: string) {
  localStorage.setItem("access", accessToken)
  localStorage.setItem("accessExpiration", accessExpiration)
  localStorage.setItem("refresh", refreshToken)
}