import React, { useEffect } from 'react';
import SectionTitle from './../SectionTitle/SectionTitle';
import ProductCard from './../ProductCard/ProductCard';
import Slider from "react-slick";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './RelatedProduct.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRelatedProducts } from '../../Store/features/Products/ProductSlice';
import Loader from '../ReuseableComponent/Loader';

const NextArrow = ({ onClick }) => {
    return (
        <div className="arrow next" onClick={onClick}>
            <ArrowForwardIosIcon />
        </div>
    );
};

const PrevArrow = ({ onClick }) => {
    return (
        <div className="arrow prev" onClick={onClick}>
            <ArrowBackIosIcon />
        </div>
    );
};

// Slider Settings
const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        }
    ]
};

const RelatedProduct = ({ productData }) => {

    const dispatch = useDispatch();
    const { relatedProducts, statusRelatedProducts, errorRelatedProducts } = useSelector((state) => state.products);

    useEffect(() => {
        if (productData.category) {
            dispatch(fetchRelatedProducts(productData.category));
        }
    }, [ productData.category]);

    if (!relatedProducts || relatedProducts.length === 0) {
        return <div className='nofound'>No Related Products Found</div>;
    }

    if (statusRelatedProducts === 'loading') {
        return <Loader />;
    }

    if (statusRelatedProducts === 'failed') {
        return <div className='nofound'>{errorRelatedProducts}</div>;
    }

    return (
        <section className='related-product'>
            <SectionTitle text1="Related" text2="Trending Products" />

            <div className="related-products-card-slider">
                <Slider {...settings}>
                    {relatedProducts.map((product, index) => (
                        <ProductCard 
                            key={product._id}
                            id={product._id}
                            title={product.title}
                            description={product.description}
                            old_price={product.old_price}
                            new_price={product.new_price}
                            image={product.image}
                            category={product.category}
                        />
                    ))}
                </Slider>
            </div>
        </section>
    );
}

export default RelatedProduct;
