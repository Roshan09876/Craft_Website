import React from "react";
import { useTypewriter } from "react-simple-typewriter";
import ConcultingAnimation from "../animation_component/ConsultingAnimation";

const Hero = () => {
  const [text] = useTypewriter({
    words: [
      " Buy Products..",
      "E-Commerce Site",
    ],
    loop: true,
    typeSpeed: 80,
    deleteSpeed: 50,
    delaySpeed: 1500,
  });

  return (
    <div className="flex items-center justify-around px-10 ml-10">
      <div className="">
        <h1 className="text-teal-800 font-bold md:text-sm lg:text-xl py-3">
         Buy Our Products!!
        </h1>
        <h1 className="text-black font-bold sm:text-xl md:text-2xl lg:text-4xl">
         We Here Provide Quality and Good{" "}
        </h1>
        <h1 className="text-black font-bold sm:text-xl md:text-2xl lg:text-4xl">
           Products for Customers{" "}
        </h1>
        <h1 className="text-primary font-semibold sm:text-xl md:text-2xl lg:text-4xl mb-2 py-2">
          {text}&nbsp;
        </h1>
        <div className="text-primary text-align font-semibold md:text-sm lg:text-xs mt-2 tracking-wide flex flex-col">
          <span>
          This is E-commerce site where one can,
          </span>
          <span>
            Buy Good Quality Products.
          </span>
        </div>
      </div>
      <div>
        <ConcultingAnimation />
      </div>
    </div>
  );
};

export default Hero;
