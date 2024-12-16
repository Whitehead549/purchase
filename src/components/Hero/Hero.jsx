import React from 'react';
import { IoLogoWhatsapp } from "react-icons/io";
import whatsapp from "../../assets/whatsapp.png";



const Hero = () => {
    const [priceValue, setPriceValue] = React.useState(30);

  return <div className="bg-black/20 h-full">
                <div className='h-full flex justify-center items-center
                p-4 bg-primary/10'>
                    <div className='container grid grid-cols-1 gap-4'>
                        {/* text content section */}
                        <div className='text-white pt-8 font-bold'>
                        <p data-aos="fade-up" className="text-md">
                        Chat us on <span className="text-green-700">WhatApp</span>
                        </p>

                        <p
                        data-aos="fade-up"
                        data-aos-delay="300"
                        className="font-bold text-2xl"
                        >
                            for Enquires.
                        </p>
                        </div>
                                                                                    
                        <div data-aos="fade-up" data-aos-delay="600" className="flex items-center space-x-2">
    <a href="https://wa.me/+2348068815008?text=Greeting%20engr" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
        <span className="text-green-600 hover:text-green-800 focus:text-green-800 underline font-bold text-lg sm:text-lg md:text-lg lg:text-lg cursor-pointer">Click here</span>
        <img src={whatsapp} alt="WhatsApp Banner" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
    </a>
</div>



                    </div>
                </div>
            </div>
  
}

export default Hero