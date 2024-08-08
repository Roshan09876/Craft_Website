import React, { useContext, useEffect } from 'react';
import ProductContext from '../context/ProductContext';
import { Link } from 'react-router-dom';

const Products = () => {
  const { product, getallProduct } = useContext(ProductContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        await getallProduct();
      } catch (error) {
        console.log(`Error Fetching Product from page: ${error}`);
      }
    }
    fetchProduct();
  }, [getallProduct]);

  return (
    <div className='px-10 py-10'>
      <h1 className='font-extrabold text-3xl'>Products We Sell are....</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-5'>
        {
          product.map((item) => (
            <div key={item._id} className='border p-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-gradient-to-r from-[#e0f7f8] via-white to-[#e0f7f8]'>
              <img src={item.image} alt={item.title} className='w-full h-48 object-cover mb-4 rounded-lg' />
              <h1 className='font-bold text-xl mb-2'>{item.title}</h1>
              {/* <h2 className='text-gray-700'>{item.description}</h2> */}
              <Link to='/'>
                <button className="lg:w-32 text-white mt-2 md:w-13 px-3 py-2 bg-primary transform transition-transform duration-300 hover:scale-110" >
                  Add to Cart
                </button>
              </Link>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Products;
