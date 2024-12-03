import React, { useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import SectionTitle from "../SectionTitle/SectionTitle";
import "./NewCollection.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewCollectins } from "../../Store/features/Products/ProductSlice";
import Loader from "../ReuseableComponent/Loader";

const NewCollection = () => {
  const dispatch = useDispatch();
  const newCollections = useSelector((state) => state.products.newCollections);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    dispatch(fetchNewCollectins());
  }, [dispatch]);

  if(!newCollections){
    return <div className="nofound">No new collections available</div>
  }

  if (status === "loading") {
    return <div><Loader size={100}/></div>;
  }
  if (status === "failed") {
    return <div className="nofoaund">{error}</div>;
  }

  return (
    <div className="popular-products">
      <SectionTitle text1="Latest" text2={"New-Collection"} />
      <div className="newCollection-products-card">
        {newCollections?.length > 0 ? (
            newCollections.map((product, index) => (
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
            <div className="nofound">No new collections available.</div>
        )}
    </div>
    </div>
  );
};

export default NewCollection;
