// GamingHeroSection.js

import React,{useEffect} from 'react';
import { FaArrowDown } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css'
const GamingHeroSection = () => {
  // Replace 'your-image-url' with the URL of your Unsplash image
  const imageUrl = 'https://source.unsplash.com/1920x1080/?gaming';
  useEffect(() => {
    AOS.init({ duration: 1000 }); 
  }, []);
  const scrollToTarget = () => {
    const targetElement = document.getElementById('Video');

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className="relative">
      {/* Image Overlay */}
      <div
        className="absolute inset-0 bg-black opacity-50"
      ></div>

      {/* Video Overlay */}
      

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-6 " data-aos="fade-up"
     data-aos-duration="3000">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Gaming World</h1>
        <p className="text-lg">Explore the most exciting gaming experiences.</p>
        <h3>scroll down for tutorial</h3>
        <a href="#Video">
        <FaArrowDown onClick={scrollToTarget}  className='bg-purple-600 w-[50px] h-[50px] p-4 rounded-full'/>
        </a>
      </div>

      {/* Image Background */}
      <img
        className="w-full h-[90vh] my-3 object-cover"
        src={imageUrl}
        alt="Gaming Hero"
      />
    </div>
  );
};

export default GamingHeroSection;
