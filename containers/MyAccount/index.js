import React,{useContext, useEffect} from 'react'
import { web3GlobalContext } from '../../context/global-context'
import TopStrip from '../TopStrip/TopStrip';
import Navbar from '../Navbar/navbar';
import  UserData  from './Account';
import Footer from '../Footer/footer';
import dynamic from "next/dynamic";

export const UserPortfolio = ( ) =>{
    useEffect(() => {
        window.scrollTo(0, 0);  
  }, []);
const {showGif,setShowGif} = useContext(web3GlobalContext)

    return(
        <div>
            {showGif && <div className="show-cont" onClick={()=> setShowGif(false)} >
        <div className="overlayColor"  ></div>
        </div>}

        <TopStrip/>
        <div className='bg-color'>
        <Navbar/>
        <UserData/>
        <Footer/>
        </div>
        </div>
    )
}

UserPortfolio.getInitialProps = async (ctx) => {
    return {};
  };
  export default UserPortfolio