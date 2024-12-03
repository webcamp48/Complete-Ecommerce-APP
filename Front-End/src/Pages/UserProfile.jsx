import React, { useEffect, useState } from 'react';
import { FaRegEdit, FaRegUser, FaPhoneSquareAlt } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa6";
import './Styles/UserProfile.css';
import Loader from '../Components/ReuseableComponent/Loader';
import CustomButton from '../Components/ReuseableComponent/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../Store/features/AuthSlice/LoginSlice';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile, updateUserProfile } from './../Store/features/UserProfileSlice/UserProfileSlice';
import getInitials from './../utils/ExtractName';
const UserProfile = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.login.userId);
  const { profileData, status } = useSelector((state) => state.profile);

  const API_URL_IMAGE_UPLOAD = "http://localhost:3002/images/userProfiles";
  const [imagePreview, setImagePreview] = useState(null);
  const [activeTab, setActiveTab] = useState('User-Profile');
  const [newHobby, setNewHobby] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    hobbies: [],
  });

// fetch data base on userId
  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProfile({ userId }));
    }
  }, [dispatch, userId]);


  // for update user profile
  useEffect(() => {
    if (status === "succeeded" && profileData) {
      setFormData({
        fullName: profileData.fullName || "",
        email: profileData.email || "",
        phone: profileData.phone || "",
        address: profileData.address || "",
        hobbies: profileData.hobbies || [],
      });
      setImagePreview(null);
    }
  }, [profileData, status]); 


  // handleInputChange
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // addHobby
  const addHobby = () => {
    if (newHobby.trim() !== "") {
      setFormData((prevData) => ({
        ...prevData,
        hobbies: [...prevData.hobbies, newHobby.trim()],
      }));
      setNewHobby("");
    }
  };

  // removeHobby
  const removeHobby = (indexToRemove) => {
    setFormData((prevData) => ({
      ...prevData,
      hobbies: prevData.hobbies.filter((_, index) => index !== indexToRemove),
    }));
  };

  // profileSubmitHandler
  const profileSubmitHandler = (event) => {
    event.preventDefault();
    const formDataToSend = new FormData();
  
    if (imagePreview)  formDataToSend.append('profileImage', imagePreview);
    for (let key in formData) {
      if (key === 'hobbies') {
        formData[key].forEach((hobby, index) => {
          formDataToSend.append(`hobbies[${index}]`, hobby);
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }
    dispatch(updateUserProfile({userId, formData : formDataToSend}))
  };

    // handleLogout 
    const handleLogout = () => {
      dispatch(logoutUser());
      navigate('/loginSignup');
  }


  return (
    <section className="UserProfileAndOrders">

      <div className="userProfile_left_container">
          <div className="user-profile-info">
            <label htmlFor="profile-img">
            {profileData?.profileImage ? (
              <img 
                src={imagePreview ? URL.createObjectURL(imagePreview) : `${API_URL_IMAGE_UPLOAD}/${profileData.profileImage}`} 
                alt={formData.fullName} 
              />
              ) : (
                <div className="avatar-fallback">
                  {getInitials(formData.fullName)}
                </div>
              )}
            </label>
            <input type="file" name="profileImage" id="profile-img" onChange={(e) => setImagePreview(e.target.files[0])} />
          </div>
          <h2>{formData.fullName}</h2>
          <ul className="user-profile-orders-list">
            <li className={activeTab === 'User-Profile' ? 'active' : ""} onClick={()=> setActiveTab('User-Profile')}>Profile</li>
            <li className={activeTab === 'Logout' ? 'active' : ""} onClick={()=> {setActiveTab("Logout"); handleLogout();}}>Logout</li>
          </ul>
      </div>

      <div className="user-profile-right">
        <div className="user-profile-right-top">
          <h2>User Profile Information</h2>
          {status === "loading" ? (
            <Loader size={100}/> 
          ) : (
            <form onSubmit={profileSubmitHandler}>
              <div className="user-profile-input">
                <label>First Name:</label>
                <div className="user-input">
                  <FaRegUser />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    name='fullName'
                    placeholder='Full Name'
                    required
                  />
                  <FaRegEdit />
                </div>
              </div>
              <div className="user-profile-input">
                <label>Email:</label>
                <div className="user-input">
                  <MdMarkEmailRead />
                  <input
                    type="email"
                    value={formData.email}
                    readOnly
                    name='email'
                    placeholder='Email'
                  />
                  <FaRegEdit />
                </div>
              </div>
              <div className="user-profile-input">
                <label>Mobile Number:</label>
                <div className="user-input">
                  <FaPhoneSquareAlt />
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={handleInputChange}
                    name='phone'
                    placeholder='Mobile Number'
                  />
                  <FaRegEdit />
                </div>
              </div>
              <div className="user-profile-input">
                <label>Address Information</label>
                <div className="user-input">
                  <FaAddressCard />
                  <textarea
                    value={formData.address}
                    onChange={handleInputChange}
                    name="address"
                    placeholder='Your Address'
                  ></textarea>
                  <FaRegEdit />
                </div>
              </div>
              <CustomButton type='submit' text={'Update Profile'} />
            </form>
          )}
        </div>
        <div className="user-profile-right-center">
          <h3>User Hobbies & Interests</h3>
          <div className="hobbies-input-save">
            <input
              type="text"
              placeholder='Add a new hobby...'
              value={newHobby}
              onChange={(e) => setNewHobby(e.target.value)}
            />
            <CustomButton text='Add' onClick={addHobby} />
          </div>
          <div className="hobbies-container">
            {formData.hobbies.map((hobby, index) => (
              <div key={index} className="hobby">
                <span>{hobby}</span>
                <button className="close-btn" onClick={() => removeHobby(index)}>&times;</button>
              </div>
            ))}
          </div>
        </div>
        <div className="user-profile-right-bottom">
          <h3>Works Most With...</h3>
          <div className="user-profile-right-bottom-images">
            <div className="image-work">
              <img src="https://via.placeholder.com/150" alt="image" />
              <p>John Doe</p>
            </div>
            <div className="image-work">
              <img src="https://via.placeholder.com/150" alt="image" />
              <p>John Doe</p>
            </div>
            <div className="image-work">
              <img src="https://via.placeholder.com/150" alt="image" />
              <p>John Doe</p>
            </div>
            <div className="image-work">
              <img src="https://via.placeholder.com/150" alt="image" />
              <p>John Doe</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default UserProfile;
