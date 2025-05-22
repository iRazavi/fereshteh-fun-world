
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { CircleCheck } from 'lucide-react';

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  
  const onSubmit = (data: any) => {
    console.log('Form data:', data);
    toast({
      title: "پیام شما با موفقیت ارسال شد",
      description: "به زودی با شما تماس خواهیم گرفت.",
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
            برای رزرو تولد، ثبت‌نام در کلاس‌ها، یا هرگونه سوال با ما در تماس باشید
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Card className="border-2 border-kid-purple/20 shadow-lg">
            <CardContent className="p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-6 text-kid-purple text-right">فرم رزرو</h3>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">نوع درخواست</label>
                  <select 
                    {...register('requestType', { required: true })} 
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-kid-purple focus:border-transparent text-right"
                    dir="rtl"
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="birthday">رزرو تولد</option>
                    <option value="class">ثبت‌نام کلاس</option>
                    <option value="question">سوال</option>
                  </select>
                  {errors.requestType && <span className="text-red-500 text-xs">این فیلد الزامی است</span>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">پیام</label>
                  <Textarea 
                    {...register('message')} 
                    className="w-full min-h-[120px] text-right" 
                    placeholder="پیام خود را وارد کنید"
                    dir="rtl"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-kid-pink hover:bg-kid-purple text-white rounded-full py-6"
                >
                  ارسال پیام
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-kid-purple text-right">اطلاعات تماس</h3>
              <div className="space-y-4 text-right">
                <p className="flex items-center justify-end gap-2">
                  <span className="text-gray-700">گراش - خیابان بازار - جنب آموزشگاه رانندگی - ساختمان فرشته</span>
                  <CircleCheck className="text-kid-green h-5 w-5 flex-shrink-0" />
                </p>
                <p className="flex items-center justify-end gap-2">
                  <span className="text-gray-700 font-medium">09917037267</span>
                  <CircleCheck className="text-kid-green h-5 w-5 flex-shrink-0" />
                </p>
                <p className="flex items-center justify-end gap-2">
                  <span className="text-gray-700 font-medium">07152451323</span>
                  <CircleCheck className="text-kid-green h-5 w-5 flex-shrink-0" />
                </p>
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
