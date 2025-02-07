import React, { useEffect } from 'react';
import './Styles/AllOrder.css';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './../../Components/ReuseableComponent/Loader';
import { deleteOrder, fetchAllOrders, updateOrderStatus, updatePaymentStatus } from '../../Redux/features/Order/OrderSlice';


const AllOrder = () => {

    const API_URL_Image = import.meta.env.VITE_BACKEND_URL;
    const dispatch = useDispatch();
    const {orders, status, error} = useSelector((state) => state.order);

    // fetch data from API
    useEffect(()=> {
        dispatch(fetchAllOrders())
    }, [dispatch])

 // Handle status change for order
    const handleOrderStatusChange = (orderId, newStatus) => {
        dispatch(updateOrderStatus(orderId, newStatus));        
    } 

     // Handle status change for payement
    const handlePaymentStatusChange = (orderId, newStatus) => {
        dispatch(updatePaymentStatus(orderId, newStatus))
    }

    // handle delete Order
    const handleDeleteOrder = (orderId) => {
        if(window.confirm("Are you sure you want to delete this order?")){
            dispatch(deleteOrder(orderId));
        }
    }

    //  change background base on status
  useEffect(() => {
    const handleChange = (e) => {
      const select = e.target;
      const value = select.value;

      select.style.backgroundColor = '#ffffff';
      select.style.color = '#333333';

      switch (value) {
        case 'pending':
          select.style.backgroundColor = '#ffeb3b'; // Yellow
          break;
        case 'success':
          select.style.backgroundColor = '#4caf50'; // Green
          select.style.color = '#ffffff';
          break;
          case 'shipped':
          select.style.backgroundColor = '#b37922'; 
          select.style.color = '#ffffff';
          break;
        case 'failed':
          select.style.backgroundColor = '#f44336'; // Red
          select.style.color = '#ffffff';
          break;
        case 'delivered':
          select.style.backgroundColor = '#2196f3'; // Blue
          select.style.color = '#ffffff';
          break;
        case 'canceled':
          select.style.backgroundColor = '#9e9e9e'; // Grey
          select.style.color = '#ffffff';
          break;
        default:
          select.style.backgroundColor = '#ffffff'; // Default
          select.style.color = '#333333';
          break;
      }
    };

    document.querySelectorAll('.allOrders-container select').forEach(select => {
      select.addEventListener('change', handleChange);
    });

    return () => {
      document.querySelectorAll('.allOrders-container select').forEach(select => {
        select.removeEventListener('change', handleChange);
      });
    };
  }, []);

  if(status === 'loading'){
    return <Loader size = {100}/>
  }
  if(status === 'failed'){
    return <div className='nofound'>{error}</div>
  }

  return (
    <section className='allOrders'>
      <table className='allOrders-container'>
        <thead>
          <tr>
            <th className='column-space-orderId'>Order ID</th>
            <th>Customer Name</th>
            <th>Product Name</th>
            <th>Address</th>
            <th>Total Amount</th>
            <th>Payment Method</th>
            <th>Order Date</th>
            <th>Order Status</th>
            <th>Payment Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {orders.length > 0 ? 
                orders.map((order) => (
                    <tr key={order._id} >
                        <td className='column-space-orderId'>{order._id}</td>
                        <td>{order.userId.fullName}</td>
                        <td className='column-space'>
                            {order.products.map((product, index) => (
                                <div key={index} className='column-space'>
                                    <img style={{width : '40px', height : "40px"}} src={`${API_URL_Image}/images/products/${product.productId?.image}`} alt={product.productId?.title} />
                                    {product.productId?.title} (Quantity: {product.quantity})
                                    (Size: {product.size}) (Color: {product.color})
                                </div>
                            ))}
                        </td>
                        <td className='column-space'>
                            City :{order.shippingAddress.city} <br />
                            Postal Code :{order.shippingAddress.postalCode} <br />
                            Country :{order.shippingAddress.country} <br />
                            Mobile No :{order.shippingAddress.mobile} <br />
                            Address :{order.shippingAddress.address}
                        </td>
                        <td>${order.totalAmount}.00</td>
                        <td>{order.paymentMethod}</td>
                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td>
                        <select defaultValue={order.orderStatus} onChange={(e)=> handleOrderStatusChange(order._id, e.target.value)}>
                            <option value="">Select Status</option>
                            <option value="pending">Pending</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="canceled">Canceled</option>
                        </select>
                        </td>
                        <td>
                        <select defaultValue={order.paymentStatus} onChange={(e)=> handlePaymentStatusChange(order._id, e.target.value)}>
                            <option value="">Select Status</option>
                            <option value="pending">Pending</option>
                            <option value="success">Success</option>
                            <option value="failed">Failed</option>
                        </select>
                        </td>
                        <td><button className='delete-order' onClick={()=> handleDeleteOrder(order._id)} >Delete Order</button></td>
                  </tr>
                )) 
                : <tr  className='nofound'><td colSpan={12} className='nofound'> No available orders currently</td></tr>
            }
        </tbody>
      </table>
    </section>
  );
}

export default AllOrder;
