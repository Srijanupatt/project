import { Router } from 'express'
import { ProductController } from '../controllers/products'

const router = Router()
const productController = new ProductController()

router.get('/', productController.getAll)
router.get('/:id', productController.getById)
router.post('/', productController.create)
router.put('/:id', productController.update)
router.delete('/:id', productController.delete)
router.put('/:id/rating', productController.rate)

export const productRoutes = router