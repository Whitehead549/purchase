// import React from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Layout from './pages/Layout';
// import Home from './pages/Home';
// import About from './pages/About';
// import Blogs from './pages/Blogs';
// import NoPage from './pages/NoPage';
// import AOS from "aos";
// import "aos/dist/aos.css";
// import Cart from './pages/Cart';
// import Login from './pages/Login';
// import { AddProducts } from './pages/AddProduct';
// import Signup from './pages/SignUp';


// const App = () => {
//   React.useEffect(() => {
//     AOS.init({
//       offset: 100,
//       duration: 900,
//       easing: "ease-in-sine",
//       delay: 100,
//     });
//     AOS.refresh();
//   }, []);
//   return (
//     <>
//       <BrowserRouter>
//       <Routes>
//       <Route path="/" element={<Layout/>}>
//           <Route index element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/blogs" element={<Blogs />} />
//           <Route path="/cart" element={<Cart/>  } />
//           <Route path="/login" element={<Login/>  } />
//           <Route path="/admin" element={<AddProducts/>  } />
//           <Route path="/signup" element={<Signup/>  } />
//           <Route path="*" element={<NoPage />} />
//         </Route>
//       </Routes>

//       </BrowserRouter>
//     </>
//   )
// }

// export default App;


import React, { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";

const App = () => {
  const barcodeRef = useRef(null);
  const encodedData = "TN123456789"; // Shorter encoded string

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, encodedData, {
        format: "CODE128",
        displayValue: false, // Hides text under barcode
        lineColor: "#000",
        width: 1.8, // Slightly thinner bars for compact size
        height: 70, // Shorter height for quick scanning
        margin: 0,
      });
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <svg ref={barcodeRef}></svg>
    </div>
  );
};

export default App;
