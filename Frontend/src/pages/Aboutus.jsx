import React from 'react';
import Footer from '../components/Footer';

const AboutUs = () => {
  return (
   <>
    <section style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>About Us</h1>
        <p style={styles.text}>
          Welcome to E-Commerce Site, where we are committed to delivering top-notch products and services that exceed your expectations. Our journey started with a passion for connecting people with quality products, and over the years, we have grown into a trusted name in the online retail industry.
        </p>
        <p style={styles.text}>
          At E-Commerce Site, we believe in innovation, quality, and customer satisfaction. Our dedicated team works tirelessly to bring you the best shopping experience, tailored to meet your unique needs. We take pride in our wide selection of products, user-friendly platform, and exceptional customer service, ensuring that every purchase you make is a satisfying one.
        </p>
        <p style={styles.text}>
          Thank you for choosing E-Commerce Site. We look forward to serving you and making your shopping experience as enjoyable and seamless as possible.
        </p>
      </div>
    </section>
    <Footer/>
   </>
  );
};

const styles = {
  container: {
    padding: '40px',
    backgroundColor: '#f9f9f9',
    fontFamily: 'Arial, sans-serif',
  },
  content: {
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
  },
  heading: {
    fontSize: '36px',
    color: '#333',
    marginBottom: '20px',
  },
  text: {
    fontSize: '18px',
    color: '#555',
    lineHeight: '1.6',
    marginBottom: '15px',
  },
};

export default AboutUs;
