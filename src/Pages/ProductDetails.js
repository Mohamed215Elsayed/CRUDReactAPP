import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch(`http://localhost:9000/products/${productId}`)
      .then((response) => response.json())
      .then((productData) => {
        setProduct(productData);
      })
      .catch((error) => console.log(error));
  }, [productId]);

  const tableStyle = {
    width: "80%",
    borderCollapse: "collapse",
    margin: "20px",
  };

  const thStyle = {
    padding: "8px",
    borderBottom: "2px solid #ddd",
    border: "2px solid #ddd",
    textAlign: "left",
    fontWeight: "bold",
    backgroundColor: "#f2f2f2",
    // color: "black",
  };

  const tdStyle = {
    padding: "8px",
    borderBottom: "1px solid #ddd",
    border: "2px solid #ddd",
    textAlign: "left",
  
  };
  

  const imageStyle = {
    width: "100px",
    height: "auto",
  };

  return (
    <>
      {product &&(
        <table style={tableStyle} className="product-table" >
          <tbody>
            <tr>
              <th style={thStyle} scope="row">
                ID
              </th>
              <td style={tdStyle}>{product.id}</td>
            </tr>
            <tr>
              <th style={thStyle} scope="row">
                Title
              </th>
              <td style={tdStyle}>{product.title}</td>
            </tr>
            <tr>
              <th style={thStyle} scope="row">
                Description
              </th>
              <td style={tdStyle}>{product.description}</td>
            </tr>
            <tr>
              <th style={thStyle} scope="row">
                Price
              </th>
              <td style={tdStyle}>{product.price}</td>
            </tr>
            <tr>
              <th style={thStyle} scope="row">
                Category
              </th>
              <td style={tdStyle}>{product.category}</td>
            </tr>
            <tr>
              <th style={thStyle} scope="row">
                Image
              </th>
              <td style={tdStyle}>
                <img src={product.image} alt={product.title} style={imageStyle} />
              </td>
            </tr>
          </tbody>
        </table>
      )
      }
    </>
  );
};

export default ProductDetails;


