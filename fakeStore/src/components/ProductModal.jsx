import React, { useState } from "react";

const ProductModal = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(quantity);
    setQuantity(1); // Reset quantity after adding to cart
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 sm:p-8 rounded-lg w-full max-w-[95%] sm:max-w-3xl relative">
        {/* Close Button */}
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl" onClick={onClose}>
          &times;
        </button>

        {/* Modal Content */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start">
          {/* Product Image - Smaller for Mobile */}
          <img
            src={product.image}
            alt={product.title}
            className="w-1/2 sm:w-1/2 h-auto object-cover rounded-lg"
          />

          {/* Product Details */}
          <div className="w-full sm:w-1/2 flex flex-col justify-between px-0 sm:px-6 mt-4 sm:mt-0">
            <div className="text-left">
              <h2 className="text-lg sm:text-2xl font-bold">{product.title}</h2>

              {/* Rating & Stock */}
              <div className="flex items-center mt-2 text-sm sm:text-base">
                <p className="text-gray-600">{product.rating.rate} ({product.rating.count})</p>
                <div className="border-l h-4 mx-2"></div>
                <p className="text-green-500">In Stock</p>
              </div>

              {/* Price */}
              <p className="text-red-500 font-bold text-lg sm:text-xl mt-2">${product.price}</p>
            </div>

            {/* Description (Left Aligned) */}
            <p className="text-gray-700 text-sm sm:text-base mt-4 text-left">{product.description}</p>

            {/* Buttons Section - Fixed Single Line Layout */}
<div className="flex items-center justify-start gap-2 sm:gap-4 w-full mt-6 flex-nowrap">
  {/* Quantity Selector - Smaller for Mobile */}
  <div className="flex items-center border rounded-lg h-9 sm:h-10">
    <button className="px-3 sm:px-4 text-red-500 rounded-l-lg h-full text-base sm:text-lg" onClick={handleDecrease}>-</button>
    <span className="px-4 sm:px-6 border-l border-r h-full flex items-center justify-center text-base sm:text-lg">{quantity}</span>
    <button className="px-3 sm:px-4 bg-red-500 text-white rounded-r-lg h-full text-base sm:text-lg" onClick={handleIncrease}>+</button>
  </div>

  {/* Buy Now Button - Adjusted Size for Mobile */}
  <button
    onClick={handleAddToCart}
    className="bg-red-500 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg hover:bg-red-700 text-base sm:text-lg flex-shrink-0"
  >
    Buy Now
  </button>
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
