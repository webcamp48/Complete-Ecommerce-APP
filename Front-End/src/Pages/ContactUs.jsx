import react, { useState } from 'react';
import { HiMapPin } from "react-icons/hi2";
import { MdMarkEmailRead, MdCall , MdWhatsapp  } from "react-icons/md";
import './Styles/ContactUs.css';
import CustomButton from './../Components/ReuseableComponent/CustomButton';
import axios from 'axios';
import { toast } from 'react-toastify';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        firstName : "",
        lastName : "",
        email : "",
        phone : "",
        message : "",
    });

    const inputChnageHandler = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name] : value});
    }

    // submitHandler
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3002/api/contact/userContactUs", formData)

            toast.success(response.data.message);
            setFormData({
                firstName : "",
                lastName : "",
                email : "",
                phone : "",
                message : "",
            });

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    
    return (
        <section className="contact-us">
            <h2>Contact <span>Us</span></h2>
            <div className="social-contact">
                <div className="contact-box">
                    <HiMapPin />
                    <h4>Our Address</h4>
                    <p>Lahore, Pakistan</p>
                </div>
                <div className="contact-box">
                    <MdMarkEmailRead />
                    <h4>Our Email</h4>
                    <p>admin@gmail.com</p>
                </div>
                <div className="contact-box">
                    <MdCall />
                    <h4>Call Us</h4>
                    <p>021-343-3242</p>
                </div>
                <div className="contact-box">
                    <MdWhatsapp />
                    <h4>Whatsapp</h4>
                    <p>021-343-3242</p>
                </div>
            </div>
            <div className="contact-form">
                <h2>Contact <span>Me</span></h2>
                <form onSubmit={submitHandler}>
                    <div className="input-group-container">
                        <div className="input-group">
                            <input type="text" name='firstName' value={formData.firstName} onChange={inputChnageHandler} placeholder="First Name" />
                        </div>
                        <div className="input-group">
                            <input type="text" name='lastName'  value={formData.lastName} onChange={inputChnageHandler} placeholder="Last Name" />
                        </div>
                    </div>

                    <div className="input-group-container">
                        <div className="input-group">
                            <input type="text" name='email'  value={formData.email} onChange={inputChnageHandler} placeholder="Email Address" />
                        </div>
                        <div className="input-group">
                            <input type="text" name='phone'  value={formData.phone} onChange={inputChnageHandler} placeholder="Mobile No" />
                        </div>
                    </div>

                    <div className="input-group">
                        <textarea  rows={7}  name='message'  value={formData.message} onChange={inputChnageHandler} placeholder='Your Message'></textarea>
                    </div>
                    <CustomButton type='submit' text={'Send Message'} />
                </form>
            </div>
        </section>
    )
}

export default ContactUs