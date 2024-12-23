import { Request, Response, NextFunction } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { Product } from '../types/product'
import { ApiError } from '../middleware/error'
import { calculateNewRating } from '../utils/product'
import { seedProducts } from '../data/seed'

export class ProductController {
  private products: Product[] = [...seedProducts]

  getAll = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { search, category } = req.query
      let filteredProducts = [...this.products]

      if (search) {
        filteredProducts = filteredProducts.filter(p => 
          p.name.toLowerCase().includes((search as string).toLowerCase())
        )
      }

      if (category) {
        filteredProducts = filteredProducts.filter(p => 
          p.category === category
        )
      }

      res.json(filteredProducts)
    } catch (error) {
      next(error)
    }
  }

  // ... rest of the controller methods remain the same
}