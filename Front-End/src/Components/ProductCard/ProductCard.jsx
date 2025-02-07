import React from 'react'
import CustomButton from '../ReuseableComponent/CustomButton';
import image1 from '../../assets/Images/product_5.png'
import ReadOnlyRating from './../ReuseableComponent/ReadOnlyRating';
import ChipBadge from '../ReuseableComponent/ChipBadge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({showChipBadges,background,text, id, title,description,old_price,new_price,image,category}) => {

    const API_URL_IMAGE = `${import.meta.env.VITE_BACKEND_URL}/images/products`;

    
  return (
    <div className='card'>
        <div className="card-top">
            <ChipBadge text = {text} className="chip-badges" background={background}/>
            <Link to={`/productdetails/${id}`}><img onClick={()=> window.scroll(0, 0)} src={image ? `${API_URL_IMAGE}/${image}` : image1} alt={title}/></Link>
        </div>
        <div className="card-bottom">
            <span className='card-bottom-category span-heading'>{category}</span>
            <h2 className='card-bottom-title'>{title}</h2>
            <p className='card-bottom-desc'> {description ? `${description.slice(0, 30)}...` : 'No description available'}</p>
            <div className="product-price">
                <h5 className='price-new'>${new_price}.00</h5>
                <h5 className='price-old'>${old_price}.00 </h5>
            </div>
            <div className="card-bottom-rating">
                <ReadOnlyRating value={4.5} starColor="#ff9800"/>
                <p className='color-main'>(5 reviews )</p>
            </div>
            <CustomButton startIcon={<ShoppingCartIcon />} text={"Add To Cart"} />
        </div>
    </div>
  )
}

export default ProductCard