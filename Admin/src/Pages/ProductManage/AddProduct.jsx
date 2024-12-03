import React, { useState } from 'react'
import CustomButton from './../../Components/ReuseableComponent/CustomButton';
import upload_img from './../../assets/admin-images/upload_area.svg';
import axios from 'axios';
import { toast } from 'react-toastify';


const AddProduct = () => {

    const initialProductData = {
        title : "",
        description : "",
        old_price : "",
        new_price : "",
        size : [],
        color : [],
        stoke : "",
        category : "",
    }
    const [productData, setProductData] = useState(initialProductData);
    const [imagePreview, setImagePreview] = useState(false);
    const [newSize, setNewSize] = useState("");
    const [newColor, setNewColor] = useState("");


    // handleAddNewSize
    const handleAddNewSize = (e) => {
        if(e.key === 'Enter' && newSize.trim()){
            setProductData({...productData, size : [...productData.size, newSize.trim().toUpperCase()]});
            setNewSize("");
            e.preventDefault();
        }
    }
    const handleRemoveNewSize = (index) => {
        const updatedSizes = productData.size.filter((_, i) => i !== index);
        setProductData({...productData, size : updatedSizes});
    }

    const handleAddNewColor = (e) => {
        if(e.key === 'Enter' && newColor.trim()){
            setProductData({
                ...productData,
                color : [...productData.color, newColor.trim()]
            });
            setNewColor("");
            e.preventDefault();
        }
    }
    const handleRemoveNewColor = (index) => {
        const updatedColors = productData.color.filter((_, i) => i !== index);
        setProductData({...productData, color : updatedColors});
    }

    
    // productChangeHandler
    const productChangeHandler = (event) => {
        const { name, value } = event.target;
        setProductData({...productData, [name] : value});
    }

    
    // ProductSubmitHandler
    const productSubmitHandler = async (e) => {
        e.preventDefault();
        
        const API_URL = `http://localhost:3002/api/product/addProduct`;

        const formData = new FormData();
        formData.append('image', imagePreview);

        // Append each key-value pair from productData to formData
        for (const key in productData) {
            formData.append(key, productData[key]);
        }

        // Add product Data in database
        try {
            const response = await axios.post(API_URL, formData , {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }});

            if(response.data.success){
                toast.success(response.data.message);

                // clear form and image after submit
                setProductData(initialProductData);
                setImagePreview(null);
            }

        } catch (error) {
            if(!error.response){
                toast.error('Unable to connect to the server. Please try again later.');
            }
            console.error(error);
            toast.error(error.response.data.message);
        }
    }

  return (
  <section className='addUpdateProduct'>
      <div className="addUpdateProduct-top-heading">
          <h2>Add Products</h2>
      </div>
      <form onSubmit={productSubmitHandler} className="addUpdateProduct-bottom-content">
          <div className="input-group">
              <input type="text" name='title' value={productData.title} onChange={productChangeHandler} placeholder='Enter Product Title' required/>
          </div>
          <div className="input-group">
              <textarea name="description" value={productData.description} onChange={productChangeHandler} placeholder='Enter Product Description' rows={7} required ></textarea>
          </div>
          <div className="input-group">
              <input type="text" name='old_price' value={productData.old_price} onChange={productChangeHandler} placeholder='Enter Product Old Price' required/>
              <input type="text" name='new_price' value={productData.new_price} onChange={productChangeHandler} placeholder='Enter Product New Price' required/>
          </div>
          <div className="input-group" style={{flexDirection : "column"}}>
            <div className="tag-container">
                {productData.size.map((size, index) => {
                    return (
                    <div key={index} className="tags">
                        <i>{size}</i>
                        <button onClick={() => handleRemoveNewSize(index)} className="close-btn">&times;</button>
                    </div>
                    )
                })}
            </div>
            <input type="text" name='size' value={newSize} onChange={(e) => setNewSize(e.target.value)} onKeyDown={handleAddNewSize} placeholder='Enter Product Size' />
          </div>
          <div className="input-group" style={{flexDirection: "column"}}>
            <div className="tag-container">
                    {productData.color.map((color, index) => {
                        return (
                        <div key={index} className="tags">
                            <i>{color}</i>
                            <button onClick={() => handleRemoveNewColor(index)} className="close-btn">&times;</button>
                        </div>
                        )
                    })}
                </div>
                <input type="text" name='color' value={newColor} onChange={(e) => setNewColor(e.target.value)} onKeyDown={handleAddNewColor} placeholder='Enter Product Color'  />
          </div>
          <div className="input-group">
            <input type="text" name='stoke' value={productData.stoke} onChange={productChangeHandler} placeholder='Enter available Stoke Item' required />
          </div>
          <div className="input-group">
              <select name="category" value={productData.category} onChange={productChangeHandler} required>
                  <option value="">Select Category</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="kid's">Kid's</option>
              </select>
          </div>
          <div className="input-group">
            <label htmlFor="product-img">
              <img src={imagePreview ? URL.createObjectURL(imagePreview) : upload_img} alt="" />
            </label>
            <input type="file" name ='image' id='product-img' onChange={(e)=> setImagePreview(e.target.files[0])} />
          </div>
          <CustomButton text={'Add Product'}/>
      </form>
  </section>
  )
}

export default AddProduct