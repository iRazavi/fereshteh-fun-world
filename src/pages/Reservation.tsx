import React, { useState } from 'react';
import { Calendar, Clock, Users, Phone, Mail, MessageSquare, PartyPopper, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Reservation = () => {
  const [formData, setFormData] = useState({
    childName: '',
    parentName: '',
    phone: '',
    email: '',
    partyDate: '',
    partyTime: '',
    guestCount: '',
    packageType: '',
    specialRequests: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const packages = [
    { name: 'پکیج ساده', price: 500000, description: 'تزیینات ساده، کیک و شیرینی' },
    { name: 'پکیج طلایی', price: 800000, description: 'تزیینات کامل، کیک، شیرینی و بازی‌ها' },
    { name: 'پکیج VIP', price: 1200000, description: 'تزیینات لوکس، کیک، شیرینی، بازی‌ها و نمایش' }
  ];

  const calculateTotalPrice = () => {
    const selectedPackage = packages.find(pkg => pkg.name === formData.packageType);
    const basePrice = selectedPackage?.price || 0;
    const guestCount = parseInt(formData.guestCount) || 0;
    const extraGuestPrice = guestCount > 10 ? (guestCount - 10) * 50000 : 0;
    return basePrice + extraGuestPrice;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const totalPrice = calculateTotalPrice();
      
      const { error } = await supabase
        .from('reservations')
        .insert({
          child_name: formData.childName,
          parent_name: formData.parentName,
          phone: formData.phone,
          email: formData.email || null,
          party_date: formData.partyDate,
          party_time: formData.partyTime,
          guest_count: parseInt(formData.guestCount),
          package_type: formData.packageType,
          special_requests: formData.specialRequests || null,
          total_price: totalPrice,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "درخواست رزرو ثبت شد",
        description: "درخواست شما با موفقیت ثبت گردید. به زودی با شما تماس خواهیم گرفت.",
      });

      // Reset form
      setFormData({
        childName: '',
        parentName: '',
        phone: '',
        email: '',
        partyDate: '',
        partyTime: '',
        guestCount: '',
        packageType: '',
        specialRequests: ''
      });

    } catch (error) {
      console.error('Error submitting reservation:', error);
      toast({
        title: "خطا",
        description: "خطا در ثبت درخواست رزرو. لطفاً دوباره تلاش کنید.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-kid-pink/20 to-kid-purple/20" dir="rtl">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <PartyPopper className="h-12 w-12 text-kid-purple" />
            <h1 className="text-4xl font-bold text-gray-800">رزرو جشن تولد</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            جشن تولد فراموش‌نشدنی برای کودک عزیزتان در شهربازی فرشته رزرو کنید
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid gap-8 lg:grid-cols-2">
          {/* Reservation Form */}
          <Card>
            <CardHeader>
              <CardTitle>فرم رزرو</CardTitle>
              <CardDescription>لطفاً اطلاعات مورد نیاز را تکمیل کنید</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="childName">نام کودک</Label>
                    <Input
                      id="childName"
                      value={formData.childName}
                      onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                      placeholder="نام کودک"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="parentName">نام والدین</Label>
                    <Input
                      id="parentName"
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      placeholder="نام پدر یا مادر"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">شماره تلفن</Label>
                    <div className="relative">
                      <Phone className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="09123456789"
                        className="pr-10"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">ایمیل (اختیاری)</Label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="example@email.com"
                        className="pr-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="partyDate">تاریخ مهمانی</Label>
                    <div className="relative">
                      <Calendar className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="partyDate"
                        type="date"
                        value={formData.partyDate}
                        onChange={(e) => setFormData({ ...formData, partyDate: e.target.value })}
                        className="pr-10"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="partyTime">ساعت مهمانی</Label>
                    <div className="relative">
                      <Clock className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="partyTime"
                        type="time"
                        value={formData.partyTime}
                        onChange={(e) => setFormData({ ...formData, partyTime: e.target.value })}
                        className="pr-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="guestCount">تعداد مهمان</Label>
                    <div className="relative">
                      <Users className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="guestCount"
                        type="number"
                        min="1"
                        value={formData.guestCount}
                        onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                        placeholder="تعداد مهمان‌ها"
                        className="pr-10"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="packageType">نوع پکیج</Label>
                    <select
                      id="packageType"
                      value={formData.packageType}
                      onChange={(e) => setFormData({ ...formData, packageType: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kid-purple"
                      required
                    >
                      <option value="">انتخاب پکیج</option>
                      {packages.map((pkg) => (
                        <option key={pkg.name} value={pkg.name}>
                          {pkg.name} - {formatPrice(pkg.price)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="specialRequests">درخواست‌های ویژه (اختیاری)</Label>
                  <div className="relative">
                    <MessageSquare className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <textarea
                      id="specialRequests"
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      placeholder="درخواست‌های خاص شما..."
                      className="w-full min-h-[100px] px-3 py-2 pr-10 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-kid-purple"
                    />
                  </div>
                </div>

                {formData.packageType && formData.guestCount && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2">خلاصه رزرو:</h3>
                    <p className="text-green-700">مبلغ کل: <span className="font-bold">{formatPrice(calculateTotalPrice())}</span></p>
                    {parseInt(formData.guestCount) > 10 && (
                      <p className="text-sm text-green-600 mt-1">
                        * هزینه اضافی برای {parseInt(formData.guestCount) - 10} مهمان اضافی محاسبه شده
                      </p>
                    )}
                  </div>
                )}

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-kid-pink to-kid-purple hover:from-kid-purple hover:to-kid-pink text-white py-3 text-lg"
                >
                  {loading ? 'در حال ثبت...' : 'ثبت درخواست رزرو'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Package Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>پکیج‌های تولد</CardTitle>
                <CardDescription>پکیج مناسب برای جشن تولد کودکتان انتخاب کنید</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {packages.map((pkg) => (
                  <div key={pkg.name} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{pkg.name}</h3>
                      <span className="text-lg font-bold text-green-600">{formatPrice(pkg.price)}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{pkg.description}</p>
                  </div>
                ))}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>توجه:</strong> برای بیش از 10 مهمان، هزینه اضافی 50,000 تومان به ازای هر نفر محاسبه می‌شود.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>اطلاعات تماس برای رزرو</CardTitle>
                <CardDescription>لطفاً جهت رزرو جشن تولد با ما تماس بگیرید</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-kid-purple" />
                    <div>
                      <p className="font-medium">شماره تماس:</p>
                      <p className="text-lg font-bold text-kid-purple">09917037267</p>
                      <p className="text-lg font-bold text-kid-purple">07152451323</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Instagram className="h-5 w-5 text-pink-500" />
                    <div>
                      <p className="font-medium">صفحه اینستاگرام:</p>
                      <a 
                        href="https://instagram.com/share_bazi_fereshte" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-pink-500 hover:underline"
                      >
                        @share_bazi_fereshte
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Reservation;
