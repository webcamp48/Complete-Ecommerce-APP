import React, { useState } from 'react';
import './Styles/AddUpdateSlider.css';
import CustomButton from './../../Components/ReuseableComponent/CustomButton';
import upload_img from './../../assets/admin-images/upload_area.svg'
import { useDispatch } from 'react-redux';
import { addSlider } from '../../Redux/features/Slider/SliderSlice';
import { useNavigate } from 'react-router-dom';


const AddSlider = () => {
    const dispatch = useDispatch();
    const [imagePreview, setImagePreview] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        mainHeading : "",
        subHeading : "",
        urlText : "",
        buttonURL : "",
    });

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
            sliderData.append("sliderImage",imagePreview);
    
            for (const key in formData) {
                sliderData.append(key, formData[key]);
            }
            dispatch(addSlider(sliderData));
            navigate("/fetchSlider");
        } catch (error) {
            console.log(error);
        }
    };
    


  return (
    <section className='AddUpdateSlider'>
        <h1>Add Slider</h1>
        <form className='slider-form' onSubmit={submitHandler}>
            <div className="input-slider">
                <input type="text" name='mainHeading' value={formData.mainHeading} onChange={inputHandlerChnage} placeholder='Slider Heading' required/>
            </div>
            <div className="input-slider">
                <input type="text" name='subHeading' value={formData.subHeading} onChange={inputHandlerChnage} placeholder='Slider SubHeading' required/>
            </div>
            <div className="input-slider">
                <input type="text" name='urlText' value={formData.urlText} onChange={inputHandlerChnage} placeholder='Slider URL Button Text' required/>
            </div>
            <div className="input-slider">
                <input type="text" name='buttonURL' value={formData.buttonURL} onChange={inputHandlerChnage} placeholder='Slider Button URL' required/>
            </div>
            <div className="input-slider">
                <label htmlFor="slider-img">
                    <img src={imagePreview ? URL.createObjectURL(imagePreview) : upload_img} alt="" />
                </label>
                <input type="file" name='sliderImage' id='slider-img' onChange={(e)=> setImagePreview(e.target.files[0])} required/>
            </div>
            <CustomButton text={'Add Slider'} type='submit' width={'100%'}/> 
        </form>
    </section>
  )
}

export default AddSlider