import React, { useState, useEffect } from "react";

const ProductForm = ({ onAdd, onUpdate, editingProduct }) => {
  const [form, setForm] = useState({ title: "", price: "", category: "", image: "" });

  useEffect(() => {
    if (editingProduct) {
      setForm(editingProduct);
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      onUpdate(form);
    } else {
      onAdd(form);
    }
    setForm({ title: "", price: "", category: "", image: "" });
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="title" 
        placeholder="Product Title" 
        value={form.title} 
        onChange={handleChange} 
        required
      />
      <input 
        type="number" 
        name="price" 
        placeholder="Price" 
        value={form.price} 
        onChange={handleChange} 
        required
      />
      <input 
        type="text" 
        name="category" 
        placeholder="Category" 
        value={form.category} 
        onChange={handleChange} 
        required
      />
      <input 
        type="text" 
        name="image" 
        placeholder="Image URL" 
        value={form.image} 
        onChange={handleChange} 
        required
      />
      <button type="submit">
        {editingProduct ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};

export default ProductForm;
