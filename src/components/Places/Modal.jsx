import React, { useState } from 'react';
import { auth, db } from '../../Config/Config';
import { collection, getDocs, where, query, addDoc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Modal = ({ TotalPrice, totalQty, hideModal }) => {
  const navigate = useNavigate();

  const toastStyle = {
    backgroundColor: '#3e3a31', // Green background color
    color: 'white', // White text color
    padding: '10px', // Padding
    borderRadius: '4px', // Rounded corners
  };

  // form states
  const [cell, setCell] = useState(null);
  const [residentialAddress, setResidentialAddress] = useState('');
  const [cartPrice] = useState(TotalPrice);
  const [cartQty] = useState(totalQty);

  // close modal
  const handleCloseModal = () => {
    hideModal();
  };

  // cash on delivery
  const handleCashOnDelivery = async (e) => {
    e.preventDefault();
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const q = query(collection(db, 'users'), where('uid', '==', user.uid));
        const userData = await getDocs(q);
        await addDoc(collection(db, 'Buyer-Personal-Info'), {
          Name: userData.docs[0].data().fullName,
          Email: userData.docs[0].data().email,
          CellNo: cell,
          ResidentialAddress: residentialAddress,
          CartPrice: cartPrice,
          CartQty: cartQty,
        });

        const cartData = await getDocs(collection(db, 'Cart' + user.uid));
        let message = `Order Details:\n\nName: ${userData.docs[0].data().fullName}\nEmail: ${userData.docs[0].data().email}\nCell No: ${cell}\nAddress: ${residentialAddress}\nTotal Price: ${cartPrice}\nTotal Quantity: ${cartQty}\n\nCart Items:\n`;

        cartData.forEach((doc) => {
          const data = doc.data();
          // console.log(data);
          message += `\nProduct: ${data.title
          }\nPrice: ${data.TotalProductPrice}\nQuantity: ${data.qty
          }\n`;
        });

        // Create a WhatsApp link with the message
        const whatsappLink = `https://api.whatsapp.com/send?phone=+2348181287661&text=${encodeURIComponent(message)}`;

        // Open the WhatsApp link
        window.open(whatsappLink, '_blank');

        cartData.forEach(async (doc) => {
          var data = doc.data(); // Extract document data
          data.ID = doc.id;
          await addDoc(collection(db, 'Buyer-Cart' + user.uid), { data });
          await deleteDoc(doc.ref);
        });
      } else {
        // console.error();
      }
    });

    hideModal();
    toast.success('Your order has been placed successfully', {
      position: 'top-right',
      autoClose: 5000,
      style: toastStyle,
    });
    setTimeout(() => {
      navigate('/');
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
  <div className="relative bg-white rounded-lg shadow-lg w-full max-w-xs sm:max-w-md">
    <div className="absolute top-0 right-0 mt-4 mr-4 text-red-600 cursor-pointer" onClick={handleCloseModal}>
      <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M14.348 14.849a1 1 0 0 1-1.414 1.415L10 11.414l-2.929 2.83a1 1 0 1 1-1.415-1.415l2.828-2.828L5.636 7.636a1 1 0 1 1 1.415-1.415l2.83 2.828 2.828-2.828a1 1 0 0 1 1.415 1.415l-2.828 2.828 2.828 2.829z" />
      </svg>
    </div>

    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Cash On Delivery Details</h2>

      <form className="space-y-4" onSubmit={handleCashOnDelivery}>
        <div>
          <label htmlFor="cell" className="block text-sm font-medium text-gray-700">
            Cell Number
          </label>
          <input
            type="number"
            id="cell"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your cell number"
            required
            value={cell || ''}
            onChange={(e) => setCell(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="residentialAddress" className="block text-sm font-medium text-gray-700">
            Residential Address
          </label>
          <input
            type="text"
            id="residentialAddress"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your residential address"
            required
            value={residentialAddress}
            onChange={(e) => setResidentialAddress(e.target.value)}
          />
        </div>

        <div className="flex justify-between">
          <div>
            <label className="block text-sm font-medium text-gray-700">Total Quantity</label>
            <input
              type="text"
              className="mt-1 block w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
              readOnly
              value={cartQty}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Total Price</label>
            <input
              type="text"
              className="mt-1 block w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
              readOnly
              value={cartPrice}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

  );
};
