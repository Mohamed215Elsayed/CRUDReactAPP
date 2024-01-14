// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useDropzone } from "react-dropzone"; //
// const EditProduct = () => {
//   const { productId } = useParams();
//   const [product, setProduct] = useState({});
//   const [title, setTitle] = useState("");
//   const [price, setPrice] = useState(0);
//   const [category, setCategory] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState(""); //
//   const navigate = useNavigate();
//   useEffect(() => {
//     fetch(`http://localhost:9000/products/${productId}`)
//       .then((response) => response.json())
//       .then((productData) => {
//         setProduct(productData);
//         setTitle(productData.title);
//         setPrice(productData.price);
//         setCategory(productData.category);
//         setDescription(productData.description);
//         setImage(productData.image);
//       })
//       .catch((error) => console.log(error));
//   }, [productId]);

//   const editProduct = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(
//         `http://localhost:9000/products/${product.id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             title: title,
//             description: description,
//             category: category,
//             price: price,
//             image: image,
//           }),
//         }
//       );

//       if (response.ok) {
//         // Product updated successfully
//         Swal.fire("Success", "Product updated!", "success");
//         console.log("Product updated:", product);
//         navigate("/products"); // Navigate to '/products' page
//       } else {
//         // Handle the error
//         Swal.fire("Error", "Error updating product", "error");
//         console.log("Error updating product:", response.statusText);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleImageDrop = (acceptedFiles) => {
//     // Update the image state with the dropped file
//     setImage(acceptedFiles[0]);
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop: handleImageDrop,
//   });

//   return (
//     <>
//       <h1>Edit Product</h1>
//       <form onSubmit={editProduct}>
//         <div className="mb-3">
//           <label htmlFor="title" className="form-label">
//             Title
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="price" className="form-label">
//             Price
//           </label>
//           <input
//             type="number"
//             className="form-control"
//             id="price"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="category" className="form-label">
//             Category
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="category"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="description" className="form-label">
//             Description
//           </label>
//           <textarea
//             className="form-control"
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="image" className="form-label">
//             Image
//           </label>
//           <div
//             {...getRootProps()}
//             className={`dropzone ${isDragActive ? "active" : ""}`}
//           >
//             <input {...getInputProps()} />
//             <p>Drag and drop an image or click to select a file</p>
//           </div>
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Save Changes
//         </button>
//       </form>
//     </>
//   );
// };
// export default EditProduct;
/*******second solution***** */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDropzone } from "react-dropzone";
import ProductForm from "./ProductForm"; // Assuming you create a separate component for the form

const EditProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:9000/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setTitle(data.title);
        setPrice(data.price);
        setCategory(data.category);
        setDescription(data.description);
        setImage(data.image);
      })
      .catch((error) => console.log(error));
  }, [productId]);

  const editProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:9000/products/${product.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            category,
            price,
            image,
          }),
        }
      );

      if (response.ok) {
        // Product updated successfully
        Swal.fire("Success", "Product updated!", "success");
        console.log("Product updated:", product);
        navigate("/products"); // Navigate to '/products' page
      } else {
        // Handle the error
        throw new Error("Error updating product");
      }
    } catch (err) {
      Swal.fire("Error", "Error updating product", "error");
      console.log("Error updating product:", err.message);
    }
  };

  const handleImageDrop = (acceptedFiles) => {
    // Update the image state with the dropped file
    setImage(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleImageDrop,
  });

  const handleChange = (field) => (e) => {
    // Generic handleChange function to update form fields
    const value = e.target.value;
    switch (field) {
      case "title":
        setTitle(value);
        break;
      case "price":
        // Validate if value is a positive number
        const parsedValue = parseFloat(value);
        if (!isNaN(parsedValue) && parsedValue >= 0) {
          setPrice(parsedValue);
        }
        break;
      case "category":
        setCategory(value);
        break;
      case "description":
        setDescription(value);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <h1>Edit Product</h1>
      <form onSubmit={editProduct}>
        <ProductForm
          title={title}
          price={price}
          category={category}
          description={description}
          handleChange={handleChange}
        />

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <div
            {...getRootProps()}
            className={`dropzone ${isDragActive ? "active" : ""}`}
          >
            <input {...getInputProps()} />
            <p>Drag and drop an image or click to select a file</p>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          {" "}
          Save Changes
        </button>
      </form>
    </>
  );
};
export default EditProduct;
