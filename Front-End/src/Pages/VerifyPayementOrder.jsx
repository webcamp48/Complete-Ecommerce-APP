import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/ReuseableComponent/Loader";
import { verifyOrdersPayment } from "../Store/features/Order/OrderSlice";
import CustomButton from "../Components/ReuseableComponent/CustomButton";

const VerifyPayementOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const status = useSelector((state)=> state.order.status)
  
  
//   verify order payement if payement success then status success otherwise pending
  useEffect(()=> {
      const success = searchParams.get('success');
      const orderId = searchParams.get('orderId');
      if(success === 'true' && orderId){
          dispatch(verifyOrdersPayment(success, orderId, navigate));
          console.log('Payment Successfull')
      }else if(success === 'false'){
        toast.error("Payment canceled or failed, order ID:", orderId);
        navigate("/")
      }
  }, [searchParams, navigate])
  

  if(status === 'loading'){
      return <Loader size={100}/>
  }
  if(status === 'failed'){
      return <div className='nofound'>Try Again Payment Failed</div>
  }
  return (
    <div style={{textAlign : "center", color : "#333", margin : "2rem"}}>
      <h1 style={{marginBottom : "1rem"}}>Verify Order Payment</h1>
      <Link to={'/'}><CustomButton text={"Go To Home Page"}/></Link>
    </div>
  );
};

export default VerifyPayementOrder;
