import React, { useState ,useEffect} from 'react';

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
    
    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    return windowSize;
  }

export default useWindowSize;



// Usage

// const ResponsiveView = () => {
//     const windowSize = useWindowSize()
    
//     return (
//         <div>
//           {windowSize.width <= 960 ? (
//             <SmartphoneView />
//           ) : (
//             <DesktopView />	
//           )}
//       </div>
//     )
//   }