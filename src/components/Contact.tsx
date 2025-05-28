
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { CircleCheck, Phone, Instagram, MapPin, Shield, Heart, Star, Clock } from 'lucide-react';

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  
  const onSubmit = (data: any) => {
    console.log('Feedback data:', data);
    toast({
      title: "نظر شما با موفقیت ثبت شد",
      description: "از بازخورد ارزشمند شما متشکریم.",
      duration: 5000,
    });
    reset();
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* About Us Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-kid-purple">درباره ما</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-kid-pink to-kid-purple mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Why Fereshte Playground */}
            <Card className="border-2 border-kid-blue/20 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-right">
                <div className="flex justify-end mb-4">
                  <div className="bg-kid-blue/10 p-3 rounded-full">
                    <Star className="h-6 w-6 text-kid-blue" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-kid-blue">چرا شهربازی فرشته؟</h3>
                <p className="text-gray-700 leading-relaxed">
                  شهربازی فرشته با محیطی کاملاً امن و شاد، کادری حرفه‌ای و دلسوز و برنامه‌های متنوع آموزشی و تفریحی، بهترین انتخاب برای رشد، آموزش و شادی کودکان شماست. ما فضایی فراهم کرده‌ایم که کودکان علاوه بر بازی، مهارت‌های جدید یاد بگیرند و لحظاتی به‌یادماندنی را تجربه کنند.
                </p>
              </CardContent>
            </Card>

            {/* Safety and Hygiene */}
            <Card className="border-2 border-green-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-right">
                <div className="flex justify-end mb-4">
                  <div className="bg-green-50 p-3 rounded-full">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-green-700">ایمنی و بهداشت؛ اولویت ما</h3>
                <p className="text-gray-700 leading-relaxed">
                  تمامی تجهیزات بازی و فضای شهربازی فرشته به طور مرتب ضدعفونی شده و تحت نظارت دقیق بهداشتی قرار دارد تا شما و کودکان عزیزتان در محیطی کاملاً ایمن و سالم، با خیال راحت لحظات شادی را تجربه کنید.
                </p>
              </CardContent>
            </Card>

            {/* Visit Us Today */}
            <Card className="border-2 border-kid-pink/20 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-right">
                <div className="flex justify-end mb-4">
                  <div className="bg-kid-pink/10 p-3 rounded-full">
                    <Heart className="h-6 w-6 text-kid-pink" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-kid-pink">همین امروز به ما سر بزنید!</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  برای تجربه‌ای شاد، آموزنده و متفاوت، دعوت می‌کنیم همین امروز به شهربازی فرشته بیایید و لحظاتی پر از خنده و شادی را در کنار کودکانتان سپری کنید. منتظر دیدار شما هستیم!
                </p>
                <Button className="w-full bg-gradient-to-r from-kid-pink to-kid-purple hover:from-kid-purple hover:to-kid-pink text-white">
                  رزرو کنید
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Additional Features */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-kid-purple text-center">ویژگی‌های خاص شهربازی فرشته</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-3 shadow-md">
                  <Shield className="h-8 w-8 text-green-500 mx-auto" />
                </div>
                <h4 className="font-bold text-gray-800 mb-2">محیط امن</h4>
                <p className="text-sm text-gray-600">نظارت 24 ساعته و تجهیزات استاندارد</p>
              </div>
              <div className="text-center">
                <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-3 shadow-md">
                  <Heart className="h-8 w-8 text-kid-pink mx-auto" />
                </div>
                <h4 className="font-bold text-gray-800 mb-2">کادر مجرب</h4>
                <p className="text-sm text-gray-600">پرسنل حرفه‌ای و دوستدار کودک</p>
              </div>
              <div className="text-center">
                <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-3 shadow-md">
                  <Star className="h-8 w-8 text-kid-yellow mx-auto" />
                </div>
                <h4 className="font-bold text-gray-800 mb-2">برنامه‌های متنوع</h4>
                <p className="text-sm text-gray-600">فعالیت‌های آموزشی و تفریحی</p>
              </div>
              <div className="text-center">
                <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-3 shadow-md">
                  <Clock className="h-8 w-8 text-kid-blue mx-auto" />
                </div>
                <h4 className="font-bold text-gray-800 mb-2">ساعات مناسب</h4>
                <p className="text-sm text-gray-600">17:00 تا 24:00 همه روزه</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-kid-purple">تماس با ما</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            برای ارتباط با ما، ثبت نظرات و پیشنهادات خود را از طریق فرم زیر یا اطلاعات تماس ارسال کنید
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Card className="border-2 border-kid-purple/20 shadow-lg">
            <CardContent className="p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-6 text-kid-purple text-right">ثبت نظرات و پیشنهادات</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-right">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">نام و نام خانوادگی</label>
                  <Input 
                    {...register('name', { required: true })} 
                    className="w-full text-right" 
                    placeholder="نام خود را وارد کنید"
                    dir="rtl"
                  />
                  {errors.name && <span className="text-red-500 text-xs">این فیلد الزامی است</span>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">شماره تماس</label>
                  <Input 
                    {...register('phone', { required: true })} 
                    className="w-full text-right" 
                    placeholder="شماره تماس خود را وارد کنید"
                    dir="rtl"
                  />
                  {errors.phone && <span className="text-red-500 text-xs">این فیلد الزامی است</span>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">موضوع نظر</label>
                  <select 
                    {...register('subject', { required: true })} 
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-kid-purple focus:border-transparent text-right"
                    dir="rtl"
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="service">نظر در مورد خدمات</option>
                    <option value="facility">نظر در مورد امکانات</option>
                    <option value="staff">نظر در مورد پرسنل</option>
                    <option value="suggestion">پیشنهاد</option>
                    <option value="complaint">شکایت</option>
                    <option value="other">سایر</option>
                  </select>
                  {errors.subject && <span className="text-red-500 text-xs">این فیلد الزامی است</span>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">نظر یا پیشنهاد شما</label>
                  <Textarea 
                    {...register('message', { required: true })} 
                    className="w-full min-h-[120px] text-right" 
                    placeholder="نظر یا پیشنهاد خود را وارد کنید"
                    dir="rtl"
                  />
                  {errors.message && <span className="text-red-500 text-xs">این فیلد الزامی است</span>}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-kid-pink hover:bg-kid-purple text-white rounded-full py-6"
                >
                  ثبت نظر
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-kid-purple text-right">اطلاعات تماس</h3>
              <div className="space-y-6 text-right">
                <div className="bg-green-50 rounded-3xl p-6 border border-green-200">
                  <div className="flex items-start justify-end gap-3 mb-4">
                    <div>
                      <h4 className="font-bold text-green-700 mb-2">آدرس:</h4>
                      <p className="text-gray-700 mb-3">
                        گراش - خیابان بازار - جنب آموزشگاه رانندگی - ساختمان فرشته
                      </p>
                      <a 
                        href="https://maps.google.com/?q=گراش+خیابان+بازار+آموزشگاه+رانندگی" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline text-sm"
                      >
                        مشاهده در نقشه
                      </a>
                    </div>
                    <MapPin className="text-green-600 h-6 w-6 flex-shrink-0 mt-1" />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3">
                  <div>
                    <p className="font-bold text-gray-800 mb-1">شماره تماس:</p>
                    <div className="flex items-center gap-2 justify-end">
                      <p className="text-lg font-bold text-kid-purple">09917037267</p>
                      <a 
                        href="tel:09917037267" 
                        className="text-green-500 hover:text-green-600 transition-colors"
                        title="تماس مستقیم"
                      >
                        <Phone className="h-5 w-5" />
                      </a>
                    </div>
                    <div className="flex items-center gap-2 justify-end">
                      <p className="text-lg font-bold text-kid-purple">07152451323</p>
                      <a 
                        href="tel:07152451323" 
                        className="text-green-500 hover:text-green-600 transition-colors"
                        title="تماس مستقیم"
                      >
                        <Phone className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                  <Phone className="text-kid-purple h-6 w-6 flex-shrink-0" />
                </div>

                <div className="flex items-center justify-end gap-3">
                  <div>
                    <p className="font-bold text-gray-800 mb-1">صفحه اینستاگرام:</p>
                    <a 
                      href="https://instagram.com/share_bazi_fereshte" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-pink-500 hover:underline font-medium"
                    >
                      @share_bazi_fereshte
                    </a>
                  </div>
                  <Instagram className="text-pink-500 h-6 w-6 flex-shrink-0" />
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-blue-50 rounded-3xl p-6 border border-kid-blue/20">
              <h4 className="text-xl font-bold mb-4 text-kid-blue text-right">ساعات کار</h4>
              <div className="space-y-2 text-right">
                <p className="flex justify-between">
                  <span className="text-gray-700">17:00 - 24:00</span>
                  <span className="font-medium text-gray-800">همه روزه</span>
                </p>
              </div>
            </div>
            
            <div className="mt-8 bg-yellow-50 rounded-3xl p-6 border border-kid-yellow/30">
              <h4 className="text-xl font-bold mb-4 text-kid-orange text-right">شعار ما</h4>
              <p className="text-gray-700 text-lg text-right">
                مکانی آرام برای کودکان شما
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
