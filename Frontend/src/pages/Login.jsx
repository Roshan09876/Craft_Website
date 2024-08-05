import React, { useContext, useState } from 'react'
import RegisterAnimation from '../animation_component/RegisterAnimation'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'


const Login = () => {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate("/")
    } catch (error) {
      console.log(`Error from Login Page ${error}`)
    }
  }

  return (
    <div className='py-12 px-12 flex justify-center items-center mt-10'>
      <div className=' w-5/6  shadow-lg py-10 px-5 flex mt-12 '>
        <div className='w-full'>
          <h1 className='text-4xl font-bold text-center mt-5'>Login Page</h1>
          <h2 className='text-center mt-2'>Please fill below form to login</h2>
          <form className='w-full flex flex-col items-center justify-center gap-5 py-5' onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              autoComplete="email"
              className="w-2/3 h-19 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-gray-700"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              autoComplete="password"
              className="w-2/3 h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-gray-700"
            />
            <button className='text-white bg-black px-5 py-3 w-1/2 rounded-full' type='submit' >
              Login
            </button>
            <Link to='/register'>
              <span className='text-center'>Don't have an Account? Register</span>
            </Link>
          </form>
        </div>
        <div className='bg-black w-full shadow-lg'>
          <h1 className='text-4xl mt-5 font-bold text-center text-white'>Welcome to HandMade Crafts</h1>
          <RegisterAnimation />
        </div>
      </div>
    </div>
  )
}

export default Login
