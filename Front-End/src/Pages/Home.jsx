import React from 'react';
import PopularProduct from '../Components/PopularProduct/PopularProduct';
import SliderHome from '../Components/SliderHome/SliderHome';
import NewCollection from '../Components/NewCollection/NewCollection';
import AllProducts from '../Components/AllProducts/AllProducts';

const Home = () => {

  return (
    <div className="home">
        <SliderHome />
        {/* <PopularProduct /> */}
        <NewCollection showChipBadges = {true}  text = {'Hot'} background='#e9a400'/>
        <AllProducts showChipBadges = {true}  text = {'Sale'} background='#f54337'/>
    </div>
  )
}

export default Home