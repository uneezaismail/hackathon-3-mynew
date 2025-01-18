import { type SchemaTypeDefinition } from 'sanity'
import { productSchema } from './products'
import categories from './categories'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productSchema, categories],
}
