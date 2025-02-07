import React, { useEffect, useState } from 'react'
import CustomButton from './../../Components/ReuseableComponent/CustomButton';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from './../../Redux/Slice/GetProductByIdSlice';
import { fetchProducts } from './../../Redux/Slice/FetchProductSlice';
import Loader from '../../Components/ReuseableComponent/Loader';

const UpdateProduct = () => {

    const API_URL = import.meta.env.VITE_BACKEND_URL;

    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    // Selector to get the product data from the Redux store
    const singleProduct = useSelector((state) => state.getProductById.item);
    const singleProductStatus = useSelector((state) => state.getProductById.status);
    const singleProductError = useSelector((state) => state.getProductById.error);

    const [newSize, setNewSize] = useState("");
    const [newColor, setNewColor] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [productData, setProductData] = useState({
        title: "",
        description: "",
        old_price: "",
        new_price: "",
        size: [],
        color: [],
        stoke: "",
        category: "",
      });

    useEffect(()=>{
        if(id){
            dispatch(getProductById(id))
        }
    },[dispatch,id]);

    // Update productData with fetched product data
    useEffect(() => {
        if (singleProduct && singleProductStatus === 'succeeded') {
            const sizes = singleProduct.size ? singleProduct.size.split(',') : [];
            const colors = singleProduct.color ? singleProduct.color.split(',') : [];
    
            setProductData({
                ...singleProduct,
                size: sizes,
                color: colors
            });
            setImagePreview(null);
        }
    }, [singleProduct, singleProductStatus]);
    

    useEffect(() => {
        if (singleProductError) {
          toast.error(`Error: ${singleProductError}`);
        }
      }, [singleProductError]);

      // Loading state
      if(singleProductStatus === 'loading'){
        return <Loader />
      }

      if(!singleProduct){
        return <p className='nofound' style={{marginTop:"5rem"}}>Product not found for Update</p>
      }


// Handle size addition
    const handleAddNewSize = (e)=> {
        if(e.key === 'Enter' && newSize.trim()){
            setProductData({...productData, size : [...productData.size, newSize.trim().toUpperCase()]});
            setNewSize("");
            e.preventDefault();
        }
    }
    const handleRemoveNewSize = (index) =>{
        const updatedSizes = productData.size.filter((_, i) => i !== index);
        setProductData({...productData, size: updatedSizes});
    }

    const handleAddNewColor = (e)=> {
        if(e.key === 'Enter' && newColor.trim()){
            setProductData({
                ...productData,
                color : [...productData.color, newColor.trim()]
            })
            setNewColor("");
            e.preventDefault();
        }
    }
    const handleRemoveNewColor = (index) => {
        const updatedColors = productData.color.filter((_, i) => i !== index);
        setProductData({...productData, color: updatedColors});
    }

    // productChangeHandler
    const productChangeHandler = (event) => {
        const {name, value} = event.target;
        setProductData({...productData, [name]: value});
    }

    // productSubmitHandler for update Product
    const productSubmitHandler = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        if (imagePreview) formData.append("image", imagePreview);

        // Append each key-value pair from productData to formData
        for(let key in productData){
            formData.append(key, productData[key]);
        }
        try {
            const response = await axios.put(`${API_URL}/api/product/updateProduct/${id}`,formData)
            toast.success(response.data.message);
            dispatch(fetchProducts())
            navigate("/allProduct");
        } catch (error) {
            toast.error('Unable to update the product. Please try again later.');
            console.log(error);

        }
    }

  return (
    <section className='addUpdateProduct'>
        <div className="addUpdateProduct-top-heading">
            <h2>Update Products</h2>
        </div>
        <form onSubmit={productSubmitHandler} className="addUpdateProduct-bottom-content">
            <div className="input-group">
                <input type="text" name='title' value={productData.title} onChange={productChangeHandler} placeholder='Enter Product Title' required/>
            </div>
            <div className="input-group">
                <textarea name="description" value={productData.description} onChange={productChangeHandler} placeholder='Enter Product Description' rows={7} id="" required></textarea>
            </div>
            <div className="input-group">
                <input type="text" name='old_price' value={productData.old_price} onChange={productChangeHandler} placeholder='Enter Product Old Price' />
                <input type="text" name='new_price' value={productData.new_price} onChange={productChangeHandler} placeholder='Enter Product New Price' required/>
            </div>
            <div className="input-group" style={{flexDirection : "column"}}>
                <div className="tag-container">
                    {productData.size.map((size, index) => {
                        return (
                        <div key={index} className="tags">
                            <i>{size}</i>
                            <button type='button' onClick={() => handleRemoveNewSize(index)} className="close-btn">&times;</button>
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
                            <button type='button' onClick={() => handleRemoveNewColor(index)} className="close-btn">&times;</button>
                        </div>
                        )
                    })}
                </div>
                <input type="text" name='color' value={newColor} onChange={(e) => setNewColor(e.target.value)} onKeyDown={handleAddNewColor} placeholder='Enter Product Color'  />
          </div>
            <div className="input-group">
                <input type="text" name='stoke' value={productData.stoke} onChange={productChangeHandler} placeholder='Enter available Stoke Item' required/>
            </div>
            <div className="input-group">
                <select name="category" id="" value={productData.category} onChange={productChangeHandler} required>
                    <option value="">Select Category</option>
                    <option value="men">Men</option>
                    <option value="women">women</option>
                    <option value="kid's">Kid's</option>
                </select>
            </div>
            <div className="input-group">
            <label htmlFor="product-img">
                <img src={imagePreview ? URL.createObjectURL(imagePreview) :`${API_URL}/images/products/${singleProduct.image}`} alt={singleProduct.title} />
            </label>
            <input type="file" name ='image' id='product-img' onChange={(e)=> setImagePreview(e.target.files[0])} />
            </div>
            <CustomButton text={'Update Product'}/>
        </form>
    </section>
  )
}

export default UpdateProduct