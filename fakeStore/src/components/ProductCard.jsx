import React from "react";
import { FaStar } from "react-icons/fa";

const ProductCard = ({ product, onClick }) => {
  const maxTitleLength = 50;

  const truncateTitle = (title) => {
    return title.length > maxTitleLength ? title.slice(0, maxTitleLength) + "..." : title;
  };

  const renderStars = (rating) => {
    return [...Array(Math.round(rating))].map((_, i) => <FaStar key={i} className="text-yellow-500 text-sm" />);
  };

  return (
    <div
      className="p-2 sm:p-3 bg-white border rounded-lg cursor-pointer hover:shadow-lg
      max-w-[160px] sm:max-w-[180px] md:max-w-[220px] lg:max-w-[250px] w-full mx-auto"
      onClick={() => onClick(product.id)}
    >
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-auto object-cover mb-2 rounded-md aspect-[4/3]"
      />
      <h2 className="text-xs sm:text-sm font-semibold mb-1 truncate">{truncateTitle(product.title)}</h2>
      <p className="text-red-500 font-bold mb-1 text-sm sm:text-base">${product.price}</p>
      <div className="flex items-center">
        {renderStars(product.rating.rate)}
        <span className="text-gray-600 ml-1 text-xs sm:text-sm">{product.rating.rate} ({product.rating.count})</span>
      </div>
    </div>
  );
};

export default ProductCard;
