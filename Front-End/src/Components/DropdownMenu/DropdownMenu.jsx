import React, { useState, useEffect } from 'react';
import { IoMdSettings } from "react-icons/io";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { MdLocalShipping  } from 'react-icons/md'; 
import { FaToggleOn, FaToggleOff , FaInfoCircle, FaBug   } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import { Link } from 'react-router-dom';
import './DropdownMenu.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../Store/features/UserProfileSlice/UserProfileSlice';
import getInitials from '../../utils/ExtractName';


const DropdownMenu = ({setIsMenuVisible}) => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.login.userId);
    const { profileData } = useSelector((state) => state.profile);
    const [isToggle, setIsToggle] = useState(false);
    const API_URL_IMAGE_UPLOAD = `${import.meta.env.VITE_BACKEND_URL}/images/userProfiles`;
    const [imagePreview, setImagePreview] = useState(null);
    
  // fetch data base on userId for show user image and name
  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProfile({ userId }));
    }
  }, [dispatch, userId]);


//   toggleDarkMode
    const toggleDarkMode  = () => {
        setIsToggle(!isToggle);
        document.body.classList.toggle('dark-mode');
    }

  return (
    <div className='dropDownMenu'>
        <div className="dropDownMenu-top">
            {profileData?.profileImage ? (
              <img src={imagePreview ? URL.createObjectURL(imagePreview) : `${API_URL_IMAGE_UPLOAD}/${profileData.profileImage}`}/>
              ) : (
                <div className="avatar-fallback" style={{width : "50px", height : "50px", fontSize : "1.2rem"}}>
                  {getInitials(profileData?.fullName)}
                </div>
            )}
            <h2>{profileData?.fullName}</h2>
            <IoCloseCircle onClick={()=> setIsMenuVisible(false)}/>
        </div>
        <hr />
        <div className="dropDownMenu-center">
            <ul className="dropDownMenucenter-lists">
                <li><Link to={"/profile"}> <IoMdSettings /> My Account</Link></li>
                <li><Link to={"/order"}> <MdLocalShipping  /> My Order</Link></li>
                <li><Link> <BsFillMoonStarsFill /> Dark Mode </Link> <span onClick={toggleDarkMode}>{isToggle ? <FaToggleOn /> : <FaToggleOff  />}</span></li>
                <li><Link> <FaInfoCircle  /> About </Link></li>
                <li><Link> <FaBug  /> Report Bug</Link></li>
            </ul>
        </div>
        <hr />
        <div className="dropDownMenu-bottom">
            <div className="dropDownMenu-bottom-logo">
                <img src="logo.png" alt="Logo"/>
                <span>Software Pro v1.0.1</span>
            </div>
        </div>
    </div>
  )
}

export default DropdownMenu