
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Gallery from '@/components/Gallery';
import ParentReviews from '@/components/ParentReviews';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  React.useEffect(() => {
    document.documentElement.dir = 'rtl';
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <ParentReviews />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
