import React, { useEffect } from "react";
import './Styles/UserOrderList.css';
import { MdOutlineLocalShipping } from 'react-icons/md'; 
import { useDispatch, useSelector } from "react-redux";
import Loader from './../Components/ReuseableComponent/Loader';
import { fetchUserOrder } from './../Store/features/Order/OrderSlice';

const UserOrderList = () => {

  const API_URL_Image = `${import.meta.env.VITE_BACKEND_URL}`;

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.login.userId);
  const { orders, status, error } = useSelector((state) => state.order);

  // Fetch user orders
  useEffect(() => {
    if (userId) {
      dispatch(fetchUserOrder({ userId }));
    }
  }, [dispatch, userId]);

  if (status === 'loading') {
    return <Loader />
  }
  if (status === 'error') {
    return <div className="nofound">{error}</div>
  }

  return (
    <div className="UserOrderList">
      <h2><MdOutlineLocalShipping size={38}/> Order Summery</h2>
      <table className="UserOrderList-table">
        <thead>
          <tr>
            <th>Order No</th>
            <th>Product Title</th>
            <th>Product Details</th>
            <th>Total Amount</th>
            <th>Payment Method</th>
            <th>Payment Status</th>
            <th>Order Status</th>
            <th>Order Date</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders.length > 0 ? (
            orders.map((order, index) => (
              <tr key={order._id}>
                <td data-label="Order No">{index + 1}</td>
                <td data-label="Product Title">
                  {order?.products?.map((product) => (
                    <div key={product.productId._id}>
                      ({product.productId.title})
                    </div>
                  ))}
                </td>
                <td data-label="Product Details">
                  {order.products?.map((product) => (
                    <div key={product._id}>
                      (Color: {product.color}), <br /> (Size: {product.size}), <br /> (Quantity: {product.quantity})
                      <img
                        style={{ width: '40px', height: '40px' }}
                        src={`${API_URL_Image}/images/products/${product.productId?.image}`}
                        alt={product.productId?.title || 'Product Image'}
                      />
                    </div>
                  ))}
                </td>
                <td data-label="Total Amount">
                  ${order?.totalAmount ? order.totalAmount.toFixed(2) : '.00'}
                </td>
                <td data-label="Payment Method">{order.paymentMethod}</td>
                <td data-label="Payment Status">{order.paymentStatus}</td>
                <td data-label="Order Status">{order.orderStatus}</td>
                <td data-label="Order Date">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="nofound">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserOrderList;
