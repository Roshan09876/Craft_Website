import React, { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import logo from "../assets/logo.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuopen] = useState(false);
  const navigate = useNavigate();

  const toggleButton = () => {
    setMenuopen(!menuOpen);
  };

  const handelNavigate = () => {
    navigate("/clients");
  };

  return (
    <div className="bg-primary w-full mb-4">
      <div className="flex items-center justify-between">
        <div className="text-white px-5 py-2 flex gap-5">
          <div className="sm:text-xs md:text-base">
            <LocalPhoneIcon />
            <span className="ml-1">1234567890</span>
          </div>
          <div className="gap-2">
            <EmailIcon />
            <span className="ml-1">crafts@gmail.com</span>
          </div>
        </div>
        <div className="text-white px-5 hidden md:block">
          <FacebookIcon className="mr-3" />
          <InstagramIcon />
          <YouTubeIcon className="ml-3" />
        </div>
      </div>
      <nav className="shadow-md bg-white">
        <div className="flex justify-between items-center px-5">
          <div className="flex items-center sm:px-5">
            <a
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src={logo} className="h-[80px]" alt=" Logo" />
            </a>
            <h1 className="uppercase font-bold text-primary sm:text-xl md:text-1xl lg:text-2xl ml-4">
              HandMade Crafts
            </h1>
          </div>
          <div className="hidden lg:flex md:flex sm:flex sm:text-xs md:text-sm lg:text-base">
            <Link
              to="/"
              className="font-bold hover:cursor-pointer text-primary mr-5"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="font-bold hover:cursor-pointer text-primary mr-5"
            >
              Products
            </Link>
            <Link
              to="/testimonials"
              className="font-bold hover:cursor-pointer text-primary mr-5"
            >
              Profile
            </Link>
            <Link
              to="/about"
              className="font-bold hover:cursor-pointer text-primary mr-5"
            >
              About Us
            </Link>
            <Link
              to="/teams"
              className="font-bold hover:cursor-pointer text-primary mr-5"
            >
              Cart
            </Link>
          </div>
          <div className="px-5">
            <div className=" hidden md:block h-1/2  px-5 py-2 gap-2 text-white">
              <SupervisedUserCircleIcon />
              <Link to='/register'>
              <button className="lg:w-32 md:w-13 mr-5 px-3 py-2 bg-primary transform transition-transform duration-300 hover:scale-110" >
                 Register
              </button>
              </Link>
              <Link to='/login'>
              <button className="lg:w-32 md:w-13 ml-3 px-3 py-2 bg-primary transform transition-transform duration-300 hover:scale-110" >
                 Login
              </button>
              </Link>
            </div>
          </div>
          <i
            className={`fa ${
              menuOpen ? "fa-times" : "fa-bars"
            } text-2xl sm:hidden cursor-pointer`}
            onClick={toggleButton}
            aria-hidden="true"
          ></i>
        </div>
      </nav>
      {menuOpen && (
        <div className={`bg-white px-5 py-2 shadow-lg sm:hidden sidebar-enter`}>
          <ul className="px-5">
            <Link to="/" className="block font-semibold">
              <li className="py-2 px-5 hover:bg-primary hover:text-white hover:rounded-xl hover:cursor-pointer">
                Home
              </li>
            </Link>
            <Link to="/products" className="block font-semibold">
              <li className="py-2  px-5 hover:bg-primary hover:text-white hover:rounded-xl hover:cursor-pointer">
                Product & Service
              </li>
            </Link>
            <Link to="/testimonials" className="block font-semibold">
              <li className="py-2 px-5 hover:bg-primary hover:text-white hover:rounded-xl hover:cursor-pointer">
                Testimonials
              </li>
            </Link>
            <Link to="/about" className="block font-semibold">
              <li className="py-2 px-5 hover:bg-primary hover:text-white hover:rounded-xl hover:cursor-pointer">
                About us
              </li>
            </Link>
            <Link to="/teams" className="block font-semibold">
              <li className="py-2 px-5 hover:bg-primary hover:text-white hover:rounded-xl hover:cursor-pointer">
                Our Teams
              </li>
            </Link>
            <Link to="/careers" className="block font-semibold">
              <li className="py-2 px-5 hover:bg-primary hover:text-white hover:rounded-xl hover:cursor-pointer">
                Careers
              </li>
            </Link>
          </ul>
          <div className="px-5 ml-3 mt-2">
            <button
              className="bg-primary w-32 text-white font-semibold px-4 py-1 rounded-full"
              onClick={handelNavigate}
            >
              <SupervisedUserCircleIcon className="mr-2" />
              Clients
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
