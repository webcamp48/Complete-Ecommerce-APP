import React, { useEffect } from "react";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './SliderHome.css';
import CustomButton from "../ReuseableComponent/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchSliderHome } from "../../Store/features/SliderHomeSlice/SliderHomeSlice";
import { Link } from "react-router-dom";
import Loader from './../ReuseableComponent/Loader'

const SliderHome = () => {

  const dispatch = useDispatch();
  const {sliderData, status} = useSelector((state) => state.sliderHome);
  const API_URL_Image = `${import.meta.env.VITE_BACKEND_URL}`;



  // fetch Slider Data when component mount
  useEffect(()=>{
    dispatch(fetchSliderHome());
  },[dispatch])


  if(status === 'loading'){
    return <Loader size={100}/>
  }
  if(status === 'failed'){
    return <div className="nofound">Failed Slider Content Not Found</div>
  }


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="hero-slider">
      <Slider {...settings}>
        {sliderData.map((slide,index) => (
          <div key={index} className="slide">
            <img src={`${API_URL_Image}/images/sliders/${slide.sliderImage}`} alt={slide.mainHeading} />
            <div className="overlay"></div>
            <div className="slide-content">
              <h1>{slide.mainHeading}</h1>
              <p>{slide.subHeading}</p>
              <Link to={`/${slide.buttonURL}`}><CustomButton text={slide.urlText}/></Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} custom-arrow custom-next`}
            style={{ ...style, display: 'block' }}
            onClick={onClick}
        />
    );
}

const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} custom-arrow custom-prev`}
            style={{ ...style, display: 'block' }}
            onClick={onClick}
        />
    );
}

export default SliderHome;
