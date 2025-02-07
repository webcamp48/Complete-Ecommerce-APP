import React, { useEffect } from 'react';
import './Styles/Cart.css';
import cart_img from '../assets/Images/product_6.png';
import { BsCartCheckFill } from "react-icons/bs";
import { RxUpdate } from "react-icons/rx";
import { MdOutlineArrowBackIos } from "react-icons/md";
import DeleteIcon from '@mui/icons-material/Delete';
import CustomButton from '../Components/ReuseableComponent/CustomButton';
import Checkboxes from './../Components/ReuseableComponent/CheckBox';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, removeFromCart } from '../Store/features/CartSlice/CartSlice';
import Loader from './../Components/ReuseableComponent/Loader'

const Cart = () => {

    const API_URL_IMAGE = `${import.meta.env.VITE_BACKEND_URL}/images/products`;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {cartItems, status, error } = useSelector((state)=> state.cart);
    const userId = useSelector((state)=> state.login.userId);


    useEffect(()=>{
        if(userId){
            dispatch(fetchCart(userId));
        }
    },[dispatch, userId]);

    // calculate cart item Subtotal
    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.productId.new_price * item.quantity), 0)
    } 

    // handlerCheckout
    const handlerCheckout = ()=>{
        const state = { subtotal: calculateSubtotal() };
        navigate("/checkout", {state})
    }

    if(!cartItems){
        return <div className="nofound">Your cart is empty</div>
    }
    if(status === 'loading'){
        return <div><Loader /> </div>
    }
    if(status === 'failed'){
        return <div className="nofound">{error}</div>
    }

    // delete cart Item
    const handleDeleteCartItem = (productId) => {
    if (window.confirm('Are you sure you want to remove this item from the cart?')) {
        dispatch(removeFromCart({ userId, productId }))
            .then(() => {
                dispatch(fetchCart(userId));
            })
            .catch((error) => {
                console.error('Failed to remove item from cart:', error);
            });
    }
};
    



  return (
    <section className='cart'>
        <h1 className="cart-title-main"><BsCartCheckFill /> Your cart</h1>
        <div className="cart__container">
            <div className="cart__left">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.length === 0 ? (
                            <tr>
                                <td className='nofound' colSpan="6">No items in cart</td>
                            </tr>
                        ): (
                            cartItems.map((item, index) =>(
                                <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td className='cart-product-details'>
                                    <img src={`${API_URL_IMAGE}/${item.productId.image}`}  alt={item.productId.title} />
                                    <div className="cart-product-left-details">
                                        <span className='card-bottom-category span-heading'>{item.productId.category}</span>
                                        <h5 className='cart-title'>{item.productId.title}</h5>
                                        <div className="cart-color">
                                            <p>Color : <span className='color-main'>{item.color}</span></p>
                                        </div>
                                        <div className="cart-size">
                                            <p>Size : <span className='color-main'>{item.size}</span></p>
                                        </div>
                                    </div>
                                </td>
                                <td>${item.productId.new_price}.00</td>
                                <td>
                                <div className="qty-items">
                                    <button className='qty-item-btn size-btn'>-</button>
                                    <input  type="text" value={item.quantity} min={0} maxLength={3} readOnly/>
                                    <button className='qty-item-btn size-btn'>+</button>
                                </div>
                                </td>
                                <td>${item.productId.new_price * item.quantity}</td>
                                <th><CustomButton text={'Delete'} onClick={()=> handleDeleteCartItem(item.productId._id)} startIcon={<DeleteIcon />} color='error' /></th>
                            </tr>
                            ))
                        )}
                    </tbody>
                </table>
                <div className="cart-bottom-back-update flex">
                    <Link to={'/'}> <CustomButton size='small' startIcon={<MdOutlineArrowBackIos/>} text={"Countinue Shopping"} /></Link>
                    <CustomButton size='small' color='success' startIcon={<RxUpdate />} text={"update"} />
                </div>
            </div>

            <div className="cart__right">
                <div className="cart__right-bottom-checkout">
                    <div className='cart__right-bottom-note'>
                        <p>Add a note to your order</p>
                        <textarea name="" rows={7} id="" placeholder='Write a Note to Your Order...'></textarea>   
                    </div>    
                    <div className="cart__right-bottom-checkout-btn">
                        <div className="cart__right-bottom-subtotal flex">
                            <p>SubTotal </p>
                            <strong className='color-main'> ${calculateSubtotal()}</strong>
                        </div>
                        <div className="cart__right-bottom-subtotal flex">
                            <p>Shipping Fee </p>
                            <strong className='color-main'> $10.00</strong>
                        </div>
                        <p>Shipping & taxes calculated at checkout</p>
                        <Checkboxes text={'I agree with the terms and conditions'} />
                        <CustomButton onClick={handlerCheckout} text={'Checkout'} width={'100%'} />
                    </div>         
                </div>
            </div>
        </div>
    </section>
  )
}

export default Cart