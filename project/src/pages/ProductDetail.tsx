import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Edit, ArrowLeft } from 'lucide-react'
import { Modal } from '../components/Modal'
import { ProductForm } from '../components/ProductForm'
import { RatingStars } from '../components/RatingStars'
import { productApi } from '../lib/api'
import { CreateProductInput } from '../types/product'
import { formatCurrency } from '../lib/utils'
import toast from 'react-hot-toast'

export function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const { data: product, refetch } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getById(id!),
    enabled: !!id,
  })

  const handleUpdateProduct = async (data: CreateProductInput) => {
    if (!id) return

    try {
      await productApi.update({ id, ...data })
      toast.success('Product updated successfully')
      setIsEditModalOpen(false)
      refetch()
    } catch (error) {
      toast.error('Failed to update product')
    }
  }

  const handleRateProduct = async (rating: number) => {
    if (!id) return

    try {
      await productApi.rate({ productId: id, rating })
      toast.success('Rating submitted successfully')
      refetch()
    } catch (error) {
      toast.error('Failed to submit rating')
    }
  }

  if (!product) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-[400px] object-cover rounded-lg shadow-lg"
          />
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
          >
            <Edit className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-2xl font-bold text-green-600 mt-2">
              {formatCurrency(product.price)}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div>
            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
              {product.category}
            </span>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Rating</h2>
            <div className="flex items-center gap-4">
              <RatingStars rating={product.rating} size="lg" />
              <span className="text-gray-600">
                ({product.ratingsCount} ratings)
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Rate this product</h2>
            <RatingStars
              rating={0}
              size="lg"
              interactive
              onChange={handleRateProduct}
            />
          </div>
        </div>
      </div>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Product"
      >
        <ProductForm
          initialData={product}
          onSubmit={handleUpdateProduct}
          onCancel={() => setIsEditModalOpen(false)}
        />
      </Modal>
    </div>
  )
}