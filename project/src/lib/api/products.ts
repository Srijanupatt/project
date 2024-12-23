import { apiClient } from './client'
import { CreateProductInput, Product, RateProductInput, UpdateProductInput } from '../../types/product'

export const productApi = {
  getAll: async (search?: string, category?: string) => {
    try {
      const { data } = await apiClient.get<Product[]>('/products', {
        params: { search, category },
      })
      return data
    } catch (error) {
      throw new Error('Failed to fetch products')
    }
  },

  getById: async (id: string) => {
    try {
      const { data } = await apiClient.get<Product>(`/products/${id}`)
      return data
    } catch (error) {
      throw new Error('Failed to fetch product')
    }
  },

  create: async (input: CreateProductInput) => {
    try {
      const { data } = await apiClient.post<Product>('/products', input)
      return data
    } catch (error) {
      throw new Error('Failed to create product')
    }
  },

  update: async ({ id, ...input }: UpdateProductInput) => {
    try {
      const { data } = await apiClient.put<Product>(`/products/${id}`, input)
      return data
    } catch (error) {
      throw new Error('Failed to update product')
    }
  },

  delete: async (id: string) => {
    try {
      await apiClient.delete(`/products/${id}`)
    } catch (error) {
      throw new Error('Failed to delete product')
    }
  },

  rate: async ({ productId, rating }: RateProductInput) => {
    try {
      const { data } = await apiClient.put<Product>(`/products/${productId}/rating`, { rating })
      return data
    } catch (error) {
      throw new Error('Failed to rate product')
    }
  },
}