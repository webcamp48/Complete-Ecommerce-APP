import React, { useEffect } from 'react';
import './Styles/FetchSlider.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSlider, fetchSliderData } from '../../Redux/features/Slider/SliderSlice';
import Loader from './../../Components/ReuseableComponent/Loader';
import { Link, useNavigate } from 'react-router-dom';
import CustomButton from '../../Components/ReuseableComponent/CustomButton';

const FetchSlider = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slides, status, error } = useSelector((state) => state.slider);
  const API_URL_Image = `http://localhost:3002`;

  // Fetch sliders when the component mounts
  useEffect(() => {
    dispatch(fetchSliderData());
  }, [dispatch]);



  // Update slider handler
  const updateSliderHandler = (id) => {
    navigate(`/updateSlider/${id}`);
  };

  // Delete slider handler
  const deleteSliderHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this slider?")) {
      dispatch(deleteSlider(id));
    }
  };

  if (status === 'loading') {
    return <Loader size={100}/>; 
  }

  if (status === 'failed') {
    return <div className='nofound'>No Slider Content Found: {error}</div>; 
  }

  return (
    <section className='fetchSlider'>
      <h1 className='heading'>Slider Data</h1>
      <div className="addSlider-btn">
        <Link to={'/addSlider'}><CustomButton text={'Add Slider'}/></Link>
      </div>
      <div className="table-container">
        <table className='fetchSlider-table'>
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Main Heading</th>
              <th>Sub Heading</th>
              <th>URL Text</th>
              <th>Button URL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(slides) && slides.length > 0 ? (
              slides.map((slide, index) => (
                <tr key={slide._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={`${API_URL_Image}/images/sliders/${slide.sliderImage}`}
                      alt={slide.mainHeading}
                      className="slider-image"
                    />
                  </td>
                  <td>{slide.mainHeading}</td>
                  <td>{slide.subHeading}</td>
                  <td>{slide.urlText}</td>
                  <td>{slide.buttonURL}</td>
                  <td className='slider-action'>
                    <button className='update-btn' onClick={() => updateSliderHandler(slide._id)}>Update Slider</button>
                    <button className='delete-btn' onClick={() => deleteSliderHandler(slide._id)}>Delete Slider</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className='nofound'>No sliders available</td> 
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default FetchSlider;
