import React, { useEffect, useRef, useState } from 'react';
import CustomButton from '../ReuseableComponent/CustomButton';
import CartButton from '../ReuseableComponent/CartButton';
import './Navbar.css';
import SearchBar from '../ReuseableComponent/SearchBar';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../Store/features/AuthSlice/LoginSlice';
import logo from '/logo.png';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import getInitials from '../../utils/ExtractName';
import { fetchUserProfile } from '../../Store/features/UserProfileSlice/UserProfileSlice';

const Navbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems); 
  const token = useSelector((state)=> state.login.token);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const dropdownRef = useRef(null);

  const userId = useSelector((state) => state.login.userId);
  const { profileData } = useSelector((state) => state.profile);
  const API_URL_IMAGE_UPLOAD = "http://localhost:3002/images/userProfiles";
  const [imagePreview, setImagePreview] = useState(null);
  
  // fetch data base on userId for show user image and name
  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProfile({ userId }));
    }
  }, [dispatch, userId]);

  // Close dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsMenuVisible(false);
    }
  };

  // Add event listener to close dropdown when clicking outside
  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  // handleLogout 
  const handleLogout = () => {
      dispatch(logoutUser());
      navigate('/loginSignup');
  }

  return (
    <nav className='navbar flex'>
      <div className="navbar-left">
        <Link to={'/'}><img  src={logo} alt="" className='logo' /></Link>
      </div>
      <div className="navbar-center">
        <SearchBar />
      </div>
      <div className="navbar-right">
        <div className="navbar-cart">
          <Link to={'/cart'}><CartButton itemCount={cartItems?.length || 0} /></Link>
        </div>
        <div className="loginSignup">
        {token ? (
        <CustomButton text={'Logout'} onClick={handleLogout} />) : (
          <Link to={'/loginSignup'}><CustomButton text={'Sign Up'} /></Link>)}
        </div>
        <div className="navbar-user-profile" ref={dropdownRef} >

          <div className='navbar-user-profile' onClick={()=> setIsMenuVisible(!isMenuVisible)}>
          {profileData?.profileImage ? (
              <img src={imagePreview ? URL.createObjectURL(imagePreview) : `${API_URL_IMAGE_UPLOAD}/${profileData.profileImage}`}/>
              ) : (
                <div className="avatar-fallback" style={{width:"50px",height:"50px",fontSize:"1.2rem",cursor:"pointer"}}>
                  {getInitials(profileData?.fullName)}
                </div>
            )}
          </div>
          {isMenuVisible && <DropdownMenu setIsMenuVisible = {setIsMenuVisible}/>}
        </div>
      </div>
    </nav>

  )
}

export default Navbar