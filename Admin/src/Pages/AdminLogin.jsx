import React, { useState } from 'react'
import CustomButton from './../Components/ReuseableComponent/CustomButton';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

import './Styles/AdminLogin.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogin } from '../Redux/features/AdminLogin/AdminSlice';

const AdminLogin = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.adminAuth);
    const [togglePassword, setTogglePassword] = useState(false);
    const [formData, setFormData] = useState({
        email : "",
        password : "",
    });

    const inputHandler = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    // togglePasswordVisibility
    const togglePasswordVisibility = ()=>{
        setTogglePassword(!togglePassword);
    }

    const submitHandler = async(e) => {
        e.preventDefault();
        dispatch(adminLogin(formData, navigate));
    }

  return (
    <form onSubmit={submitHandler} className="admin-login">
        <h2>Sign In</h2>
        <div className="input-group">
            <label>Email:</label>
            <div className="input-field">
                <FaEnvelope />
                <input type="email" name="email" onChange={inputHandler} placeholder="Enter your Email"/>
            </div>
        </div>
        <div className="input-group">
            <label>Password:</label>
            <div className="input-field">
                <FaLock />
                <input type={togglePassword ? "text" : "password"} name="password" onChange={inputHandler} placeholder="Enter your Password"/>
                <div className="toggle" onClick={togglePasswordVisibility}>
                    {togglePassword ? <FaEyeSlash /> : <FaEye />}
                </div>
            </div>
        </div>
        <CustomButton width={'100%'} text={'Sign In'} />
    </form>
  )
}

export default AdminLogin

