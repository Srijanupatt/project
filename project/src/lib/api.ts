import axios from 'axios'
import { CreateProductInput, Product, RateProductInput, UpdateProductInput } from '../types/product'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
})

export const productApi = {
  getAll: async (search?: string, category?: string) => {
    const { data } = await api.get<Product[]>('/products', {
      params: { search, category },
    })
    return data
  },

  getById: async (id: string) => {
    const { data } = await api.get<Product>(`/products/${id}`)
    return data
  },

  create: async (input: CreateProductInput) => {
    const { data } = await api.post<Product>('/products', input)
    return data
  },

  update: async ({ id, ...input }: UpdateProductInput) => {
    const { data } = await api.put<Product>(`/products/${id}`, input)
    return data
  },

  delete: async (id: string) => {
    await api.delete(`/products/${id}`)
  },

  rate: async ({ productId, rating }: RateProductInput) => {
    const { data } = await api.put<Product>(`/products/${productId}/rating`, { rating })
    return data
  },
}