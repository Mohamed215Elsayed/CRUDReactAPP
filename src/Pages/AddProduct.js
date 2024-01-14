import React, { useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AddProduct = () => {
  const [Title,setTitle] = useState("");
  const [Price,setPrice] = useState(0);
  const [Category,setCategory] = useState("");
  const [Description,setDescription] = useState("");
  let navigate = useNavigate();
  const formSubmit = async (e) => {
    e.preventDefault();
  //     await axios.post('http://localhost:9000/products', {
  //       title: Title,
  //       price: Price,
  //       category: Category,
  //       description: Description,
  //     })
  //     .then((data) => {console.log(data)
  //       navigate('/products')})
  //     .catch ( error => {console.log(error)});
  // };
  const headers = {
    'Content-Type': 'application/json',
    // Add any other headers you need
  };

  const requestBody = {
    title: Title,
    price: Price,
    category: Category,
    description: Description,
  };

  try {
    const response = await axios.post('http://localhost:9000/products', JSON.stringify(requestBody), {
      headers: headers,
    });

    console.log(response.data);
    navigate('/products');
  } catch (error) {
    console.log(error);
  }
};


  return (
    <>
      <h1>AddProduct</h1>
      <form onSubmit={formSubmit}>
        <div className="mb-3">
          <label htmlFor="ProductTitle" className="form-label">Title</label>
          <input type="text" className="form-control" id="ProductTitle" placeholder="Product Title" onChange={(e) => setTitle(e.target.value)}/>
        </div>

        <div className="mb-3">
          <label htmlFor="ProductDescription" className="form-label">Description</label>
          <input type="text" className="form-control" id="ProductDescription" placeholder="Product Description" onChange={(e) => setDescription(e.target.value)} />
        </div>


        <div className="mb-3">
          <label htmlFor="ProductCategorty" className="form-label">Category</label>
          <input type="text" className="form-control" id="ProductCategorty" placeholder="Product Categorty" onChange={(e) => setCategory(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="ProductPrice" className="form-label">Price</label>
          <input type="number" className="form-control" id="ProductPrice" placeholder="Product Price" onChange={(e) => setPrice(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
    </>
  )
}
export default AddProduct;