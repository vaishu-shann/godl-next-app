import React,{useEffect} from 'react'
import  TopStrip  from '../TopStrip/TopStrip';
import Navbar from '../Navbar/navbar';
import  AdminScreen  from './AdminScreen';
import Footer from '../Footer/footer';
import dynamic from "next/dynamic";

 const Admin = () =>{
    useEffect(() => {
        window.scrollTo(0, 0);  
  }, []);
    return(
        <div>
        <TopStrip/>
        <div className='bg-color'>
        <Navbar/>
        <AdminScreen/>
        <Footer/>
        </div>
        </div>
    )
}
 
Admin.getInitialProps = async (ctx) => {
    return {}
}

export default Admin