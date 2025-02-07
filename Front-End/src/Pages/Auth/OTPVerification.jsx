import React, { useState } from 'react';
import './OTPVerification.css';
import CustomButton from '../../Components/ReuseableComponent/CustomButton';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';

const OTPVerification = () => {
  const location = useLocation();
  const { from } = location.state || {};

  const navigate = useNavigate();

  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus on next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

//   onResendOTP
 const onResendOTP = () => {}


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        let apiUrl = '';

        if (from === 'login') {
          apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/auth/verifyEmailOTP`;
        }else if (from === 'reset') {
          apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/auth/verifyEmailOTP`;
        } else if (from === 'signup') {
          apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/auth/verifyMobileOTP`;

        }
        let otpValue = otp.join("");
        const response = await axios.post(apiUrl, {otp : otpValue});

        if(from === 'login'){
          navigate("/");
        }else if (from === 'signup'){
          navigate("/loginSignup");
        }else if (from === 'reset'){
          navigate("/loginSignup");
        }
        toast.success(response.data.message);
        otpValue = '';
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }

  };

  return (
    <div className="otp-container">
      <form onSubmit={handleSubmit}>
        <h3>Verify</h3>
        <p>Your code was sent to you via mobile Number</p>
        <div className="otp-inputs">
          {otp.map((data, index) => {
            return (
              <input
                className="otp-field"
                type="text"
                name="otp"
                maxLength="1"
                key={index}
                value={data}
                onChange={e => handleChange(e.target, index)}
                onFocus={e => e.target.select()}
              />
            );
          })}
        </div>
        <CustomButton text={'Verify'} type='submit'/>
        <p className="resend-text">Didn't receive code? <a href="#resend-otp" onClick={onResendOTP}>Request again</a></p>
      </form>
    </div>
  );
};

export default OTPVerification;
