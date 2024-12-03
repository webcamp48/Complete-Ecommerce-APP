import React, { useState } from 'react';
import { MdDashboard, MdCategory, MdShoppingCart, MdProductionQuantityLimits, MdPerson, MdSlideshow, MdRateReview, MdMessage, MdHelp, MdContactMail, MdSettings, MdLibraryBooks, MdPeople, MdGroup, MdLocalOffer, MdAnalytics, MdContentPaste, MdCampaign, MdSupportAgent,MdAdd,MdEdit ,MdVisibility,MdKeyboardArrowDown ,MdStar    } from "react-icons/md";
import './Sidebar.css';
import SocialMedia from './../SocialMedia/SocialMedia';
import logo_img from '../../assets/admin-images/logo.png';
import DropDownMenu from '../ReuseableComponent/DropDownMenu';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [categoryDropDownOpen, setCategoryDropDownOpen] = useState(false);
  const [productDropDownOpen, setProductDropDownOpen] = useState(false);
  const [sliderDropDownOpen, setSliderDropDownOpen] = useState(false);


  // handleClick active item
  const handleClick = (item) => {
    setActiveItem(item);
  };


  // side bar data pass as a props in dropdown menu
  const productMenuItems = [
    { text: "Add Product", icon: <MdAdd />, route: "/addProduct" },
    { text: "All Product", icon: <MdVisibility />, route: "/allProduct" },
  ];

  const categoryMenuItems = [
    { text: "Top Category", icon: <MdCategory />, route: "/" },
    { text: "Mid Category", icon: <MdStar />, route: "/" },
    { text: "Sub Category", icon: <MdSettings />, route: "/" },
  ];

  const sliderMenuItems = [
    { text: "Add Slider", icon: <MdAdd />, route: "/addSlider" },
    { text: "All Slider", icon: <MdVisibility />, route: "/fetchSlider" },
  ];

  return (
    <section className="sidebar">
      <div className="sidebar-admin-info">
        <img src={logo_img} alt="Admin Profile"/>
        <h4>Admin Name</h4>
        <span>info@gmail.com</span>
        <SocialMedia />
      </div>

      <div className="sidebar-container">

      <Link to='/'>
        <div className={`sidebar-box ${activeItem === 'Dashboard' ? 'active' : ''}`} onClick={() => handleClick('Dashboard')}>
          <MdDashboard />
          <h2>Dashboard</h2>
        </div>
      </Link>

        <div className={`sidebar-box ${activeItem === 'Category' ? 'active' : ''}`} onClick={() => {handleClick('Category'); setCategoryDropDownOpen(!categoryDropDownOpen);}}>
          <MdCategory />
          <h2>Category</h2>
          <MdKeyboardArrowDown /> 
        </div>
        {/* dropdownmenu */}
          {categoryDropDownOpen && (
          <DropDownMenu menuItems={categoryMenuItems}/>
        )}

        <Link to={'/orders'}>
          <div className={`sidebar-box ${activeItem === 'Order Management' ? 'active' : ''}`} onClick={() => handleClick('Order Management')}>
            <MdShoppingCart />
            <h2>Order Management</h2>
          </div>
        </Link>
        
        <div className={`sidebar-box ${activeItem === 'Product Management' ? 'active' : ''}`}  onClick={() => {handleClick('Product Management'); setProductDropDownOpen(!productDropDownOpen);}} >
          <MdProductionQuantityLimits />
          <h2>Product Management</h2>
          <MdKeyboardArrowDown /> 
        </div>

        {/* dropdownmenu */}
        {productDropDownOpen && (
          <DropDownMenu menuItems = {productMenuItems}/>
        )}
        <div className={`sidebar-box ${activeItem === 'Profile' ? 'active' : ''}`} onClick={() => handleClick('Profile')}>
          <MdPerson />
          <h2>Profile</h2>
        </div>

        <div className={`sidebar-box ${activeItem === 'Manage Slider' ? 'active' : ''}`} onClick={() => {handleClick('Manage Slider'); setSliderDropDownOpen(!sliderDropDownOpen);}}>
          <MdSlideshow />
          <h2>Manage Slider</h2>
          <MdKeyboardArrowDown />
        </div>
        {/* dropdownmenu */}
          {sliderDropDownOpen && (
          <DropDownMenu menuItems = {sliderMenuItems}/>
        )}

        <div className={`sidebar-box ${activeItem === 'Rating & Reviews' ? 'active' : ''}`} onClick={() => handleClick('Rating & Reviews')}>
          <MdRateReview />
          <h2>Rating & Reviews</h2>
        </div>
        <Link to={'/contact'}>
          <div className={`sidebar-box ${activeItem === 'Messages' ? 'active' : ''}`} onClick={() => handleClick('Messages')}>
            <MdMessage />
            <h2>Messages</h2>
          </div>
        </Link>

        <div className={`sidebar-box ${activeItem === 'FAQs' ? 'active' : ''}`} onClick={() => handleClick('FAQs')}>
          <MdHelp />
          <h2>FAQs</h2>
        </div>
        <Link to={'/contact'}>
          <div className={`sidebar-box ${activeItem === 'Contact Us' ? 'active' : ''}`} onClick={() => handleClick('Contact Us')}>
            <MdContactMail />
            <h2>Contact Us</h2>
          </div>
        </Link>
        <div className={`sidebar-box ${activeItem === 'Settings' ? 'active' : ''}`} onClick={() => handleClick('Settings')}>
          <MdSettings />
          <h2>Settings</h2>
        </div>
        <div className={`sidebar-box ${activeItem === 'Blog Management' ? 'active' : ''}`} onClick={() => handleClick('Blog Management')}>
          <MdLibraryBooks />
          <h2>Blog Management</h2>
        </div>
        <Link to={'/userMange'}>
          <div className={`sidebar-box ${activeItem === 'User Management' ? 'active' : ''}`} onClick={() => handleClick('User Management')}>
            <MdPeople />
            <h2>User Management</h2>
          </div>
        </Link>
        <div className={`sidebar-box ${activeItem === 'Customers' ? 'active' : ''}`} onClick={() => handleClick('Customers')}>
          <MdGroup />
          <h2>Customers</h2>
        </div>
        <div className={`sidebar-box ${activeItem === 'Promotions' ? 'active' : ''}`} onClick={() => handleClick('Promotions')}>
          <MdLocalOffer />
          <h2>Promotions</h2>
        </div>
        <div className={`sidebar-box ${activeItem === 'Analytics & Reports' ? 'active' : ''}`} onClick={() => handleClick('Analytics & Reports')}>
          <MdAnalytics />
          <h2>Analytics & Reports</h2>
        </div>
        <div className={`sidebar-box ${activeItem === 'Content Management' ? 'active' : ''}`} onClick={() => handleClick('Content Management')}>
          <MdContentPaste />
          <h2>Content Management</h2>
        </div>
        <div className={`sidebar-box ${activeItem === 'Marketing' ? 'active' : ''}`} onClick={() => handleClick('Marketing')}>
          <MdCampaign />
          <h2>Marketing</h2>
        </div>
        <div className={`sidebar-box ${activeItem === 'Support' ? 'active' : ''}`} onClick={() => handleClick('Support')}>
          <MdSupportAgent />
          <h2>Support</h2>
        </div>
      </div>
    </section>
  );
}

export default Sidebar;
