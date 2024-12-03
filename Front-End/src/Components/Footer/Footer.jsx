import React from 'react';
import './Footer.css'
import SocialMedia from '../SocialMedia/SocialMedia';
import visa from '../../assets/Images/visa.png';
import master from '../../assets/Images/master.png';
import cod from '../../assets/Images/cod.png';
import paypal from '../../assets/Images/paypal.png';
import { FaSquarePhone, FaLocationDot  } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import logo from '/logo.png';
import { Link } from 'react-router-dom';



const Footer = () => {
  return (
    <section className='footer'>
        <div className="footer-1">
        <div className="footer-left">
        <Link to={'/'}><img  src={logo} alt="" className='logo' /></Link>
      </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, obcaecati?</p>
            <div className="footer-1-payement-method flex">
                <img src={visa} alt="Payemant Methd Visa" />
                <img src={master} alt="Payemant Methd Master" />
                <img src={paypal} alt="Payemant Methd Paypal" />
                <img src={cod} alt="Payemant Methd Cash On Delivery" />

            </div>
        </div>
        <div className="footer-2">
            <h2>Category</h2>
            <ul className="footer-list">
                <li>Men</li>
                <li>Women</li>
                <li>Kid's</li>
                <li>Laptop</li>
            </ul>
        </div>
        <div className="footer-3">
            <h2>Information</h2>
            <ul className="footer-list">
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </div>
        <div className="footer-4">
            <h2>Contact Us</h2>
            <div className="contact-social">
                <ul className='footer-list'>
                    <li><FaLocationDot /> Lahore, Pakistan</li>
                    <li><FaSquarePhone /> Phone: 1234567890</li>
                    <li><MdEmail /> info@gmail.com</li>
                </ul>
            </div>
            <SocialMedia />
        </div>
    </section>
  )
}

export default Footer