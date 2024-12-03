import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import SectionTitle from './../SectionTitle/SectionTitle';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from '../../Store/features/Products/ProductSlice';
import './SearchProduct.css';
import Loader from './../ReuseableComponent/Loader';
import CustomButton from '../ReuseableComponent/CustomButton';

const SearchProduct = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("query");

    const { searchProduct, statusSearchProduct, errorSearchProduct } = useSelector((state) => state.products);

    useEffect(() => {
        if (searchQuery) {
            // Debounce API call by delaying it 2 seconds after user stops typing
            const searchData = setTimeout(()=> {
                dispatch(searchProducts(searchQuery));
            }, 2000);

            // Cleanup function
            return () => clearTimeout(searchData);
        }
    }, [dispatch, searchQuery]);


    return (
        <div className="search-products">
          <SectionTitle text1="Latest Search" text2={"Products"} />

          {statusSearchProduct === 'loading' && <Loader size={100}/>}

          {statusSearchProduct === 'failed' && <div className="nofound">{errorSearchProduct}</div>}

          <div className="searchProduct-products-card">
            {searchProduct?.length > 0 ? (
                searchProduct.map((product, index) => (
                    <ProductCard
                        key={index}
                        id={product._id}
                        title={product.title}
                        description={product.description}
                        old_price={product.old_price}
                        new_price={product.new_price}
                        image={product.image}
                        category={product.category}
                    />
                ))
            ) : (
                statusSearchProduct === 'failed' && <div className="nofound">No products found for "{searchQuery}".</div>
            )}
          </div>
          <div className='load-more'>
            <CustomButton text={'Load More'} />
          </div>
        </div>
    );
}

export default SearchProduct;
