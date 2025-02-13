import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AddProduct from './Pages/ProductManage/AddProduct';
import AllProduct from './Pages/ProductManage/AllProduct';
import UpdateProduct from './Pages/ProductManage/UpdateProduct';
import AdminLogin from './Pages/AdminLogin';
import Order from './Pages/Order';
import ContactUs from './Pages/ContactUs';
import FetchSlider from './Pages/Slider/FetchSlider';
import UpdateSlider from './Pages/Slider/UpdateSlider';
import AddSlider from './Pages/Slider/AddSlider';
import UserManagement from './Pages/UserManagement';
import LoginLayout from './Layouts/LoginLayout';
import MainLayout from './Layouts/MainLayout';
import UnprotectedRoute from './routes/UnprotectedRoute';
import ProtectedRoute from './routes/ProtectedRoute';
import Dashboard from './Pages/Dashboard';


const Router = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        {/* Unprotected Routes */}
        <Route element={<UnprotectedRoute />}>
          <Route path='/login' element={<LoginLayout><AdminLogin /></LoginLayout>} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<MainLayout><Dashboard /> </ MainLayout>} />
          <Route path='/addProduct' element={<MainLayout><AddProduct /></MainLayout>} />
          <Route path='/allProduct' element={<MainLayout><AllProduct /></MainLayout>} />
          <Route path='/updateProduct/:id' element={<MainLayout><UpdateProduct /></MainLayout>} />
          <Route path='/orders' element={<MainLayout><Order /></MainLayout>} />
          <Route path='/contact' element={<MainLayout><ContactUs /></MainLayout>} />
          <Route path='/addSlider' element={<MainLayout><AddSlider /></MainLayout>} />
          <Route path='/fetchSlider' element={<MainLayout><FetchSlider /></MainLayout>} />
          <Route path='/updateSlider/:id' element={<MainLayout><UpdateSlider /></MainLayout>} />
          <Route path='/userMange' element={<MainLayout><UserManagement /></MainLayout>} />
        </Route>
      </Routes>
    </div>
  );
}

export default Router;
