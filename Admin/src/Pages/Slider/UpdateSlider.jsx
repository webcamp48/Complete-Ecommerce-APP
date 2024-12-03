import React, { useEffect, useState } from 'react';
import './Styles/AddUpdateSlider.css';
import CustomButton from '../../Components/ReuseableComponent/CustomButton';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSliderById, updateSlider } from './../../Redux/features/Slider/SliderSlice';
import Loader from '../../Components/ReuseableComponent/Loader';


const UpdateSlider = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const API_URL_Image = `http://localhost:3002`;
    const [imagePreview, setImagePreview] = useState(false);
    const {slides, status} = useSelector((state) => state.slider);

    const [formData, setFormData] = useState({
        mainHeading : "",
        subHeading : "",
        urlText : "",
        buttonURL : "",
        sliderImage : ""
    });


    // fetch Slider base on Id
    useEffect(()=>{
        if(id){
            dispatch(fetchSliderById(id))
        }
    },[dispatch, id]);


    // fetch Slider base on Id and show in input  field
    useEffect(()=> {
        if(slides && slides._id === id){
            setFormData({
                mainHeading : slides.mainHeading || "",
                subHeading : slides.subHeading || "",
                urlText : slides.urlText || "",
                buttonURL : slides.buttonURL || "",
                sliderImage : slides.sliderImage || ""
            });
        }
    }, [slides]);


    // inputHandlerChnage
    const inputHandlerChnage = (e)=>{
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    // submitHandler
    const submitHandler = (e) => {
        e.preventDefault();
        try {
          const sliderData = new FormData();
          sliderData.append("sliderImage", imagePreview);
    
          for (const key in formData) {
            sliderData.append(key, formData[key]);
          }
    
          dispatch(updateSlider( sliderData, id ));          
          navigate("/fetchSlider")
        } catch (error) {
          console.error("Error updating slider:", error);
        }
      };


    if(status === 'loading'){
        return <Loader />
    }

    if (status === 'failed') {
        return <div>Error fetching slider data</div>;
    }
    

  return (
    <section className='AddUpdateSlider'>
        <h1>Update Slider</h1>
        <form className='slider-form' onSubmit={submitHandler}>
            <div className="input-slider">
                <input type="text" name='mainHeading' value={formData.mainHeading} onChange={inputHandlerChnage} placeholder='Slider Heading' />
            </div>
            <div className="input-slider">
                <input type="text" name='subHeading' value={formData.subHeading} onChange={inputHandlerChnage} placeholder='Slider SubHeading' />
            </div>
            <div className="input-slider">
                <input type="text" name='urlText' value={formData.urlText} onChange={inputHandlerChnage} placeholder='Slider URL Button Text' />
            </div>
            <div className="input-slider">
                <input type="text" name='buttonURL' value={formData.buttonURL} onChange={inputHandlerChnage} placeholder='Slider Button URL' />
            </div>
            <div className="input-slider">
                <label htmlFor="slider-img">
                    <img src={imagePreview ? URL.createObjectURL(imagePreview) :`${API_URL_Image}/images/sliders/${slides.sliderImage}`} alt={slides.mainHeading} />
                </label>
                <input type="file" name='sliderImage' id='slider-img' onChange={(e)=> setImagePreview(e.target.files[0])} />
            </div>
            <CustomButton text={'Update Slider'} type='submit' width={'100%'}/> 
        </form>
    </section>
  )
}

export default UpdateSlider