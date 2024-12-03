import React from 'react';
import { BiSolidDownArrow } from "react-icons/bi";
import './TopBar.css';
import SocialMedia from '../SocialMedia/SocialMedia';

const TopBar = () => {
  return (
    <div className='topbar flex'>
      <div className="topbar-left">
        <div className="topbar-left-country">
          <select name="country" id="">
            <option value="">Select Country</option>
            <option value="pak">Pakistan</option>
            <option value="ind">India</option>
            <option value="usa">USA</option>
            <option value="uk">UK</option>
          </select>
           <BiSolidDownArrow className="select-icon" />
        </div>
        <div className="topbar-left-language">
          <select name="language" id="">
            <option value="">Select Language</option>
            <option value="eng">English</option>
            <option value="urdu">Urdu</option>
            <option value="hindi">Hindi</option>
          </select>
          <BiSolidDownArrow className="select-icon" />
        </div>
      </div>
      <div className="topbar-center">
        <p>Worldwide Express Shipping</p>
      </div>
       <SocialMedia />
    </div>
  );
}

export default TopBar;
