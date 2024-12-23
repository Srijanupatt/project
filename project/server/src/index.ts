import express from 'express'
import cors from 'cors'
import { productRoutes } from './routes/products'
import { errorHandler } from './middleware/error'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Marketplace API is running' })
})

app.use('/api/products', productRoutes)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})