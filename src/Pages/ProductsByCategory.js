import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductsByCategory = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await axios.get("http://localhost:9000/products");
        const data = response.data;
        const filteredProducts = data.filter(
          (product) => product.category === categoryName
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products by category:", error.message);
      }
    };

    fetchProductsByCategory();
  }, [categoryName]);

  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>Products in {categoryName}</h1>
      <div className="row mt-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="col-lg-4 col-md-6 col-sm-12 mb-4" 
          >
            <div
              className="card"
              style={{
                textAlign: "center",
                padding: "10px",
                marginBottom: "20px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", 
                borderRadius: "10px",
              }}
            >
              <img
                src={product.image}
                style={{ width: "100%", height: "200px", marginBottom: "10px" }}
                className="card-img-top"
                alt={product.title}
              />
              <div>
                <p style={{color:"red",fontWeight:"bold"}}>{product.price}$</p>
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description.slice(0, 13)}</p>
              </div>
              <button className="btn btn-primary">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsByCategory;