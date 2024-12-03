// src/Layouts/MainLayout.js
import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Sidebar from '../Components/Sidebar/Sidebar';
import IconBreadcrumbs from '../Components/ReuseableComponent/IconBreadcrumbs';

const MainLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className='main-content'>
        <div className="main-left-sidebar">
          <Sidebar />
        </div>
        <div className="main-right-content">
          <IconBreadcrumbs />
          <hr className='line' />
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
