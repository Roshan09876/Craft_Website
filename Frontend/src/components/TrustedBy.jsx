import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const TrustedBy = () => {
  const logos = [
    {
      name: "one",
      imageUrl: "data:image/png;base64,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",

    },
    {
      name: "two",
      imageUrl:
        "https://www.data4amazon.com/blog/wp-content/uploads/2019/10/google-seo-vs-amazon.jpg.jpg",
    },
    {
      name: "three",
      imageUrl:
        "https://m.media-amazon.com/images/G/31/amazonservices/Blog/What_is_an_E-commerce_business.jpg"
    },
    {
      name: "four",
      imageUrl:
        "https://t3.ftcdn.net/jpg/02/47/48/00/360_F_247480017_ST4hotATsrcErAja0VzdUsrrVBMIcE4u.jpg",
    },
    {
      name: "five",
      imageUrl:
        "https://t3.ftcdn.net/jpg/02/41/39/06/360_F_241390620_hihddCG15N7I8HyPWUiv1eUH85D2SN9z.jpg"
    },
  ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="mt-10 px-4 md:px-10 lg:px-20 py-10 bg-gray-100">
      <h1 className="font-bold text-primary text-3xl text-center mb-2">
        We are Trusted By
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Our clients and partners include some of the most trusted brands.
      </p>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={2000}
        arrows={false}
      >
        {logos.map((logo, index) => (
          <div key={index} className="flex items-center justify-center p-2">
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-2 flex items-center justify-center w-25 h-25">
              <img
                src={logo.imageUrl}
                alt={logo.name}
                className="max-h-24 max-w-full object-contain"
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default TrustedBy;
