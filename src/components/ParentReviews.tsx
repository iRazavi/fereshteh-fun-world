
import React from 'react';
import { Star, Quote } from 'lucide-react';

const ParentReviews = () => {
  const reviews = [
    {
      name: "خانم احمدی",
      rating: 5,
      text: "بچه‌ام عاشق این جا شده! محیط فوق‌العاده امن و مربیان بسیار مهربان. جشن تولدی که اینجا گرفتیم واقعاً فراموش‌نشدنی بود."
    },
    {
      name: "آقای رضایی", 
      rating: 5,
      text: "کیفیت خدمات عالی و قیمت‌ها مناسب. بچه‌ها هم خیلی خوش می‌گذرونن و هم چیزهای جدید یاد می‌گیرن."
    },
    {
      name: "آقای محمدی",
      rating: 5, 
      text: "از اولین روزی که اومدیم عاشق این مجموعه شدیم. فضای بسیار تمیز و مناسب و کادر حرفه‌ای. حتماً دوباره میایم."
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        className={`h-5 w-5 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-kid-purple">نظرات والدین</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            نظرات والدین عزیز که تجربه خوشی با شهربازی فرشته داشته‌اند
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
              <div className="absolute -top-4 -right-4">
                <div className="bg-kid-pink p-3 rounded-full shadow-lg">
                  <Quote className="h-6 w-6 text-white" />
                </div>
              </div>
              
              <div className="text-right">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{review.name}</h3>
                
                <div className="flex justify-end gap-1 mb-4">
                  {renderStars(review.rating)}
                </div>
                
                <p className="text-gray-700 leading-relaxed text-lg">
                  "{review.text}"
                </p>
              </div>
              
              <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-br from-kid-yellow to-kid-orange rounded-full opacity-20"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ParentReviews;
