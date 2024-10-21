import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { FaMoneyCheckAlt} from 'react-icons/fa';
import { LiaShoppingCartSolid } from 'react-icons/lia';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

const CartSummary: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items) as CartItem[]; //selector

  // Calculate total items and total price
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
<div className='w-full max-w-[1200px] mx-auto flex items-center justify-between py-6 px-4 border-b-2 fixed top-0 left-0 right-0 z-50 bg-gray-50'>
  <div className='font-bold text-gray-800 hover:text-gray-700'>E-commerce</div>
  <div className="cart-summary flex items-center gap-6">
    {/* Cart Icon with Badge */}
    <div className="relative">
      <LiaShoppingCartSolid className='text-black bg-transparent text-2xl mb-0.5' />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-pink-400 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </div>
    <div className='flex items-center justify-center gap-1 text-sm'>
      <FaMoneyCheckAlt className='text-xl mb-0.5 text-gray-700' />৳ {totalPrice.toFixed(2)}
    </div>
  </div>
</div>



  );
};

export default CartSummary;



