import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store'; 

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

const CartSummary: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items) as CartItem[]; // Use the correct selector

  // Calculate total items and total price
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-summary">
      <h2>Cart Summary</h2>
      <p>Total Items: {totalItems}</p>
      <p>Total Price: ${totalPrice.toFixed(2)}</p> {/* Ensure total price is correctly formatted */}
    </div>
  );
};

export default CartSummary;



