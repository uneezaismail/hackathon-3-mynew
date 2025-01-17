import Card from '@/components/Card';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';



const query = groq`*[_type == "product"]{
  _id,
  productName,
  price,
  discountPercentage,
  inventory,
  category,
  description,
    "imageUrls": images[].asset->url
}`;

export default async function Page() {
  const products = await client.fetch(query);
console.log(products)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((product: any) => (
        <Card key={product._id} data={product} />
      ))}
    </div>
  );
}
