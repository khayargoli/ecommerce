import axios from 'axios'
import { API_BASE_URL } from '../config'

interface LoginResponse {
  token: string
}

export const login = async (username: string, password: string) => {
  const response = await axios.post<LoginResponse>(`${API_BASE_URL}/auth/login`, {
    username,
    password,
  })
  return response.data
}
