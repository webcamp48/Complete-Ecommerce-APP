import React, { useEffect } from 'react'
import ProductDesc from '../Components/ProductDesc/ProductDesc'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../Store/features/Products/ProductSlice';
import { useParams } from 'react-router-dom';
import IconBreadcrumbs from '../Components/ReuseableComponent/IconBreadcrumbs';
import TabComponent from '../Components/ReuseableComponent/TabComponent';
import RelatedProduct from '../Components/RelatedProduct/RelatedProduct';
import Loader from './../Components/ReuseableComponent/Loader';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const {allProducts, statusAllProducts, errorAllProducts} = useSelector((state)=> state.products);

  const {id} = useParams();
  const productData = allProducts.find((item) => String(item._id) === String(id));

  console.log("product details", productData)

  useEffect(() => {
    if (statusAllProducts === 'idle') {
      dispatch(fetchAllProducts());
    }
  }, [dispatch, statusAllProducts]);
  


  if(statusAllProducts === 'loading'){
    return <div><Loader size={100}/></div>
  }

  if(statusAllProducts === 'failed'){
    return <div className='nofound'>{errorAllProducts}</div>
  }

  if(!productData){
    return <div className='nofound'>No Product Found</div>
  }



  return (
    <section className='product-details'>
      <IconBreadcrumbs productData = {productData}/>
      <ProductDesc productData = {productData}/>
      <TabComponent />
      <RelatedProduct productData = {productData}/>
      

    </section>
  )
}

export default ProductDetail;