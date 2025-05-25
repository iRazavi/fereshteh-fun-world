
import React, { useState } from 'react';
import { Calendar, Clock, Users, Phone, Mail, User } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Reservation = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    guests: '',
    service: ''
  });
  const { toast } = useToast();

  React.useEffect(() => {
    document.documentElement.dir = 'rtl';
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "رزرو شما ثبت شد!",
      description: "ما به زودی با شما تماس خواهیم گرفت.",
    });
    setFormData({
      name: '',
      phone: '',
      email: '',
      date: '',
      time: '',
      guests: '',
      service: ''
    });
  };

  const services = [
    { id: 'birthday', name: 'جشن تولد', price: '500,000 تومان' },
    { id: 'party', name: 'مهمانی کودک', price: '300,000 تومان' },
    { id: 'education', name: 'کلاس آموزشی', price: '150,000 تومان' },
    { id: 'gaming', name: 'گیم‌نت', price: '50,000 تومان ساعتی' },
    { id: 'cafe', name: 'کافه کودک', price: 'بر اساس سفارش' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-16 bg-gradient-to-b from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-purple-600">رزرو آنلاین</h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              رزرو خود را به راحتی انجام دهید و از خدمات شهربازی فرشته لذت ببرید
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* فرم رزرو */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-600 text-center">فرم رزرو</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-purple-600 font-semibold">نام و نام خانوادگی</Label>
                      <div className="relative">
                        <User className="absolute right-3 top-3 h-4 w-4 text-purple-500" />
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="pr-10"
                          placeholder="نام خود را وارد کنید"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="phone" className="text-purple-600 font-semibold">شماره تماس</Label>
                      <div className="relative">
                        <Phone className="absolute right-3 top-3 h-4 w-4 text-purple-500" />
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="pr-10"
                          placeholder="09123456789"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-purple-600 font-semibold">ایمیل (اختیاری)</Label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-3 h-4 w-4 text-purple-500" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pr-10"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date" className="text-purple-600 font-semibold">تاریخ</Label>
                      <div className="relative">
                        <Calendar className="absolute right-3 top-3 h-4 w-4 text-purple-500" />
                        <Input
                          id="date"
                          name="date"
                          type="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          className="pr-10"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="time" className="text-purple-600 font-semibold">ساعت</Label>
                      <div className="relative">
                        <Clock className="absolute right-3 top-3 h-4 w-4 text-purple-500" />
                        <select
                          id="time"
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          className="w-full h-10 px-3 pr-10 border border-input bg-background rounded-md"
                          required
                        >
                          <option value="">انتخاب ساعت</option>
                          <option value="9:00">9:00</option>
                          <option value="11:00">11:00</option>
                          <option value="14:00">14:00</option>
                          <option value="16:00">16:00</option>
                          <option value="18:00">18:00</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="guests" className="text-purple-600 font-semibold">تعداد نفرات</Label>
                      <div className="relative">
                        <Users className="absolute right-3 top-3 h-4 w-4 text-purple-500" />
                        <Input
                          id="guests"
                          name="guests"
                          type="number"
                          min="1"
                          max="50"
                          value={formData.guests}
                          onChange={handleInputChange}
                          className="pr-10"
                          placeholder="تعداد کودکان"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="service" className="text-purple-600 font-semibold">نوع خدمات</Label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 border border-input bg-background rounded-md"
                        required
                      >
                        <option value="">انتخاب خدمات</option>
                        {services.map(service => (
                          <option key={service.id} value={service.id}>
                            {service.name} - {service.price}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-gradient-to-r from-pink-400 to-purple-500 hover:from-purple-500 hover:to-pink-400 text-white py-3 text-lg">
                    ثبت رزرو
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* لیست قیمت‌ها */}
            <div className="space-y-6">
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-purple-600 text-center">لیست قیمت‌ها</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {services.map(service => (
                      <div key={service.id} className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                        <span className="font-semibold text-purple-700">{service.name}</span>
                        <span className="text-pink-600 font-bold">{service.price}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl text-purple-600 text-center">اطلاعات تماس</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <p className="text-gray-700">
                    <strong>تلفن:</strong> 09917037267 | 07152451323
                  </p>
                  <p className="text-gray-700">
                    <strong>آدرس:</strong> گراش - خیابان بازار - جنب آموزشگاه رانندگی - ساختمان فرشته
                  </p>
                  <p className="text-sm text-purple-600">
                    ساعات کاری: روزهای زوج 9 صبح تا 9 شب
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Reservation;
