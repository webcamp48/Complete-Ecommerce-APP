import React, { useEffect } from 'react';
import './Styles/ContactUs.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContactUsMessage, fetchContactUsMessage } from '../Redux/features/ContactUs/ContactUsSlice';
import Loader from './../Components/ReuseableComponent/Loader';

const ContactUs = () => {
  const dispatch = useDispatch();
  const {contactUs, status, error} = useSelector((state) => state.contact);


  // fetch User Contact Us Message
  useEffect(()=> {
    dispatch(fetchContactUsMessage());
  }, [dispatch]);

  // handleDeleteContactUs
  const handleDeleteContactUs = (id) => {
    if(window.confirm("Are You Sure You Want To Delete this Customer Message")){
      dispatch(deleteContactUsMessage(id))
    }
  }

  if(status === 'loading'){
    return <Loader size = {100}/>
  }
  if(status === 'failed'){
    return <div className='nofound'>{error}</div>
  }


  return (
    <section className='contact-us'>
      <table className='contact-us-table'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone No</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contactUs.map((contact, index)=> {
            return(
              <tr>
              <td>{index + 1}</td>
              <td>{contact.firstName} {contact.lastName}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.message}</td>
              <td><button className='delete-btn' onClick={(e) => handleDeleteContactUs(contact._id)}>Delete</button></td>
            </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}

export default ContactUs