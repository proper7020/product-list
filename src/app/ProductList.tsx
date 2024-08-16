

// components/ProductList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  category: string;
  thumbnail: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>('');
  const [sortKey, setSortKey] = useState<string>('price');

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(response => {
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
      });
  }, []);

  useEffect(() => {
    let tempProducts = [...products];
    if (category) {
      tempProducts = tempProducts.filter(product => product.category === category);
    }
    tempProducts.sort((a, b) => a[sortKey] - b[sortKey]);
    setFilteredProducts(tempProducts);
  }, [category, sortKey, products]);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <select onChange={(e) => setCategory(e.target.value)} className="border p-2">
          <option value="">All Categories</option>
          {Array.from(new Set(products.map(p => p.category))).map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select onChange={(e) => setSortKey(e.target.value)} className="border p-2">
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="border p-4 rounded shadow hover:shadow-lg transition">
            <img src={product.thumbnail} alt={product.title} className="w-full h-40 object-cover mb-4"/>
            <h2 className="text-lg font-bold">{product.title}</h2>
            <p className="text-gray-600">${product.price}</p>
            <p className="text-yellow-500">Rating: {product.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
