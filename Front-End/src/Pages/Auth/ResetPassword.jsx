import React, { useState } from 'react'
import CustomButton from './../../Components/ReuseableComponent/CustomButton';
import './ResetPassword.css'
import axios from 'axios';
import { FaEye, FaEyeSlash  } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const ResetPassword = () => {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData , setFormData] = useState({
        email : '',
        password : '',
    });

    // inputHandlerChange
    const inputHandlerChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    // submitHandler
    const submitHandler = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3002/api/auth/resetPassword", formData);
            toast.success(response.data.message);
            navigate("/otp-verification", { state: { from: "reset" } });
            setFormData({
                email : '',
                password : '',
            });
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
  return (
    <section className="reset-password">
        <div className="resetPassword-container">
            <h1>Reset your password</h1>
            <p>Enter the email address associated with your account, and we will reset your password.</p>
            <form className='resetPassword-form' onSubmit={submitHandler}>
                <div className="input-group">
                    <label htmlFor="">Email</label>
                    <input type="email" name='email' value={formData.email} onChange={inputHandlerChange} placeholder='Email' />
                </div>
                <div className="input-group">
                    <label htmlFor="">New Password</label>
                    <input type={showPassword ? "text" : "password"} name='password' value={formData.password} onChange={inputHandlerChange} placeholder='New Password' />
                    <span className='password-toggle'
                     onClick={()=> setShowPassword (prev => !prev)}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <CustomButton text={'Countinue'} />
                <Link to={'/loginSignup'}> <span>Return to Login</span></Link>
            </form>
        </div>
    </section>
  )
}

export default ResetPassword
