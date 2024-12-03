import React, { useState } from 'react';
import product1 from '../../assets/Images/product_4.png'
import HoverRating from './../ReuseableComponent/HoverRating';
import CustomButton from '../ReuseableComponent/CustomButton';
import SocialMedia from '../SocialMedia/SocialMedia';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './ProductDesc.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../Store/features/CartSlice/CartSlice';
import { Link } from 'react-router-dom';

const ProductDesc = ({productData}) => {
  const API_URL_IMAGE = "http://localhost:3002/images/products";

  const dispatch = useDispatch();
  const userId = useSelector((state)=> state.login.userId);
  const productId = productData._id;

  const colors = productData.color ? productData.color.split(',') : [];
  const sizes = productData.size ? productData.size.split(',') : [];

  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(colors[0] || []);
  const [selectedSize, setSelectedSize] = useState(sizes[0] || []);
  
  
// handleAddToCart
  const handleAddToCart =()=>{
    dispatch(addToCart({userId, productId, quantity: selectedQuantity, size : selectedColor,color: selectedSize }))
  }

  // handleQuantityChange
  const handleQuantityChange = (action) => {
    setSelectedQuantity((prevQuantity)=> {
      if(action === 'increase') return prevQuantity  + 1;
      if(action === 'decrease' && prevQuantity  > 1) return prevQuantity  - 1;
      return prevQuantity ;
    })
  }


  return (
      <div className="product-desc">
        <div className="product-desc-left-images">
        <div className="product-desc-left-images-small">
        <img src={productData.image ? `${API_URL_IMAGE}/${productData.image}` : product1} alt={productData.title}/>
        <img src={productData.image ? `${API_URL_IMAGE}/${productData.image}` : product1} alt={productData.title}/>
        <img src={productData.image ? `${API_URL_IMAGE}/${productData.image}` : product1} alt={productData.title}/>
        <img src={productData.image ? `${API_URL_IMAGE}/${productData.image}` : product1} alt={productData.title}/>
        <img src={productData.image ? `${API_URL_IMAGE}/${productData.image}` : product1} alt={productData.title}/>
        
        </div>
          <div className="product-desc-left-images-main">
            <img src={productData.image ? `${API_URL_IMAGE}/${productData.image}` : product1} alt={productData.title}/>
          </div>
        </div>

        <div className="product-desc-right-content">
          <h3 className='color-main'>{productData.title}</h3>

          <div className="product-stoke-rating ">
            <p className='span-heading'>In Stock: {productData.stoke || 'Stoke End'}</p>
            <p className='span-heading'>{productData.category}</p>
            <HoverRating />
          </div>
          <div className="product-price justify-remove">
                <h5 className='price-old'> ${productData.old_price}.00 </h5>
                <h2 className='price-new'> ${productData.new_price}.00 </h2> |
                <h5> You Save ${productData.old_price - productData.new_price}.00 (16%)</h5>
          </div>

          <p><strong className='color-main'>16</strong> sold in last <strong className='color-main'>25</strong> hours</p>

          <p className='product-description'>{productData.description || 'No description available'}</p>

          <span className='hurry-up'>Hurry! Only <strong className='color-main'>{productData.stoke === 0 ? 0 : productData.stoke}</strong> Items left in stock.</span>

          <div className="product-box-color">
            <label>Color : <strong className='color-main'>{selectedColor}</strong></label>
            <div className="product-box-color-btn">
              {colors.map((color, index) => (
                <button key={index} className='color-btn' style={{backgroundColor : color.toLowerCase()}} onClick={() => setSelectedColor(color)}></button>
              ))}
            </div>
          </div>

          <div className='product-box-size'>
            <label>Size : <strong className='color-main'>{selectedSize}</strong></label>
            <div className="product-box-size-btn">
              {sizes.map((size, index) => (
                <button key={index} className='size-btn product-size' onClick={()=> setSelectedSize(size)}>{size}</button>
              ))}
            </div>
          </div>

          <strong className='color-main'>Size Guide</strong>

          <div className="qty-item-btn">
            <div className="qty-items">
              <button className='qty-item-btn size-btn' onClick={() => handleQuantityChange('decrease')}>-</button>
              <input  type="text" min={0} value={selectedQuantity} maxLength={3} readOnly/>
              <button className='qty-item-btn size-btn' onClick={() => handleQuantityChange('increase')}>+</button>
            </div>
            <Link to={'/cart'}>
              <CustomButton onClick={handleAddToCart} type='submit' text = 'Add To Cart' startIcon={<ShoppingCartIcon />} width = '100%'/>
            </Link>
          </div>

          <CustomButton variant="outlined"  text = 'Buy It Now' width = '100%'/>

          <div className="wishlist-socialmedia flex">
            <CustomButton width={'60%'} startIcon={<FavoriteIcon />} text={'Add to Wishlist'} />
            <SocialMedia />
          </div>


          {/* payement method card */}

        </div>
      </div>
  )
}

export default ProductDesc