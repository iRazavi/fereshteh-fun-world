
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

const galleryImages = [
  {
    src: "/lovable-uploads/97a59d89-6c0d-4b08-a39b-741e1a39230e.png",
    alt: "فضای بازی کودکان",
  },
  {
    src: "/lovable-uploads/af4816ad-cff9-4037-aa50-5fad4cef4525.png",
    alt: "کلاس آموزشی کودکان",
  },
  {
    src: "/lovable-uploads/50bcd95e-1163-4772-8a43-0ebb0df2466a.png",
    alt: "فعالیت های آموزشی",
  },
  {
    src: "/lovable-uploads/0aa126d7-129e-4b19-a7a4-9ceeede72d7f.png",
    alt: "فروشگاه پیتزا در شهر مشاغل",
  },
  {
    src: "/lovable-uploads/fb760065-c240-46c4-9d66-35dcc8537a0c.png",
    alt: "کودک در استخر توپ",
  },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState("");
  
  return (
    <section id="gallery" className="py-16 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 rainbow-title">گالری تصاویر</h2>
          <p className="text-kid-purple font-semibold max-w-2xl mx-auto">
            گوشه‌ای از لحظات شاد و خاطره‌انگیز کودکان در شهربازی فرشته
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <div 
                  className="relative overflow-hidden rounded-2xl cursor-pointer group h-64 bg-white p-2 shadow-md hover:shadow-xl transition-all duration-300"
                  onClick={() => setSelectedImage(image.src)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-kid-pink via-kid-yellow to-kid-blue opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
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
      </div>
    </section>
  );
};

export default Gallery;
