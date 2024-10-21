// src/components/cartSummary.tsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { LiaShoppingCartSolid } from 'react-icons/lia';
import { CartItem } from '../types/types';
import { removeFromCart } from '../features/cart/cartSlice';
import { IoMdClose } from 'react-icons/io';

const CartSummary: React.FC = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items) as CartItem[]; // Selector
  const [isCartOpen, setIsCartOpen] = useState(false); // Toggle cart dropdown

  // Calculate total items and total price
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  // Handle cart icon click to toggle dropdown
  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className='w-full max-w-[1200px] mx-auto flex items-center justify-between py-6 px-4 border-b-2 fixed top-0 left-0 right-0 z-50 bg-gray-50 shadow-sm'>
      <div className='font-bold text-gray-800 hover:text-gray-700'>E-commerce</div>
      <div className="cart-summary flex items-center gap-6">
        {/* Cart Icon with Badge */}
        <div className="relative" onClick={handleCartClick}>
          <LiaShoppingCartSolid className='text-black bg-transparent text-2xl mb-0.5 cursor-pointer' />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </div>

        {/* Cart Dropdown */}
        {isCartOpen && (
          <div className="absolute top-14 right-0 w-64 bg-white text-gray-800 shadow-lg border p-4">
            <h3 className="text-lg font-semibold mb-2">Cart Items</h3>
            {items.length === 0 ? (
              <p className="text-sm text-gray-500">Your cart is empty</p>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.id} className="flex justify-between items-center">
                    <div className='max-w-44 '>
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="text-sm">Qty: {item.quantity} | ৳ {item.price.toFixed(2)}</p>
                    </div>
                    <IoMdClose
                      className="cursor-pointer text-lg text-red-500"
                      onClick={() => dispatch(removeFromCart(item.id))} // Dispatch remove action
                    />
                  </li>
                ))}
              </ul>
            )}

            {/* Cart Total */}
            <div className="mt-4 border-t pt-2 flex justify-between items-center text-sm">
              <span>Total: ৳ {totalPrice.toFixed(2)}</span>
              <button
                className={`${totalPrice === 0 ? 'bg-gray-500 text-gray-200' : 'bg-pink-500 text-gray-50'
                  } py-1 px-2 rounded font-bold`}
                disabled={totalPrice === 0}
              >
                Checkout
              </button>
          
            </div>
          </div>
        )}

        {/* Total Price */}
        <div className='flex items-center justify-center gap-1 text-sm'>
          <FaMoneyCheckAlt className='text-xl mb-0.5 text-gray-700' />৳ {totalPrice.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default CartSummary;



