import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useGetProductsQuery } from '../services/productApi';
import { addToCart } from '../features/cart/cartSlice';

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

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10">Error loading products...</div>;

  return (
    // <div className="max-w-screen-xl mx-auto p-4">
    //   <input
    //     type="text"
    //     placeholder="Search products..."
    //     value={searchTerm}
    //     onChange={(e) => setSearchTerm(e.target.value)}
    //     className="border border-gray-300 p-2 rounded-md w-full mb-6"
    //   />
    //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    //     {filteredProducts.map((product: Product) => (
    //       <div key={product.id} className="bg-white shadow-md rounded-lg p-4 flex flex-col">
    //         <img src={product.image} alt={product.title} className="h-48 w-full object-cover mb-4 rounded-md" />
    //         <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
    //         <p className="text-gray-700 mb-4">${product.price.toFixed(2)}</p>
    //         <button
    //           onClick={() => handleAddToCart(product)}
    //           className="bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
    //         >
    //           Add to Cart
    //         </button>
    //       </div>
    //     ))}
    //     {isFetching && <div className="text-center mt-4">Loading more products...</div>}
    //   </div>
    // </div>

    <div className="max-w-screen-xl mx-auto p-4">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 p-3 rounded-lg w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product: Product) => (
          <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
            <img src={product.image} alt={product.title} className="h-48 w-full object-cover mb-4" />
            <div className="p-4 flex flex-col">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">{product.title}</h3>
              <p className="text-gray-600 mb-4 font-medium">${product.price.toFixed(2)}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
        {isFetching && <div className="text-center mt-4">Loading more products...</div>}
      </div>
    </div>

  );
};

export default ProductList;
