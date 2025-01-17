import Image from "next/image";
import React from "react";

export interface CardProps {
  data: {
    imageUrls: string[];
    productName: string;
    price: number;
    discountPercentage?: number;
    inventory?: number;
    category?: string;
    description?: string;
  };
}

const Card: React.FC<CardProps> = ({ data }) => {
  const imageUrl = data.imageUrls && data.imageUrls[0]; 
  const salePrice = data.discountPercentage
    ? (data.price - (data.price * data.discountPercentage) / 100).toFixed(2)
    : undefined;

  return (
    <div className="group w-[300px] space-y-4 relative">
      {/* Tags */}
      <div className="absolute left-2 z-40 top-2 space-y-2">
        {data.discountPercentage !== undefined && data.discountPercentage > 0   && (
          <div className="bg-red-500 text-white text-xs px-4 py-1">{data.discountPercentage}% OFF</div>
        )}
      </div>

      {/* Image Container */}
      <div className="relative w-full h-[280px] md:h-[300px] flex items-center justify-center bg-transparent">
        {/* Default Image */}
        <Image
          src={imageUrl || "/placeholder.png"} 
          alt={data.productName}
          layout="fill"
          objectFit="cover"
          className="transition-opacity duration-300 opacity-100 group-hover:opacity-0"
        />
      </div>

      {/* Card Text */}
      <div className="space-y-3 text-center w-full">
        <h3 className="font-medium">{data.productName}</h3>
        {salePrice ? (
          <div className="text-sm">
            <span className="line-through text-gray-400">${data.price}</span>
            <span className="text-gray-950 font-semibold ml-2">${salePrice}</span>
          </div>
        ) : (
          <p className="text-sm text-gray-950 font-semibold">${data.price}</p>
        )}
      </div>
    </div>
  );
};

export default Card;
