import React from 'react'
import ProductCard from '../ProductCard/ProductCard';
import './PopularProduct.css'
import SectionTitle from '../SectionTitle/SectionTitle';

const PopularProduct = () => {
  return (
    <div className='popular-products'>
      <SectionTitle text1 = 'Popular' text2 = {"Best-Sellers"}/>
      <div className="popular-products-card">
        <ProductCard />
        <ProductCard />
        <ProductCard showChipBadges = {true}  text = {'-15%'} background={'#01bad4'}/>
        <ProductCard showChipBadges = {true}  text = {'Sale'} background='#f54337'/>
        <ProductCard showChipBadges = {true}  text = {'Hot'} background='#e9a400'/>
        <ProductCard />
        <ProductCard />
        <ProductCard showChipBadges = {true}></ProductCard>

      </div>
    </div>
  )
}

export default PopularProduct