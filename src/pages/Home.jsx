import React from 'react';
import Hero from '../components/home/Hero';
import ProductsonHome from '../components/home/ProductsonHome';
import WhyChooseSection from '../components/home/WhyChooseSection';
import HelpSection from '../components/home/HelpSection';
import PopularProduct from '../components/home/PopularProduct';
import TestimonialSection from '../components/home/TestimonialSection';
import BlogSection from '../components/home/BlogSection';
import FooterSection from '../components/home/FooterSection';
import Navbar from '../components/home/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProductsonHome />
      <WhyChooseSection />
      <HelpSection />
      <PopularProduct />
      <TestimonialSection />
      <BlogSection />
      <FooterSection />
    </>
  );
}
