import React, { useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import SectionTitle from "../SectionTitle/SectionTitle";
import "./AllProducts.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../Store/features/Products/ProductSlice";
import Loader from "../ReuseableComponent/Loader";

const AllProducts = () => {
  const dispatch = useDispatch();
  const {allProducts, status, error} = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  if(!allProducts){
    return <div className="nofound">No Product available</div>
  }

  if (status === "loading") {
    return <div><Loader size={100}/></div>;
  }
  if (status === "failed") {
    return <div className="nofound">{error}</div>;
  }

  return (
    <div className="popular-products">
      <SectionTitle text1="All" text2={"All Product"} />
      <div className="allProducts-card">
        {allProducts?.length > 0 ? (
            allProducts.map((product, index) => (
                <ProductCard
                    key={index}
                    id={product._id}
                    title={product.title}
                    description={product.description}
                    old_price={product.old_price}
                    new_price={product.new_price}
                    image = {product.image}
                    category={product.category}
                />
            ))
        ) : (
            <div className="nofound">No products found</div>
        )}
    </div>
    </div>
  );
};

export default AllProducts;
