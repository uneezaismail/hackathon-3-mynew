export const productSchema = {
    name: 'product',
    type: 'document',
    title: 'Product',
    fields: [
        { name: 'productName', type: 'string', title: 'Name' },
      { name: 'product_id', type: 'string', title: 'Product ID' },
      { name: 'slug', type: 'slug', title: 'Slug', options: {
        source: 'productName',
        maxLength: 96,
        slugify: (input:any) => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]+/g, '')
          .replace(/\-\-+/g, '-')
          .replace(/^-+/, '')
          .replace(/-+$/, '')
      }},
      { name: 'price', type: 'number', title: 'Price' },
      { name: 'inventory', type: 'number', title: 'Stock' },
      { name: 'category', type: 'array', title: 'Categories', of: [{ type: 'string' }] },
      { name: 'tags', type: 'array', title: 'Tags', of: [{ type: 'string' }] },
      { name: 'rating', type: 'number', title: 'Rating' },
      { name: 'images', type: 'array', title: 'Images', of: [{ type: 'image' }] },
      { name: 'description', type: 'text', title: 'Description' },
      { name: 'colors', type: 'array', title: 'Colors', of: [{ type: 'string' }] },
      { name: 'sizes', type: 'array', title: 'Sizes', of: [{ type: 'string' }] },
      { name: 'discountPercentage', type: 'number', title: 'Discount Percentage' },
      { name: 'material', type: 'string', title: 'Material' },
      { name: 'dimensions', type: 'text', title: 'Dimensions' },
      { name: 'weight', type: 'string', title: 'Weight' },
    ]
  };

