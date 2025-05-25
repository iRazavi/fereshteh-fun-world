
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Cake, PartyPopper, Gift, Image } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// اضافه کردن عکس‌های آپلود شده در آرایه
const birthdayImages = [
  {
    src: "/lovable-uploads/3d569e54-f969-4d00-934b-93f5d75ecf59.png",
    alt: "جشن تولد دو سالگی با تم دایناسور",
    description: "جا مونده از تولد دیروز"
  },
  {
    src: "/lovable-uploads/3d55dfa6-b800-410c-8bc6-cd14247854c9.png",
    alt: "جشن تولد الینا با کیک یونیکورن",
    description: "الینا خوشگلم"
  },
  {
    src: "/lovable-uploads/e0755a03-7eb8-407b-8cbd-4f88a56c2460.png",
    alt: "جشن تولد با کاراکترهای کارتونی",
    description: "مهمونای ویژمون"
  },
  {
    src: "/lovable-uploads/282d71b1-3c40-4153-b8aa-5874e54ae266.png",
    alt: "جشن تولد ده سالگی با تم فوتبال",
    description: "آقای متولد"
  }
];

const BirthdayGallery = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  // محاسبه تعداد کل صفحات
  const totalPages = Math.ceil(birthdayImages.length / itemsPerPage);
  
  // عکس‌های مربوط به صفحه فعلی
  const currentImages = birthdayImages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="py-16 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <PartyPopper className="h-8 w-8 text-pink-500 animate-bounce" />
                <h2 className="text-3xl md:text-4xl font-bold text-purple-600 flex items-center justify-center gap-2">
                  <Cake className="h-8 w-8 text-pink-500" />
                  <span>گالری جشن‌های تولد</span>
                </h2>
                <Gift className="h-8 w-8 text-blue-500 animate-bounce" />
              </div>
              <p className="text-purple-600 font-semibold max-w-2xl mx-auto">
                گوشه‌ای از لحظات شاد و خاطره‌انگیز کودکان در جشن‌های تولد شهربازی فرشته
              </p>
            </div>
            
            {birthdayImages.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentImages.map((image, index) => (
                    <Dialog key={index}>
                      <DialogTrigger asChild>
                        <Card className="overflow-hidden cursor-pointer group hover:ring-2 hover:ring-kid-pink transition-all duration-300">
                          <CardContent className="p-3">
                            <div className="relative h-64 rounded-xl overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-br from-kid-pink via-kid-yellow to-kid-blue opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                              <img 
                                src={image.src} 
                                alt={image.alt} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                <p className="text-white font-semibold">{image.alt}</p>
                                <p className="text-white/80 text-sm">{image.description}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl w-[90%] p-0 bg-transparent border-0">
                        <img 
                          src={image.src} 
                          alt={image.alt} 
                          className="w-full h-auto max-h-[80vh] object-contain rounded-lg" 
                        />
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
                
                {totalPages > 1 && (
                  <Pagination className="mt-10">
                    <PaginationContent dir="rtl">
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                          className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                          aria-disabled={currentPage === 1}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink 
                            isActive={currentPage === i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                          className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                          aria-disabled={currentPage === totalPages}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            ) : (
              <div className="text-center p-12 bg-white rounded-lg shadow">
                <Image className="h-16 w-16 text-kid-pink mx-auto mb-4" />
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
