
import React from 'react';
import { Baby, CircleCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div 
      className="relative pt-16 pb-8 md:pt-20 md:pb-24 overflow-hidden"
      style={{
        backgroundImage: 'url(/lovable-uploads/fb760065-c240-46c4-9d66-35dcc8537a0c.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Additional floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-12 top-0 w-40 h-40 rounded-full bg-kid-yellow opacity-10"></div>
        <div className="absolute left-0 bottom-0 w-60 h-60 rounded-full bg-kid-blue opacity-10"></div>
        <div className="absolute right-1/3 bottom-1/3 w-24 h-24 rounded-full bg-kid-pink opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
        <div className="w-full md:w-1/2 text-right order-2 md:order-1 mt-8 md:mt-0">
          <h1 
            className="text-4xl md:text-6xl font-bold mb-4 text-white"
            style={{
              textShadow: '4px 4px 8px rgba(0,0,0,1), 2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)',
              fontWeight: 'bold'
            }}
          >
            شهربازی فرشته
          </h1>
          <p 
            className="text-xl mb-6 text-white font-bold"
            style={{
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
            }}
          >
            مکانی آرام برای کودکان شما
          </p>
          
          <div className="space-y-3 mb-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center justify-end gap-2">
              <span className="text-gray-800 font-medium">محیطی شاد و امن برای بازی</span>
              <CircleCheck className="text-green-500 h-5 w-5" />
            </div>
            <div className="flex items-center justify-end gap-2">
              <span className="text-gray-800 font-medium">برگزاری جشن تولد</span>
              <CircleCheck className="text-green-500 h-5 w-5" />
            </div>
            <div className="flex items-center justify-end gap-2">
              <span className="text-gray-800 font-medium">کلاس‌های آموزشی و تفریحی</span>
              <CircleCheck className="text-green-500 h-5 w-5" />
            </div>
            <div className="flex items-center justify-end gap-2">
              <span className="text-gray-800 font-medium">کافه کودک</span>
              <CircleCheck className="text-green-500 h-5 w-5" />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Link to="/reservation">
              <Button className="bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 hover:from-blue-500 hover:to-pink-400 text-white rounded-full px-8 py-6 text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                رزرو تولد
              </Button>
            </Link>
            <Button variant="outline" className="border-2 border-white bg-white/90 text-purple-600 hover:bg-purple-500 hover:text-white rounded-full px-8 py-6 text-lg transition-all duration-300 shadow-md hover:shadow-lg backdrop-blur-sm">
              درباره ما
            </Button>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex justify-center order-1 md:order-2">
          <div className="relative w-72 h-72 md:w-[400px] md:h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-br from-kid-pink via-kid-yellow to-kid-blue rounded-full opacity-30 animate-pulse"></div>
            <img 
              src="/lovable-uploads/fb760065-c240-46c4-9d66-35dcc8537a0c.png" 
              alt="کودکان در حال بازی" 
              className="relative z-10 rounded-3xl object-cover h-full w-full shadow-2xl"
            />
            <div className="absolute -bottom-5 -right-5 bg-white p-3 rounded-2xl shadow-lg floating">
              <Baby className="h-8 w-8 text-kid-purple" />
            </div>
            <div className="absolute -top-3 -left-3 bg-white p-2 rounded-full shadow-lg bounce">
              <div className="bg-kid-pink rounded-full w-6 h-6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
