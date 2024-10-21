// src/components/ProductList.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useGetProductsQuery } from '../services/productApi';
import { addToCart } from '../features/cart/cartSlice';
import { LuSearch } from 'react-icons/lu';
import { RxCross2 } from 'react-icons/rx';
import { LiaShoppingCartSolid } from 'react-icons/lia';
import { FaSpinner } from 'react-icons/fa';
import { Product } from '../types/types';

const ProductList: React.FC = () => {
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { data: products = [], isLoading, error, isFetching } = useGetProductsQuery();
  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState(false)
  const [itemsToShow, setItemsToShow] = useState(8); // Number of items to show at first
 
  const filteredProducts = products.filter((product: Product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    const productsToDisplay = searchTerm
      ? filteredProducts.slice(0, itemsToShow) // Show filtered products if searching
      : products.slice(0, itemsToShow); // Otherwise, show general products
  
    setVisibleProducts(productsToDisplay);
  }, [filteredProducts, products, itemsToShow, searchTerm]);
  

  // Scroll logic
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
      // Load more filtered products if searching, otherwise load more general products
      if (itemsToShow < (searchTerm ? filteredProducts.length : products.length)) {
        setItemsToShow((prev) => prev + 8); // Increment the number of visible items
      }
    }
  };
  

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [itemsToShow, products]);


  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ id: product.id, title: product.title, price: product.price, quantity: 1 }));
    setShowDialog(true);
    setTimeout(() => {
      setShowDialog(false);
    }, 3000);
  };


  const clearSearch = () => {
    setSearchTerm('');
  };
  if (isLoading) return <div className="text-center grid place-content-center w-full h-[80vh]">  <FaSpinner className="text-xl animate-spin text-gray-600" />
  </div>;
  if (error) return <div className="text-center grid place-content-center w-full h-[80vh] text-red-700">Error loading products...</div>;

  return (
    <div className="max-w-screen-xl mx-auto p-4">

      {/* Search */}
      <div className="relative w-full max-w-md mt-24">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-600 bg-transparent ">
          <LuSearch className='bg-transparent text-lg m-1' />
        </span>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 pl-10 pr-10 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400"
          >
            <RxCross2 className='bg-transparent' />
          </button>
        )}
      </div>


      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-12">
        {visibleProducts.map((product: Product) => (
          <div key={product.id} title={`${product.title}`} className="bg-white border-2 rounded-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-md p-4">
            <img src={product.image} alt={product.title} className="h-48 w-full mb-4 border-2 rounded object-contain" />
            <div className="flex flex-col gap-4">
              <h3 className="text-base font-semibold mb-2 text-gray-800 h-8" title={`${product.title}`}>
                {product.title.length > 27 ? `${product.title.slice(0, 24)}...` : product.title}
              </h3>

              <p className="text-gray-600 font-medium">৳ {product.price.toFixed(2)}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="btn flex items-center justify-center gap-1 py-2 text-sm font-medium rounded bg-gray-800 text-white  hover:bg-gray-700 transition duration-200 focus:outline-none focus:ring-0"
              >
                <LiaShoppingCartSolid className='text-white bg-transparent text-xl mb-0.5' />  Add to Cart
              </button>
            </div>
          </div>
        ))}
        {isFetching && <div className="text-center mx-auto grid place-content-center w-full h-12">Loading more products...</div>}
      </div>
      {showDialog && (
        <div className="fixed bottom-5 right-4 bg-gray-900 p-6 rounded-md shadow-lg">
          <p className="text-gray-50 font-bold text-sm bg-transparent">Item added to cart!</p>
        </div>
      )}

    </div>

  );
};

export default ProductList;
