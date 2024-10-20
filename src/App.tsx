import React from 'react';
import ProductList from './components/ProductList';
import CartSummary from './components/CartSummary';
import './App.css'

const App: React.FC = () => {
  return (
    <div className="App playful container">
      <CartSummary />
      <ProductList />
    </div>
  );
};

export default App;


