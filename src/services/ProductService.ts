import axios from 'axios'
import { Product } from '../types/product'
import { API_BASE_URL } from '../config'

export const fetchProducts = async () => {
  const response = await axios.get<Product[]>(`${API_BASE_URL}/products`)
  return response.data
}

export const fetchProductById = async (id: number) => {
  const response = await axios.get<Product>(`${API_BASE_URL}/products/${id}`)
  return response.data
}

export const fetchProductsByCategory = async (category: string) => {
  const response = await axios.get<Product[]>(
    `$${API_BASE_URL}/products/category/${category}`
  )
  return response.data
}

export const fetchCategories = async () => {
  const response = await axios.get<string[]>(`${API_BASE_URL}/products/categories`)
  return response.data
}