import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser,FaPhoneSquareAlt  } from 'react-icons/fa';
import './LoginSignUp.css';
import Checkboxes from '../../Components/ReuseableComponent/CheckBox';
import CustomButton from './../../Components/ReuseableComponent/CustomButton';
import { Google } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../Store/features/AuthSlice/SignUpSlice';
import { loginUser } from '../../Store/features/AuthSlice/LoginSlice';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { store } from './../../Store/Store';

const LoginSignUp = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loginSignUp, setLoginSignup] = useState("Sign Up");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    

    const initialFormValue = {
        fullName : "",
        email : "",
        phone : "",
        password : "",
        confirmPassword : "",
    }
    const [formData, setFormData] = useState(initialFormValue);

    // inputChangeHandler
    const inputChangeHandler = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
        setErrors({
            ...errors,
            [name]: null
        })
    }

    // validateForm
    const validateForm = () => {
        let errors = {};

        const fullNameRegex = /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        const mobileNumberRegex = /^(\+?\d{1,4}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?[\d\s]{7,14}$/;


        if(loginSignUp === 'Sign Up' && !formData.fullName){
            errors.fullName = "fullName is required";
        }else if(loginSignUp === 'Sign Up' && !fullNameRegex.test(formData.fullName)){
            errors.fullName = 'fullName must contain only Letter';
        }

        if(!formData.email){
            errors.email = "Email is required";
        }
        else if(!emailRegex.test(formData.email)){
            errors.email = 'Email must contain only Letter and Number and @ and .';
        }
        if(loginSignUp === 'Sign Up' && !formData.phone){
            errors.phone = "Phone is required";
        }else if (loginSignUp === 'Sign Up' && !mobileNumberRegex.test(formData.phone)){
            errors.phone = 'Please enter a valid mobile number. It should be between 7 to 10 digits and may include a country code.';
        }

        if(!formData.password){
            errors.password = "Password is required";
        }
        else if (loginSignUp === 'Sign Up' && !passwordRegex.test(formData.password)){
            errors.password = 'Password must contain at least 6 characters, one uppercase letter, one lowercase letter, one digit and one special character.';
        }
        if(loginSignUp === 'Sign Up' && !formData.confirmPassword){
            errors.confirmPassword = "Confirm Password is required";
        }
        else if(loginSignUp === 'Sign Up' && formData.password !== formData.confirmPassword){
            errors.confirmPassword = 'Password and Confirm Password must be same';
        }

        return errors;
    }

    // toggleForm
    const toggleForm = () => {
        setLoginSignup(loginSignUp === 'Sign Up' ? "Login" : "Sign Up")
    }

    // signUpHandler
    const signUpHandler = async() => {
        try {
            dispatch(signupUser(formData));
            setFormData(initialFormValue);
            navigate("/otp-verification", {state : {from : "signup"}});
            setErrors({});
        } catch (error) {
            console.error('Signup failed:', error);
        }
    }

    // loginHandler
    const loginHandler = async() => {
        try {
            await dispatch(loginUser(formData));

            const statusLogin = store.getState().login.status;

            if (statusLogin === 'succeeded') {
                navigate("/otp-verification", { state: { from: "login" } });
            }
            setFormData(initialFormValue);
        } catch (error) {
            console.log(error);
        }

    }

    // submit form hanlder
    const submitFormHandler = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if(Object.keys(formErrors).length === 0){
            if(loginSignUp === 'Sign Up'){
                signUpHandler()
            }else{
                loginHandler()
            }
        }else{
            setErrors(formErrors);
        }
    }

  return (


    <section className='login__signup_section'>
        <h2>{loginSignUp} Account</h2>
        <div className='login__Signup'>
            <form onSubmit={submitFormHandler} className='login-signup-left'>
                <h2>{loginSignUp} Account</h2>

                {loginSignUp === 'Sign Up' && (
                    <div className="input-group">
                        <FaUser className='input-icon'/>
                        <input type="text" value={formData.fullName} onChange={inputChangeHandler} name='fullName' placeholder='Enter Your Full Name'/>
                    </div>
                )}
                {errors.fullName && (<span className='error'>{errors.fullName}</span>)}
                <div className="input-group">
                    <FaEnvelope className='input-icon'/>
                    <input type="email" value={formData.email} onChange={inputChangeHandler} name='email' placeholder='Enter Your Valid Email'/>
                </div>
                {errors.email && (<span className='error'>{errors.email}</span>)}

                {loginSignUp === 'Sign Up' && (
                <div className="input-group">
                    <FaPhoneSquareAlt  className='input-icon'/>
                    <input type="text" value={formData.phone} onChange={inputChangeHandler} name='phone' placeholder='Enter Your Valid Mobile'/>
                </div>
                )}
                {errors.phone && (<span className='error'>{errors.phone}</span>)}

                <div className="input-group">
                    <FaLock className='input-icon'/>
                    <input type={showPassword ? "text" : "password"} value={formData.password} onChange={inputChangeHandler} name='password' placeholder='Enter Your Password'/>
                    <span className='password-toggle'
                     onClick={()=> setShowPassword (prev => !prev)}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                {errors.password && (<span className='error'>{errors.password}</span>)}

                {loginSignUp === 'Sign Up' && (
                    <div className="input-group">
                        <FaLock className='input-icon'/>
                        <input type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword} onChange={inputChangeHandler} name='confirmPassword' placeholder='Enter Your Confirm Password'/>
                        <span className='password-toggle'
                        onClick={()=> setShowConfirmPassword(prev => !prev)}>
                            {showConfirmPassword ? (<FaEyeSlash />) : (<FaEye />)}
                        </span>
                    </div>
                )}
                {errors.confirmPassword && (<span className='error'>{errors.confirmPassword}</span>)}


                {loginSignUp === 'Login' ? (
                    <div className='forgetPassword-rememberMe flex'>
                        <div className="rememberMe-main input-checkbox">
                            <Checkboxes text={'Remember Me'} />
                        </div>
                        <Link to={'/reset'}> <span className='forget-password'>Forget Password ?</span></Link>
                    </div>
                )
                : null
                }

                {loginSignUp === 'Sign Up' ? (                
                    <div className="input-checkbox color-main">
                        <Checkboxes text={'I agree to the terms and conditions'}/>
                    </div>) : null
                }

                <CustomButton type='submit' text={loginSignUp} width={"100%"} />
                
                {
                    loginSignUp === 'Sign Up' ? (
                    <p onClick={toggleForm} className='already-account'>Already have an account ? 
                    <Link to='/loginSignup?login=login'> Login</Link>
                    </p>
                    ):( 
                    <p onClick={toggleForm} className='already-account'>Creat an account ? 
                    <Link to='/loginSignup?signup=signup'> Click  Here</Link>
                    
                     </p>
                     )
                }

                <div className="or-divider">
                    <hr className='line'/>
                    <span className='or-text'>OR</span>
                    <hr className='line'/>
                </div>
                <CustomButton startIcon={<Google />} variant="outlined" text={'Sign Up With Google'} width={'100%'}/>
            </form>
            <div className="login-signup-right">
                <div className={ loginSignUp === 'Sign Up'? 'signup-img' : "login-img"}></div>
            </div>
        </div>
    </section>

  )
}

export default LoginSignUp;