import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useGetProductsQuery } from '../services/productApi';
import { addToCart } from '../features/cart/cartSlice';
import { LuSearch } from 'react-icons/lu';
import { RxCross2 } from 'react-icons/rx';
import { PiShoppingCartBold } from 'react-icons/pi';
import { LiaShoppingCartSolid } from 'react-icons/lia';

// Define the product type
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

const ProductList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const { data: products = [], isLoading, error, isFetching } = useGetProductsQuery({ page, limit: 10 });
  const dispatch = useDispatch();

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
      setPage((prevPage) => prevPage + 1); // Load next page
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ id: product.id, title: product.title, price: product.price, quantity: 1 }));
  };

  const filteredProducts = products.filter((product: Product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const clearSearch = () => {
    setSearchTerm('');
  };
  if (isLoading) return <div className="text-center mt-10 flex w-full">Loading...</div>;
  if (error) return <div className="text-center mt-10 flex w-full">Error loading products...</div>;

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      {/* <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 p-3 rounded-lg w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
      /> */}

      {/* Search */}
      <div className="relative w-full max-w-md">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-600 bg-transparent ">
          <LuSearch className='bg-transparent text-lg m-1' />
        </span>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 pl-10 pr-10 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
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
        {filteredProducts.map((product: Product) => (
          <div key={product.id} title={`৳ {product.title}`} className="bg-white border-2 rounded-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-md p-4">
            <img src={product.image} alt={product.title} className="h-48 w-full mb-4 border-2 rounded object-contain" />
            <div className="flex flex-col gap-4">
              <h3 className="text-base font-semibold mb-2 text-gray-800 h-8" title={`৳ {product.title}`}>
                {product.title.length > 27 ? `৳ {product.title.slice(0, 24)}...` : product.title}
              </h3>

              <p className="text-gray-600 font-medium">৳ {product.price.toFixed(2)}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="btn flex items-center justify-center gap-1 py-2 text-sm font-medium rounded bg-gray-800 text-white  hover:bg-gray-700 transition duration-200 focus:outline-none focus:ring-0"
              >
              <LiaShoppingCartSolid  className='text-white bg-transparent text-xl mb-0.5'/>  Add to Cart
              </button>
            </div>
          </div>
        ))}
        {isFetching && <div className="text-center mx-auto grid place-content-center w-full">Loading more products...</div>}
      </div>
    </div>

  );
};

export default ProductList;
