
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { CircleCheck, Phone, Instagram, MapPin } from 'lucide-react';

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
                <div className="bg-blue-50 rounded-3xl p-6 border border-kid-blue/20">
                  <div className="flex items-start justify-end gap-3 mb-4">
                    <div>
                      <h4 className="font-bold text-kid-blue mb-2">آدرس:</h4>
                      <p className="text-gray-700 mb-3">
                        استان فارس، شهرستان گراش<br/>
                        نگین جنوب، دروازه، M47P+CH5, Iran
                      </p>
                      <a 
                        href="https://maps.google.com/?q=M47P+CH5,Iran" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        مشاهده در نقشه
                      </a>
                    </div>
                    <MapPin className="text-kid-blue h-6 w-6 flex-shrink-0 mt-1" />
                  </div>
                </div>

                <div className="bg-green-50 rounded-3xl p-6 border border-green-200">
                  <div className="flex items-start justify-end gap-3 mb-4">
                    <div>
                      <h4 className="font-bold text-green-700 mb-2">آدرس محل کسب‌وکار:</h4>
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
                    <p className="text-lg font-bold text-kid-purple">09917037267</p>
                    <p className="text-lg font-bold text-kid-purple">07152451323</p>
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
                  <span className="text-gray-700">9:00 - 21:00</span>
                  <span className="font-medium text-gray-800">شنبه تا چهارشنبه</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-700">9:00 - 22:00</span>
                  <span className="font-medium text-gray-800">پنجشنبه و جمعه</span>
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
