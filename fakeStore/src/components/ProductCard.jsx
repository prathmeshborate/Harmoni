import React from "react";
import { FaStar } from "react-icons/fa";

const ProductCard = ({ product, onClick }) => {
  const maxTitleLength = 50; // Maximum number of characters for the title before truncating

  const truncateTitle = (title) => {
    if (title.length > maxTitleLength) {
      return title.slice(0, maxTitleLength) + "...";
    }
    return title;
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < Math.round(rating); i++) {
      stars.push(<FaStar key={i} className="text-yellow-500" />);
    }
    return stars;
  };

  return (
    <div className="p-2 sm:p-4 bg-white border rounded-lg cursor-pointer hover:shadow-lg" onClick={() => onClick(product.id)}>
      <img src={product.image} alt={product.title} className="w-full h-32 sm:h-48 object-cover mb-2 sm:mb-4 rounded-md" />
      <h2 className="text-sm sm:text-lg font-semibold mb-1 sm:mb-2 truncate">{truncateTitle(product.title)}</h2>
      <p className="text-red-500 font-bold mb-1 sm:mb-2">${product.price}</p>
      <div className="flex items-center">
        {renderStars(product.rating.rate)}
        <span className="text-gray-600 ml-2">{product.rating.rate} ({product.rating.count})</span>
      </div>
    </div>
  );
};

export default ProductCard;
