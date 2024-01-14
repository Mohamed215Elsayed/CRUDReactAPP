import React, { useEffect, useState ,useRef } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
// import axios from 'axios';
const Products = () => {
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    try {
      const response = await fetch("http://localhost:9000/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  const deleteProduct = async (product) => {
    try {
      const result = await Swal.fire({
        title: `Are you sure you want to delete ${product.title}?`,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
        customClass: {
          actions: "my-actions",
          cancelButton: "order-1 right-gap",
          confirmButton: "order-2",
          denyButton: "order-3",
        },
      });

      if (result.isConfirmed) {
        const response = await fetch(
          `http://localhost:9000/products/${product.id}`,
          {
            method: "DELETE",
          }
        );
        const data = await response.json();
        console.log(data);
        await getAllProducts();
        Swal.fire("Deleted!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Deletion canceled", "", "info");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const tableRef = useRef(null);
  const scrollToTop = () => {
    tableRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const scrollToBottom = () => {
    tableRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  };


  return (
    <>
      <div className="container-fluid" style={{ overflowX: "hidden" }}>
        <div className="products-container">
          <h1 className="text-center mt-2">Products Page</h1>
          <Link to={`/products/add`} className="btn btn-success mt-2">
            Add New Product
          </Link>

          <div className="table-responsive" ref={tableRef}>
            <table className="table table-bordered table-striped mt-3">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Price</th>
                  <th scope="col">Operations</th>
                </tr>
              </thead>
              <tbody>
                {products !== undefined &&
                  products.map((product) => {
                    return (
                      <tr key={product.id}>
                        <th scope="row">{product.id}</th>
                        <td>{product.title}</td>
                        <td style={{ maxWidth: "100px" }}>
                          {product.description
                            ? product.description.slice(0, 20) + "..."
                            : ""}
                        </td>
                        <td>{product.price}</td>
                        <td>
                          <div className="operation-buttons">
                            <Link
                              to={`/products/${product.id}`}
                              className="btn btn-info btn-sm"
                            >
                              View
                            </Link>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => deleteProduct(product)}
                            >
                              Delete
                            </button>
                            <Link className="btn btn-primary btn-sm" to={`/products/${product.id}/edit`}>
                              Edit
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
              <tfoot>
                <tr>
                  <td
                    colSpan="5"
                    className="text-center table-footer table-dark"
                  >
                    This is the table footer.
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="scroll-buttons">
            <button className="scroll-buttonTop" onClick={scrollToTop}>
              ^
            </button>
            <button className="scroll-buttonBottom" onClick={scrollToBottom}>
              v
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Products;
