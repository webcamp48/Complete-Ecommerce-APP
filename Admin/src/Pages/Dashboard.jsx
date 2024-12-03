import CardBox from '../Components/ReuseableComponent/CardBox';
import React from 'react';

const Dashboard = () => {
  // const [totalOrder, setTotalOrder] = useState(0);
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
      gap: "1rem",
      margin: "1rem 0"
    }}>
      <CardBox />
      <CardBox />
      <CardBox />
      <CardBox />
    </div>
  );
};

export default Dashboard;
