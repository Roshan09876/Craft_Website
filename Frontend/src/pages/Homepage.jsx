import React from "react";
import Hero from "../components/Hero";
import Service from "../components/Service";
import TechWeLove from "../components/TechWeLove";
import TrustedBy from "../components/TrustedBy";
// import { testApi } from "../api/Api";

const Homepage = () => {
  // useEffect(() => {
  //   testApi()
  //     .then(response => {
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  return (
    <div className="mt-5">
      <Hero />
      <TrustedBy />
      <Service />
      <TechWeLove />
    </div>
  );
};

export default Homepage;
