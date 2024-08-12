import React, { useEffect, useState } from 'react';
import { getCartApi } from '../api/Api';

const Cart = () => {
    const [cart, setCart] = useState(null);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('userData'));
                const userId = user._id;
                if (userId) {
                    const response = await getCartApi(userId);
                    setCart(response.data.cart);
                } else {
                    console.error('User ID not found in localStorage');
                }
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };

        fetchCart();
    }, []);

    return (
        <div className='container mx-auto px-4 py-8'>
            <h1 className='text-3xl font-bold mb-6'>Your Cart</h1>
            {cart ? (
                <div className='space-y-6'>
                    {cart.items.map((item) => (
                        <div key={item._id} className='bg-white shadow-md rounded-lg p-4 flex items-center space-x-4'>
                            <img src={item.product.image} alt={item.product.title} className='w-24 h-24 object-cover rounded-lg' />
                            <div className='flex-1'>
                                <h2 className='text-xl font-semibold'>{item.product.title}</h2>
                                <p className='text-gray-600'>{item.product.description}</p>
                                <div className='flex justify-between items-center mt-2'>
                                    <p className='text-lg font-medium'>${item.product.price}</p>
                                    <p className='text-sm text-primary'>Quantity: {item.quantity}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className='text-lg text-gray-700'>Loading cart...</p>
            )}
        </div>
    );
};

export default Cart;
