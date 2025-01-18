import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { useEffect, useState } from 'react'

interface Product {
  _id: string
  productName: string
  price: number
  category: string[]
  images: {
    asset: {
      url: string
    }
  }[]
  description: string
  slug: {
    current: string
  }
}

const CategoryPage = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      // Example category to fetch products for (replace this with the category you're interested in)
      const selectedCategory = 'Sofas'

      const query = groq`
        *[_type == "product" && category[] == $selectedCategory]{
          _id,
          productName,
          price,
          category,
          images,
          description,
          slug
        }
      `

      const fetchedProducts = await client.fetch(query, { selectedCategory })
      setProducts(fetchedProducts)
    }

    fetchProducts()
  }, [])

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-semibold my-8 text-center">Products in Category</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg">
            <img
              src={product.images[0]?.asset.url}
              alt={product.productName}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold mt-4">{product.productName}</h3>
            <p className="text-gray-600 text-sm">{product.description}</p>
            <p className="text-lg font-bold mt-2">${product.price}</p>
            <a href={`/products/${product.slug.current}`} className="text-blue-600 mt-4 inline-block">
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryPage
