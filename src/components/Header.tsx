
import React from 'react';
import { Baby, Gift, PartyPopper } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="bg-white shadow-md py-4 relative z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Baby className="h-8 w-8 text-kid-purple" />
          <h1 className="text-2xl md:text-3xl font-bold text-kid-purple">شهربازی فرشته</h1>
        </div>
        
        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6 font-medium text-right rtl:space-x-reverse">
          <Link to="/" className="text-gray-700 hover:text-kid-pink transition">خانه</Link>
          <Link to="#services" className="text-gray-700 hover:text-kid-pink transition">خدمات</Link>
          <Link to="#gallery" className="text-gray-700 hover:text-kid-pink transition">گالری تصاویر</Link>
          <Link to="#contact" className="text-gray-700 hover:text-kid-pink transition">تماس با ما</Link>
          <Button 
            className="bg-kid-pink hover:bg-kid-purple text-white rounded-full flex items-center gap-2"
          >
            <PartyPopper size={18} />
            <span>رزرو تولد</span>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white p-4 absolute top-full left-0 right-0 shadow-lg z-40 flex flex-col items-end gap-4">
          <Link 
            to="/" 
            className="text-gray-700 hover:text-kid-pink transition w-full text-right py-2 border-b border-gray-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            خانه
          </Link>
          <Link 
            to="#services" 
            className="text-gray-700 hover:text-kid-pink transition w-full text-right py-2 border-b border-gray-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            خدمات
          </Link>
          <Link 
            to="#gallery" 
            className="text-gray-700 hover:text-kid-pink transition w-full text-right py-2 border-b border-gray-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            گالری تصاویر
          </Link>
          <Link 
            to="#contact" 
            className="text-gray-700 hover:text-kid-pink transition w-full text-right py-2 border-b border-gray-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            تماس با ما
          </Link>
          <Button 
            className="bg-kid-pink hover:bg-kid-purple text-white rounded-full w-full justify-center flex items-center gap-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <PartyPopper size={18} />
            <span>رزرو تولد</span>
          </Button>
        </nav>
      )}
    </header>
  );
};

export default Header;
