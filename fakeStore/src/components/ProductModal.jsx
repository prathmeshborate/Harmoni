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
    setQuantity(1); // Reset the quantity after adding to cart
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-3xl relative">
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={onClose}>X</button>
        <div className="flex">
          <img src={product.image} alt={product.title} className="w-1/2 h-auto object-cover rounded-lg" />
          <div className="ml-8">
            <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
            <div className="flex items-center mb-4">
              <p className="text-gray-600">{product.rating.rate} ({product.rating.count})</p>
              <div className="border-l h-5 mx-2"></div>
              <p className="text-green-500">In Stock</p>
            </div>
            <p className="text-red-500 font-bold text-xl mb-4">${product.price}</p>
            <p className="text-gray-700 mb-8">{product.description}</p>
            <hr className="mb-4"/>
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg h-10">
                <button className="px-2 text-red-500 rounded-l-lg h-full" onClick={handleDecrease}>-</button>
                <span className="px-4 border-l border-r h-full flex items-center justify-center">{quantity}</span>
                <button className="px-2 bg-red-500 text-white rounded-r-lg h-full" onClick={handleIncrease}>+</button>
              </div>
              <button onClick={handleAddToCart} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
