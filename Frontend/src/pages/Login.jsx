import React from 'react'
import RegisterAnimation from '../animation_component/RegisterAnimation'
import { Link } from 'react-router-dom'


const Login = () => {
  return (
    <div className='py-12 px-12 flex justify-center items-center mt-10'>
      <div className=' w-5/6  shadow-lg py-5 px-5 flex mt-12'>
        <div className='w-full'>
          <h1 className='text-4xl font-bold text-center mt-5'>Login Page</h1>
          <h2 className='text-center mt-2'>Please fill below form to login</h2>
          <form className='w-full flex flex-col items-center justify-center gap-5 py-5'>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              className="w-2/3 h-19 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-gray-700"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="w-2/3 h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-gray-700"
            />
            <button className='text-white bg-black px-5 py-3 w-1/2 rounded-full'>
              Login
            </button>
         <Link to='/register'>
         <span className='text-center'>Don't have an Account? Register</span>
         </Link>
          </form>
        </div>
        <div className='bg-black w-full shadow-lg'>
        <h1 className='text-4xl mt-5 font-bold text-center text-white'>Welcome to HandMade Crafts</h1>
        <RegisterAnimation/>
        </div>
      </div>
    </div>
  )
}

export default Login
