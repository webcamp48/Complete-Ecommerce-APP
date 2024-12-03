import React, { useState } from "react";
import "./Styles/Checkout.css";
import CustomButton from "../Components/ReuseableComponent/CustomButton";
import cod from "../assets/Images/cod.png";
import paypal from "../assets/Images/paypal.png";
import debit_card from "../assets/Images/debit_card.png";
import { useDispatch, useSelector } from "react-redux";
import { createUserOrder } from "../Store/features/Order/OrderSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Checkout = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const subtotal = location.state?.subtotal || 0;
    const [formData, setFormData] = useState({
        firstName : "",
        lastName : "",
        mobile : "",
        postalCode : "",
        city : "",
        country : "",
        address : "",
    });
    const [paymentMethod, setPaymentMethod] = useState("");

    const dispatch = useDispatch();
    const userId = useSelector((state)=> state.login.userId);
    const shippingAmount = 10;
    const totalAmount = subtotal + shippingAmount; 


    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name] : value});
    }

  // handleCardClick
  const handleCardClick = (event) => {
    const radioInput = event.currentTarget.querySelector('input[type="radio"]');
    if (radioInput) {
        if (radioInput) {
            setPaymentMethod(radioInput.value);
          }
    }
  };

  //   submit order data and payement stripe
  const handleSubmit = async (e) => {
    e.preventDefault();

    const shippingAddress = formData;

    if (!paymentMethod) {
      toast.info('Please select a payment method');
      return;
    }
  

    if (paymentMethod === 'stripe') {
        const sessionUrl = await dispatch(createUserOrder(userId, shippingAddress, paymentMethod, totalAmount));
        
        if (sessionUrl) {
          window.location.replace(sessionUrl); // Redirect to Stripe page
        }else{
          toast.error("Error creating order, Payment via Stripe failed.");
          navigate("/");
        }
    } else {
        dispatch(createUserOrder(userId, shippingAddress, paymentMethod, totalAmount));
        navigate("/order");
    }

};

  return (
    <section className="checkout">
      <h1 className="checkout-title-main">Billing & Payement Information</h1>
        <form onSubmit={handleSubmit} className="checkout__container">
          <div className="checkout__left_information">
            <div className="checkout__left">
            <h2 className="delivery-info">Delivery</h2>
              <div className="input-group-container">
                <div className="input-group">
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" required
                  />
                </div>
                <div className="input-group">
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" required
                  />
                </div>
              </div>
              <div className="input-group-container">
                <div className="input-group">
                  <input type="number" name="mobile" value={formData.mobile} onChange={handleInputChange} placeholder="Mobile Number" required
                  />
                </div>
                <div className="input-group">
                  <input type="number" name="postalCode" value={formData.postalCode} onChange={handleInputChange} placeholder="postal Code" required
                  />
                </div>
              </div>
              <div className="input-group">
                <select name="city" id="" value={formData.city} onChange={handleInputChange} required>
                  <option value="">Select City</option>
                  <option value="delhi">Delhi</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="chennai">Chennai</option>
                </select>
              </div>
              <div className="input-group" value={formData.country} onChange={handleInputChange} required>
                <select name="country" id="">
                  <option value="">Select Country</option>
                  <option value="pakistan">Pakistan</option>
                  <option value="india">India</option>
                </select>
              </div>
              <div className="input-group">
                <textarea value={formData.address} onChange={handleInputChange}  name="address" rows={7} id="" placeholder="Address"
                ></textarea>
              </div>
            </div>

            {/* payement */}
            <div className="checkout__left_payement">
              <h2 className="payement-title">Payment Method</h2>
              <div
                className="input-group payement-card-main"
                onClick={handleCardClick}
              >
                <div className="payement-card">
                  <input type="radio" id="cash" name="payment" value="cash"
                    required
                  />
                  <label for="cash">Cash on Delivery (COD) </label>
                </div>
                <img src={cod} alt="" />
              </div>
              <div
                className="input-group payement-card-main"
                onClick={handleCardClick}
              >
                <div className="payement-card">
                  <input type="radio" id="stripe" name="payment" value="stripe" required
                  />
                  <label for="stripe">Stripe Payement</label>
                </div>
                <img src={debit_card} alt="" />
              </div>
              <div
                className="input-group  payement-card-main"
                onClick={handleCardClick}
              >
                <div className="payement-card">
                  <input type="radio" id="paypal" name="payment" value="paypal" required
                  />
                  <label for="paypal">Paypal</label>
                </div>
                <img src={paypal} alt="" />
              </div>
            </div>
            <CustomButton type="submit" text={"Complete Order"} width={"100%"}
            />
          </div>
          <div className="checkout__right">
            <h2 className="color-main">Order Summary</h2>
            <div className="checkout__right-top">
              <h3>cart item</h3>
            </div>
            <div className="checkout__right-bottom">
              <div className="input-group flex">
                <input type="text" placeholder="Promo Code" />
                <CustomButton text={"Apply"} size="medium" />
              </div>
              <div className="flex space">
                <h5>Subtotal</h5>
                <p className="color-main">${subtotal}.00</p>
              </div>
              <div className="flex space">
                <h5>Shipping Fee</h5>
                <p className="color-main">${shippingAmount}.00</p>
              </div>
              <div className="flex space">
                <h2>Total</h2>
                <strong className="color-main">${totalAmount}.00</strong>
              </div>
            </div>
          </div>
        </form>
    </section>
  );
};

export default Checkout;
