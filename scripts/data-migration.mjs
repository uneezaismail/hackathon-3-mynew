import { createClient } from '@sanity/client';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2025-01-17',
});

async function uploadImageToSanity(imageUrl) {
  try {
    console.log(`Uploading image: ${imageUrl}`);
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data);
    const asset = await client.assets.upload('image', buffer, {
      filename: imageUrl.split('/').pop(),
    });
    console.log(`Image uploaded successfully: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error('Failed to upload image:', imageUrl, error);
    return null;
  }
}

async function importData() {
  try {
    console.log('Migrating data, please wait...');

    // Fetching product data from your local API
    const response = await axios.get('http://localhost:3000/api/products');
    const products = response.data.data;
    console.log('Products fetched: ', products);

    for (const product of products) {
      let imageRefs = [];
if (product.images && product.images.length > 0) {
  for (const imageUrl of product.images) {
    const imageRef = await uploadImageToSanity(imageUrl);
    if (imageRef) {
      imageRefs.push({
        _key: `${product.product_id}-${imageUrl}`, // Ensure this value is unique
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageRef,
        },
      });
    }
  }
}

      const sanityProduct = {
        _type: 'product',
        product_id: product.product_id, // Using product_id as the _id for the document in Sanity
        productName: product.name,
        description: product.description,
        price: product.price,
        category: product.categories || [], // Array of categories
        tags: product.tags || [], // Array of tags
        discountPercentage: product.discountPercentage || 0, // Discount percentage
        colors: Array.isArray(product.color)
          ? product.color
          : product.color
          ? [product.color]
          : [], // Optional, in case color is a single string or array
        sizes: product.sizes || [], // Array of sizes
        inventory: product.stock || 0, // Stock count
        images: imageRefs.length > 0 ? imageRefs : undefined, // Array of images
      };

      await client.create(sanityProduct);
    }

    console.log('Data migrated successfully!');
  } catch (error) {
    console.error('Error migrating data: ', error);
  }
}

importData();
