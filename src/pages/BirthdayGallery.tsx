
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Cake } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// این آرایه با عکس‌های واقعی که کاربر آپلود می‌کند جایگزین خواهد شد
const birthdayImages = [
  // اینجا تصاویر آپلود شده کاربر قرار خواهد گرفت
];

const BirthdayGallery = () => {
  const [selectedImage, setSelectedImage] = useState("");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-kid-purple flex items-center justify-center gap-2">
                <Cake className="h-8 w-8 text-kid-pink" />
                <span>گالری جشن‌های تولد</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                گوشه‌ای از لحظات شاد و خاطره‌انگیز کودکان در جشن‌های تولد شهربازی فرشته
              </p>
            </div>
            
            {birthdayImages.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {birthdayImages.map((image, index) => (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <div 
                        className="relative overflow-hidden rounded-2xl cursor-pointer group h-64 bg-white p-2 shadow-md hover:shadow-xl transition-all duration-300"
                        onClick={() => setSelectedImage(image.src)}
                      >
                        <img 
                          src={image.src} 
                          alt={image.alt} 
                          className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <p className="text-white font-semibold">{image.alt}</p>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl w-[90%] p-0 bg-transparent border-0">
                      <img 
                        src={image.src} 
                        alt={image.alt} 
                        className="w-full h-auto max-h-[80vh] object-contain" 
                      />
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            ) : (
              <div className="text-center p-12 bg-white rounded-lg shadow">
                <Cake className="h-16 w-16 text-kid-pink mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">هنوز عکسی آپلود نشده است</h3>
                <p className="text-gray-600">لطفاً عکس‌های جشن تولد را آپلود کنید تا در این بخش نمایش داده شوند.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BirthdayGallery;
