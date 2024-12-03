import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import './SocialMedia.css';

const SocialMedia = () => {
  return (
    <div className="social-media">
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="btn-social">
        <FaFacebookF className="logoIcon" />
        <div className="tooltip">Facebook</div>
      </a>
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="btn-social">
        <FaInstagram className="logoIcon" />
        <div className="tooltip">Instagram</div>
      </a>
      <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="btn-social">
        <FaLinkedinIn className="logoIcon" />
        <div className="tooltip">LinkedIn</div>
      </a>
      <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="btn-social">
        <FaYoutube className="logoIcon" />
        <div className="tooltip">YouTube</div>
      </a>
    </div>
  );
};

export default SocialMedia;
