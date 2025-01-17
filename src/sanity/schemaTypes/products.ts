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
              .replace(/\s+/g, '-') // replace spaces with hyphens
              .replace(/[^\w\-]+/g, '') // remove non-word characters
              .replace(/\-\-+/g, '-') // replace multiple hyphens with one
              .replace(/^-+/, '') // remove leading hyphens
              .replace(/-+$/, '') // remove trailing hyphens
        }},
        { name: 'description', type: 'text', title: 'Description' },
        { name: 'price', type: 'number', title: 'Price' },
        { name: 'categories', type: 'array', of: [{ type: 'string' }], title: 'Categories' },
        { name: 'tags', type: 'array', of: [{ type: 'string' }], title: 'Tags' },
        { name: 'discountPercentage', type: 'number', title: 'Discount Percentage' },
        { name: 'color', type: 'string', title: 'Color' },
        { name: 'sizes', type: 'array', of: [{ type: 'string' }], title: 'Sizes' },
        { name: 'stock', type: 'number', title: 'Stock' },
        { name: 'images', type: 'array', of: [{ type: 'image' }], title: 'Images' },
        { name: 'material', type: 'string', title: 'Material' },
        { name: 'dimensions', type: 'text', title: 'Dimensions' },
        { name: 'weight', type: 'string', title: 'Weight' },
    ]
};
