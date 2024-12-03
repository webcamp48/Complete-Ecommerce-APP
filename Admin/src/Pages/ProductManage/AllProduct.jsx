import React, { useEffect } from 'react';
import './Styles/AllProduct.css';
import CustomButton from './../../Components/ReuseableComponent/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../Redux/Slice/FetchProductSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from './../../Components/ReuseableComponent/Loader';
import { Link } from 'react-router-dom';

const AllProduct = () => {
  const API_URL = `http://localhost:3002`;


  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items || []);
  const productStatus = useSelector((state) => state.products.status);
  const productError = useSelector((state) => state.products.error);
  
  // fetch Product Data
  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);


  // delete product
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/api/product/removeProduct`, {data: { id }});
      toast.success(response.data.message);
      dispatch(fetchProducts());
    } catch (error) {
      console.log("error", error);
      if (!error.response) {
        toast.error('Unable to connect to the server. Please try again later.');
      } else {
        toast.error(error.response.data.message || 'An error occurred.');
      }
    }
  }



  return (
    <section className="allProduct">
      <div className="allProduct-top-heading">
        <h2>All Products</h2>
        <Link to={'/addProduct'}><CustomButton text={'Add Product'} /></Link>
      </div>
      <div className="allProduct-bottom-content">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Product Image</th>
              <th>Product Details</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {productStatus === 'loading' && (
              <tr><td colSpan='6'><Loader /></td></tr>
            )}
            {productStatus === 'succeeded' && products.length === 0 && (
              <tr>
                <td colSpan="6" className='nofound'>No products available. Please check back later!</td>
              </tr>
            )}
            {productStatus === 'succeeded' && products.length > 0 && (
              products.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td width={"80px"}>
                    <img src={`${API_URL}/images/products/${product.image}`} alt={product.title} />
                  </td>
                  <td>{product.title}, {product.size}, {product.color}</td>
                  <td>${product.new_price}.00</td>
                  <td>{product.category}</td>
                  <td>
                    <Link to={`/updateProduct/${product._id}`}><button className="btn edit">Edit</button></Link>
                    
                    <button onClick={() => handleDelete(product._id)} className='btn delete'>Delete</button>
                  </td>
                </tr>
              ))
            )}
            {productStatus === 'failed' && (
              <tr>
                <td className="error" colSpan="6">{productError}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default AllProduct;
