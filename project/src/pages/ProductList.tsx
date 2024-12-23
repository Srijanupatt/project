import { useState } from 'react'
import { Search, Plus } from 'lucide-react'
import { ProductCard } from '../components/ProductCard'
import { Modal } from '../components/Modal'
import { ProductForm } from '../components/ProductForm'
import { useProducts } from '../lib/hooks/useProducts'
import { CreateProductInput } from '../types/product'

export function ProductList() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const {
    products,
    isLoading,
    createProduct,
    deleteProduct,
  } = useProducts(search, category)

  const handleCreateProduct = async (data: CreateProductInput) => {
    await createProduct.mutateAsync(data)
    setIsCreateModalOpen(false)
  }

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return
    await deleteProduct.mutateAsync(id)
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Product
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="books">Books</option>
          <option value="home">Home & Garden</option>
          <option value="sports">Sports & Outdoors</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={handleDeleteProduct}
          />
        ))}
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Product"
      >
        <ProductForm
          onSubmit={handleCreateProduct}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>
    </div>
  )
}