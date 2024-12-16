import React from 'react';
import { Icon } from 'react-icons-kit';
import { plus } from 'react-icons-kit/feather/plus';
import { minus } from 'react-icons-kit/feather/minus';
import { auth, db } from '../../Config/Config';
import { deleteDoc, doc } from 'firebase/firestore';

export const IndividualCartProduct = ({ cartProduct, cartProductIncrease, cartProductDecrease }) => {

  const handleCartProductIncrease = () => {
    cartProductIncrease(cartProduct);
  }

  const handleCartProductDecrease = () => {
    cartProductDecrease(cartProduct);
  }

  const handleCartProductDelete = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        const productRef = doc(db, 'Cart' + user.uid, cartProduct.ID);
        deleteDoc(productRef).then(() => {
          console.log('deleted');
        }).catch(error => {
          console.error('Error deleting document: ', error);
        });
      } else {
        console.log('user is not logged in');
      }
    });
  }

  return (
    <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden p-4 mb-0 transform transition duration-500 hover:scale-105">
      <div className="md:w-1/4 flex-shrink-0 mb-0 md:mb-0">
        <img 
          className="w-full h-32 object-contain rounded-lg" 
          src={cartProduct.url} 
          alt="product-img" 
        />
      </div>
      <div className="flex flex-col justify-between p-4 md:pl-6 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-0">
          <div className="text-lg font-semibold">
            {cartProduct.title}
          </div>
          <div className="text-xl font-bold text-green-600">
            N {cartProduct.price}
          </div>
        </div>
        <div className="text-gray-600 text-sm mb-4 line-clamp-2">
          {cartProduct.description}
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 text-sm">Quantity</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button 
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-l-lg p-2" 
                onClick={handleCartProductDecrease}
              >
                <Icon icon={minus} size={16} />
              </button>
              <div className="px-4 text-sm">{cartProduct.qty}</div>
              <button 
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-r-lg p-2" 
                onClick={handleCartProductIncrease}
              >
                <Icon icon={plus} size={16} />
              </button>
            </div>
          </div>
          <div className="text-lg font-bold text-blue-600">
            N {cartProduct.TotalProductPrice}
          </div>
        </div>
        <button 
          className="self-end bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg" 
          onClick={handleCartProductDelete}
        >
          DELETE
        </button>
      </div>
    </div>
  );
};