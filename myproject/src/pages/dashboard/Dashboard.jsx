import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "../../components/productForm";
import ProductList from "../../components/productList";
import './dashboard.css';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

// For The Use All Products
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);


// For The Add Products
  const addProduct = async (product) => {
    try {
      const res = await axios.post("https://fakestoreapi.com/products", product);
      setProducts([res.data, ...products]);
    } catch (error) {
      console.error(error);
    }
  };

  // For The Use of Update Products
  const updateProduct = async (product) => {
    try {
      await axios.put(`https://fakestoreapi.com/products/${product.id}`, product);
      setProducts(products.map(p => p.id === product.id ? product : p));
      setEditingProduct(null);
    } catch (error) {
      console.error(error);
    }
  };

  // For The Use of Delete Product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // For The Use of the Search Product
  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  
  return (
    <div className="dashboard">
      <h1 className="title"><i class="fa-brands fa-product-hunt"></i> Product Management Dashboard</h1>

      <div className="actions">
        <input 
          type="text" 
          placeholder="Search by title or category..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)} 
          className="search-input"
        />
      </div>

      <ProductForm 
        onAdd={addProduct} 
        onUpdate={updateProduct} 
        editingProduct={editingProduct} 
      />

      <ProductList 
        products={filteredProducts} 
        onEdit={setEditingProduct} 
        onDelete={deleteProduct} 
      />
    </div>
  );
};

export default Dashboard;
