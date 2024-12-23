import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { productApi } from '../api/products'
import { CreateProductInput, UpdateProductInput, RateProductInput } from '../../types/product'
import toast from 'react-hot-toast'

export function useProducts(search?: string, category?: string) {
  const queryClient = useQueryClient()

  const productsQuery = useQuery({
    queryKey: ['products', search, category],
    queryFn: () => productApi.getAll(search, category),
  })

  const createProduct = useMutation({
    mutationFn: (input: CreateProductInput) => productApi.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success('Product created successfully')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const updateProduct = useMutation({
    mutationFn: (input: UpdateProductInput) => productApi.update(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success('Product updated successfully')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const deleteProduct = useMutation({
    mutationFn: (id: string) => productApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success('Product deleted successfully')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const rateProduct = useMutation({
    mutationFn: (input: RateProductInput) => productApi.rate(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success('Rating submitted successfully')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return {
    products: productsQuery.data ?? [],
    isLoading: productsQuery.isLoading,
    error: productsQuery.error,
    createProduct,
    updateProduct,
    deleteProduct,
    rateProduct,
  }
}