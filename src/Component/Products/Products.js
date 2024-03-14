import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import "./Products.css";
import { Link } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import MetaData from "../Layout/MetaData";


const Products = () => {
  // Retrieve products data from local storage on component mount
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products"));
    if (savedProducts) {
      setProducts(savedProducts);
    }
  }, []);

  const [products, setProducts] = useState([
    // Default product data to show
    {
      id: "1",
      name: "Product 1",
      category: "Category 1",
      quantity: 10,
      price: 20,
    },
    {
      id: "2",
      name: "Product 2",
      category: "Category 2",
      quantity: 20,
      price: 30,
    },
    {
      id: "3",
      name: "Product 3",
      category: "Category 3",
      quantity: 30,
      price: 40,
    },
  ]);
  const [productName, setProductName] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [open, setOpen] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleProductStockChange = (event) => {
    setProductStock(event.target.value);
  };

  const handleProductCategoryChange = (event) => {
    setProductCategory(event.target.value);
  };

  const handleProductPriceChange = (event) => {
    setProductPrice(event.target.value);
  };

  const generateId = () => {
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  const addProduct = () => {
    const newProduct = {
      id: generateId(),
      name: productName,
      category: productCategory,
      price: productPrice,
      quantity: productStock,
    };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    updateLocalStorage(updatedProducts);
    clearInputs();
  };

  const deleteProduct = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(updatedProducts);
    updateLocalStorage(updatedProducts);
  };

  const editProduct = (productId) => {
    const productToEdit = products.find((product) => product.id === productId);
    if (productToEdit) {
      setProductName(productToEdit.name);
      setProductStock(productToEdit.quantity);
      setProductCategory(productToEdit.category);
      setProductPrice(productToEdit.price);
      setEditProductId(productId);
      setOpen(true);
    }
  };

  const saveUpdateHandler = (e) => {
    e.preventDefault();
    const updatedProducts = products.map((product) =>
      product.id === editProductId
        ? {
            ...product,
            name: productName,
            category: productCategory,
            price: productPrice,
            quantity: productStock,
          }
        : product
    );
    setProducts(updatedProducts);
    updateLocalStorage(updatedProducts);
    setOpen(false);
    window.location.reload();
  };

  const clearInputs = () => {
    setProductName("");
    setProductStock("");
    setProductCategory("");
    setProductPrice("");
  };

  const updateLocalStorage = (products) => {
    localStorage.setItem("products", JSON.stringify(products));
  };

  const AddToggle = () => {
    setOpen(!open);
  };

  return (
    <>
    <MetaData title={`Products Management`} />
      <div className="products-management">
        <h2>Products Management</h2>

        <div className="top-navigation">
          <Link to="/">
            <button id="go-to-dashboard">Go to dashboard</button>
          </Link>
        </div>

        <div className="inputDiv">
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={handleProductNameChange}
          />
          <input
            type="text"
            placeholder="Product Category"
            value={productCategory}
            onChange={handleProductCategoryChange}
          />
          <input
            type="number"
            placeholder="Stock Quantity"
            value={productStock}
            onChange={handleProductStockChange}
          />
          <input
            type="number"
            placeholder="Price"
            value={productPrice}
            onChange={handleProductPriceChange}
          />
          <button onClick={addProduct}>Add Product</button>
        </div>

        <table id="tableSection">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Stock Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
                <td>
                  <button className="tableBtn" onClick={() => editProduct(product.id)}>Edit</button>
                  <button style={{ backgroundColor: "#FF0000" }} className="tableBtn" onClick={() => deleteProduct(product.id)}>
                    Delete
                  </button>
                  <button className="MediaScreen" onClick={() => editProduct(product.id)}><MdEdit /></button>
                  <button style={{ backgroundColor: "#FF0000" }} className="MediaScreen" onClick={() => deleteProduct(product.id)}>
                  <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Dialog
          aria-labelledby="Simple-dialog-title"
          open={open}
          onClose={AddToggle}
          className="dialogBox"
        >
          <form
            onSubmit={saveUpdateHandler}
            className="createForm"
            id="updateForm"
          >
            <DialogTitle>Edit Product Details</DialogTitle>
            <DialogContent className="submitDialogActions">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th className="table-header">Name</th>
                    <th className="table-header">Category</th>
                    <th className="table-header">Stock Quantity</th>
                    <th className="table-header">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input
                        type="text"
                        value={productName}
                        onChange={handleProductNameChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={productCategory}
                        onChange={handleProductCategoryChange}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={productStock}
                        onChange={handleProductStockChange}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={productPrice}
                        onChange={handleProductPriceChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </DialogContent>
            <DialogActions>
              <Button onClick={AddToggle} color="secondary">
                Close
              </Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </>
  );
};

export default Products;
