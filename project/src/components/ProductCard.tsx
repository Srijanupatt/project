import { Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Product } from '../types/product'
import { cn, formatCurrency } from '../lib/utils'

interface ProductCardProps {
  product: Product
  onDelete?: (id: string) => void
}

export function ProductCard({ product, onDelete }: ProductCardProps) {
  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform group-hover:scale-105"
        />
      </Link>
      
      <div className="p-4">
        <div className="flex items-start justify-between">
          <Link 
            to={`/products/${product.id}`}
            className="text-lg font-semibold text-gray-900 hover:text-blue-600"
          >
            {product.name}
          </Link>
          <span className="text-lg font-bold text-green-600">
            {formatCurrency(product.price)}
          </span>
        </div>
        
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>
        
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center">
            <Star
              className={cn(
                "w-5 h-5",
                product.rating >= 4 ? "text-yellow-400" : "text-gray-300"
              )}
              fill="currentColor"
            />
            <span className="ml-1 text-sm text-gray-600">
              {product.rating.toFixed(1)} ({product.ratingsCount})
            </span>
          </div>
          
          <span className="text-sm font-medium text-gray-500 capitalize">
            {product.category}
          </span>
        </div>
      </div>

      {onDelete && (
        <button
          onClick={() => onDelete(product.id)}
          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Delete product"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  )
}