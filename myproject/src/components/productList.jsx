import React from "react";

const ProductList = ({ products, onEdit, onDelete }) => {
  return (
    <div className="product-grid">
      {products.length > 0 ? (
        products.map((p) => (
          <div className="product-card" key={p.id}>
            <img src={p.image} alt={p.title} className="product-image" />
            <h3 className="product-title">{p.title}</h3>
            <p className="product-category">{p.category}</p>
            <p className="product-price">₹{p.price}</p>
            <div className="product-actions">
              <button onClick={() => onEdit(p)}><i class="fa-solid fa-pencil"></i> Edit</button>
              <button onClick={() => onDelete(p.id)}><i class="fa-solid fa-trash"></i> Delete</button>
            </div>
          </div>
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default ProductList;
