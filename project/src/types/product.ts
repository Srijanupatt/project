export interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  category: string
  rating: number
  ratingsCount: number
  createdAt: string
  updatedAt: string
}

export interface CreateProductInput {
  name: string
  description: string
  price: number
  imageUrl: string
  category: string
}

export interface UpdateProductInput extends Partial<CreateProductInput> {
  id: string
}

export interface RateProductInput {
  productId: string
  rating: number
}