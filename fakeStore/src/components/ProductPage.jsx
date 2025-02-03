import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const ProductPage = ({ selectedCategory, onProductClick }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let url = "https://fakestoreapi.com/products";
    if (selectedCategory) {
      url = `https://fakestoreapi.com/products/category/${selectedCategory}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [selectedCategory]);

  return (
    <div className="product-list grid gap-4 p-4 pt-20 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onClick={onProductClick} />
      ))}
    </div>
  );
};

export default ProductPage;
