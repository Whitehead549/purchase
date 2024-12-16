import React, { useState, useEffect, useRef } from 'react';
import { collection, where, getDocs, setDoc, doc, query, updateDoc, onSnapshot, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';
import { auth, db } from '../Config/Config';
import MainVid from "../assets/video/main.mp4";
import Hero from "../components/Hero/Hero";
import Places from '../components/Places/Places';
import Navbar from '../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import LoaderSpinner from './LoaderSpinner';

const Home = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [totalQty, setTotalQty] = useState(0);
  const isRegisteringRef = useRef(false);

  const categories = {
    laptops: [
      { value: 'products-LAPTOPSFRN', label: 'Foreign Laptops' },
      { value: 'products-LAPTOPSNEW', label: 'New Laptops' }
    ],
    phones: [
      { value: 'products-ANDROIDNEW', label: 'New Android Phones' },
      { value: 'products-ANDROIDFRN', label: 'Foreign Android Phones' },
      { value: 'products-IPHONENEW', label: 'New iPhones' },
      { value: 'products-IPHONENFRN', label: 'Foreign iPhones' }
    ],
    accessories: [
      { value: 'products-ACCESSORIES', label: 'Phone Accessories' }
    ]
  };
  

  const getProducts = async (category) => {
    // Default to 'products-ACCESSORIES' if no category is provided
    if (!category) {
      console.warn("No category provided. Defaulting to 'products-ACCESSORIES'.");
      category = 'products-LAPTOPSNEW';
    }
  
    try {
      console.log("Fetching products from category:", category);
      setLoading(true);
      const productsRef = collection(db, category);
      const querySnapshot = await getDocs(productsRef);
      const productsArray = querySnapshot.docs.map(doc => ({ ...doc.data(), ID: doc.id }));
      console.log("Fetched products:", productsArray);
      setProducts(productsArray);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert('Error fetching products, check your internet connection');
    } finally {
      setLoading(false);
    }
  };
  

  const getCurrentUser = async (userUid) => {
    if (userUid) {
      try {
        const q = query(collection(db, "users"), where("uid", "==", userUid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setUser(querySnapshot.docs[0].data().fullName);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  const addToCart = async (product) => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        const cartRef = collection(db, 'Cart' + currentUser.uid);
        const productSnapshot = await getDocs(query(cartRef, where("ID", "==", product.ID)));
        let updatedProduct = { ...product };
        if (!productSnapshot.empty) {
          const existingProduct = productSnapshot.docs[0].data();
          updatedProduct.qty = existingProduct.qty + 1;
          updatedProduct.TotalProductPrice = updatedProduct.qty * updatedProduct.price;
          const productRef = doc(cartRef, productSnapshot.docs[0].id);
          await updateDoc(productRef, { qty: updatedProduct.qty, TotalProductPrice: updatedProduct.TotalProductPrice });
        } else {
          updatedProduct.qty = 1;
          updatedProduct.TotalProductPrice = updatedProduct.qty * updatedProduct.price;
          updatedProduct.uid = currentUser.uid;
          await setDoc(doc(cartRef, updatedProduct.ID), { ...updatedProduct });
        }
      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    } else {
      navigate('/login');
    }
  };

  const fetchCartProducts = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const cartQuery = query(collection(db, 'Cart' + currentUser.uid), where("uid", "==", currentUser.uid));
      onSnapshot(cartQuery, (snap) => {
        const newCartProducts = snap.docs.map((doc) => doc.data());
        setCartProducts(newCartProducts);
        const totalQty = newCartProducts.reduce((accumulator, currentValue) => accumulator + currentValue.qty, 0);
        setTotalQty(totalQty);
      });
    } else {
      console.log('User is not signed in to retrieve cart');
    }
  };

  useEffect(() => {
    const registerAndFetchData = async () => {
      try {
        if (isRegisteringRef.current) return;
        isRegisteringRef.current = true;

        let userUid = localStorage.getItem('userUid');

        if (!userUid) {
          const currentUser = auth.currentUser;
          if (!currentUser) {
            // Register new user
            const uuid = uuidv4();
            const email = `${uuid}@example.com`;
            const password = uuid;
            const fullName = `User-${uuid}`;

            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            userUid = userCredentials.user.uid;

            await addDoc(collection(db, 'users'), {
              fullName: fullName,
              email: email,
              password: password,
              uid: userUid,
            });

            console.log('User registered:', userCredentials.user);

            // Save user UID in local storage
            localStorage.setItem('userUid', userUid);
          } else {
            userUid = currentUser.uid;
            console.log('User already registered:', userUid);
          }
        } else {
          console.log('User already registered:', userUid);
        }

        await getProducts();
        await getCurrentUser(userUid);
        await fetchCartProducts();
      } catch (error) {
        console.error('Error in registration or fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    registerAndFetchData();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user.displayName || user.email);
        fetchCartProducts();
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Navbar user={user} totalQty={totalQty} />
      {loading ? (
        <LoaderSpinner />
      ) : (
        <>
            <div className='relative h-[270px]'>
            <video
              autoPlay
              loop
              muted
              className="absolute right-0 top-0 h-[270px] w-full object-cover z-[-1]"
            >
              <source src={MainVid} type="video/mp4" />
            </video>
            <Hero />
          </div>

          
          <div className="flex items-center space-x-2 p-2 bg-gray-300">
  {/* Dropdown for Laptops */}
  <div className="flex-1">
    <label className="block text-sm font-medium text-[#E55A00] mb-1">Laptops</label>
    <select
      defaultValue=""
      onChange={(e) => {
        const value = e.target.value;
        if (value) getProducts(value); // Call only when a valid value is selected
      }}
      className="w-full p-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="" disabled>Select Laptops</option>
      {categories.laptops.map((category, index) => (
        <option key={index} value={category.value}>
          {category.label}
        </option>
      ))}
    </select>
  </div>

  {/* Dropdown for Phones */}
  <div className="flex-1">
    <label className="block text-sm font-medium text-[#E55A00] mb-1">Phones</label>
    <select
      defaultValue=""
      onChange={(e) => {
        const value = e.target.value;
        if (value) getProducts(value); // Call only when a valid value is selected
      }}
      className="w-full p-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="" disabled>Select Phones</option>
      {categories.phones.map((category, index) => (
        <option key={index} value={category.value}>
          {category.label}
        </option>
      ))}
    </select>
  </div>

  {/* Dropdown for Accessories */}
  <div className="flex-1">
    <label className="block text-sm font-medium text-[#E55A00] mb-1">Accessories</label>
    <select
      defaultValue=""
      onChange={(e) => {
        const value = e.target.value;
        if (value) getProducts(value); // Call only when a valid value is selected
      }}
      className="w-full p-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="" disabled>Select Accessories</option>
      {categories.accessories.map((category, index) => (
        <option key={index} value={category.value}>
          {category.label}
        </option>
      ))}
    </select>
  </div>
</div>


       

          <Places products={products} addToCart={addToCart}/>

        </>
      )}
    </div>
  );
};

export default Home;