
import React from 'react';
import { Baby, Gift, PartyPopper, Cake, Calendar, Store } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  return (
    <header className="bg-white shadow-md py-4 relative z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Baby className="h-8 w-8 text-kid-purple" />
          <h1 className="text-2xl md:text-3xl font-bold rainbow-title">شهربازی فرشته</h1>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <nav>
            <ul className="flex items-center gap-6">
              <li><Link to="/" className="text-gray-700 hover:text-kid-purple transition-colors">خانه</Link></li>
              <li><a href="#services" className="text-gray-700 hover:text-kid-purple transition-colors">خدمات</a></li>
              <li><a href="#gallery" className="text-gray-700 hover:text-kid-purple transition-colors">گالری</a></li>
              <li><Link to="/birthday-gallery" className="text-gray-700 hover:text-kid-purple transition-colors flex items-center gap-1">
                <Cake className="h-4 w-4" />
                <span>جشن تولدها</span>
              </Link></li>
              <li><Link to="/reservation" className="text-gray-700 hover:text-kid-purple transition-colors flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>رزرو</span>
              </Link></li>
              <li><Link to="/toy-store" className="text-gray-700 hover:text-kid-purple transition-colors flex items-center gap-1">
                <Store className="h-4 w-4" />
                <span>فروشگاه</span>
              </Link></li>
              <li><a href="#contact" className="text-gray-700 hover:text-kid-purple transition-colors">تماس با ما</a></li>
            </ul>
          </nav>
          
          <Button variant="default" className="bg-gradient-to-r from-kid-pink to-kid-purple hover:from-kid-purple hover:to-kid-pink">
            <PartyPopper className="mr-2" />
            رزرو جشن تولد
          </Button>
        </div>
        
        <button 
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden pt-4 pb-6 border-t mt-4">
          <nav className="container mx-auto px-4">
            <ul className="flex flex-col gap-4">
              <li><Link to="/" className="text-gray-700 block py-1" onClick={() => setIsMenuOpen(false)}>خانه</Link></li>
              <li><a href="#services" className="text-gray-700 block py-1" onClick={() => setIsMenuOpen(false)}>خدمات</a></li>
              <li><a href="#gallery" className="text-gray-700 block py-1" onClick={() => setIsMenuOpen(false)}>گالری</a></li>
              <li><Link to="/birthday-gallery" className="text-gray-700 block py-1 flex items-center gap-1" onClick={() => setIsMenuOpen(false)}>
                <Cake className="h-4 w-4" />
                <span>جشن تولدها</span>
              </Link></li>
              <li><Link to="/reservation" className="text-gray-700 block py-1 flex items-center gap-1" onClick={() => setIsMenuOpen(false)}>
                <Calendar className="h-4 w-4" />
                <span>رزرو</span>
              </Link></li>
              <li><Link to="/toy-store" className="text-gray-700 block py-1 flex items-center gap-1" onClick={() => setIsMenuOpen(false)}>
                <Store className="h-4 w-4" />
                <span>فروشگاه</span>
              </Link></li>
              <li><a href="#contact" className="text-gray-700 block py-1" onClick={() => setIsMenuOpen(false)}>تماس با ما</a></li>
              <li className="mt-4">
                <Button variant="default" className="w-full bg-kid-pink hover:bg-kid-pink/90">
                  <PartyPopper className="mr-2" />
                  رزرو جشن تولد
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
