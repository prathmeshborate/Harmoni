import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ProductModal from "./components/ProductModal";
import ProductPage from "./components/ProductPage";

const App = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleProductClick = (productId) => {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((res) => res.json())
      .then((data) => setSelectedProduct(data));
  };

  const handleAddToCart = (quantity) => {
    setCartCount(cartCount + quantity);
    setSelectedProduct(null); // Close the modal after adding to cart
  };

  const handleModalClose = () => {
    setSelectedProduct(null);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="App">
      <Navbar cartCount={cartCount} onCategorySelect={handleCategorySelect} />
      <ProductPage selectedCategory={selectedCategory} onProductClick={handleProductClick} />
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={handleModalClose}
          onAddToCart={handleAddToCart}
        />
      )}
      {/* Include Footer Component Here */}
    </div>
  );
};

export default App;
