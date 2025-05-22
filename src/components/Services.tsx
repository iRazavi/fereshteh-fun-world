
import React from 'react';
import { PartyPopper, Toys, Image, Lollipop, Dog, Gift } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ServiceCard = ({ 
  icon: Icon, 
  title, 
  description, 
  color 
}: { 
  icon: React.ElementType, 
  title: string, 
  description: string, 
  color: string 
}) => {
  return (
    <Card className="overflow-hidden border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardContent className="p-6 text-center">
        <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${color}`}>
          <Icon className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

const Services = () => {
  const services = [
    {
      icon: PartyPopper,
      title: 'جشن تولد',
      description: 'برگزاری جشن تولد با تم‌های متنوع و جذاب برای کودکان',
      color: 'bg-kid-pink'
    },
    {
      icon: Image,
      title: 'شهر مشاغل',
      description: 'محیطی برای آشنایی کودکان با مشاغل مختلف به صورت عملی و سرگرم‌کننده',
      color: 'bg-kid-blue'
    },
    {
      icon: Lollipop,
      title: 'کافه کودک',
      description: 'محیطی دوستانه برای صرف نوشیدنی و خوراکی‌های سالم و خوشمزه',
      color: 'bg-kid-green'
    },
    {
      icon: Toys,
      title: 'گیم‌نت',
      description: 'بازی‌های رایانه‌ای مناسب سن کودکان با نظارت مربیان',
      color: 'bg-kid-purple'
    },
    {
      icon: Gift,
      title: 'کلاس‌های آموزشی',
      description: 'کلاس‌های آموزشی متنوع از جمله زبان انگلیسی برای کودکان',
      color: 'bg-kid-orange'
    },
    {
      icon: Dog,
      title: 'فضای بازی',
      description: 'محیطی امن و شاد برای بازی و تفریح کودکان',
      color: 'bg-kid-yellow'
    },
  ];

  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-kid-purple">خدمات ما</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            ما در شهربازی فرشته طیف متنوعی از خدمات سرگرمی و آموزشی را برای کودکان شما فراهم کرده‌ایم
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              color={service.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
