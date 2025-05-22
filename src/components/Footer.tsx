
import React from 'react';
import { Toys } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-kid-purple/10 to-kid-blue/10 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <Toys className="h-8 w-8 text-kid-purple mr-2" />
            <h3 className="text-2xl font-bold text-kid-purple">شهربازی فرشته</h3>
          </div>
          
          <div className="text-center md:text-right text-gray-600 mb-6 md:mb-0">
            <p>مکانی آرام برای کودکان شما</p>
            <p className="mt-1">گراش - خیابان بازار - جنب آموزشگاه رانندگی - ساختمان فرشته</p>
          </div>
          
          <div className="text-center md:text-left">
            <p className="text-gray-600">تماس: 09917037267 | 07152451323</p>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} - تمامی حقوق برای شهربازی فرشته محفوظ است</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
