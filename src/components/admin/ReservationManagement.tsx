
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Phone, Mail, MessageSquare, Check, X, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Reservation {
  id: string;
  child_name: string;
  parent_name: string;
  phone: string;
  email: string;
  party_date: string;
  party_time: string;
  guest_count: number;
  package_type: string;
  special_requests: string;
  total_price: number;
  status: string;
  created_at: string;
}

const ReservationManagement = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReservations(data || []);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      toast({
        title: "خطا",
        description: "خطا در بارگذاری رزروها",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateReservationStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('reservations')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setReservations(reservations.map(res => 
        res.id === id ? { ...res, status } : res
      ));

      toast({
        title: "موفق",
        description: `وضعیت رزرو به ${getStatusLabel(status)} تغییر یافت`,
      });
    } catch (error) {
      console.error('Error updating reservation status:', error);
      toast({
        title: "خطا",
        description: "خطا در بروزرسانی وضعیت رزرو",
        variant: "destructive",
      });
    }
  };

  const getStatusLabel = (status: string) => {
    const statusLabels: { [key: string]: string } = {
      'pending': 'در انتظار',
      'confirmed': 'تایید شده',
      'cancelled': 'لغو شده',
      'completed': 'تکمیل شده'
    };
    return statusLabels[status] || status;
  };

  const getStatusColor = (status: string) => {
    const statusColors: { [key: string]: string } = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'confirmed': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800',
      'completed': 'bg-blue-100 text-blue-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fa-IR');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  const filteredReservations = reservations.filter(reservation =>
    reservation.child_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reservation.parent_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reservation.phone.includes(searchTerm)
  );

  const showReservationDetails = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsDetailDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>مدیریت رزروهای جشن تولد</CardTitle>
          <CardDescription>مشاهده و مدیریت درخواست‌های رزرو</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Input
                placeholder="جستجو براساس نام کودک، والدین یا شماره تلفن..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">در حال بارگذاری...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>نام کودک</TableHead>
                  <TableHead>نام والدین</TableHead>
                  <TableHead>تاریخ مهمانی</TableHead>
                  <TableHead>تعداد مهمان</TableHead>
                  <TableHead>پکیج</TableHead>
                  <TableHead>مبلغ کل</TableHead>
                  <TableHead>وضعیت</TableHead>
                  <TableHead>عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReservations.map((reservation) => (
                  <TableRow key={reservation.id}>
                    <TableCell className="font-medium">{reservation.child_name}</TableCell>
                    <TableCell>{reservation.parent_name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        {formatDate(reservation.party_date)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-gray-400" />
                        {reservation.guest_count} نفر
                      </div>
                    </TableCell>
                    <TableCell>{reservation.package_type}</TableCell>
                    <TableCell>{formatPrice(reservation.total_price || 0)}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(reservation.status)}`}>
                        {getStatusLabel(reservation.status)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => showReservationDetails(reservation)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {reservation.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                              className="text-green-600 hover:text-green-700"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {!loading && filteredReservations.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              هیچ رزروی یافت نشد
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reservation Details Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl" dir="rtl">
          <DialogHeader>
            <DialogTitle>جزئیات رزرو</DialogTitle>
            <DialogDescription>
              اطلاعات کامل درخواست رزرو
            </DialogDescription>
          </DialogHeader>
          
          {selectedReservation && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">نام کودک:</label>
                  <p className="text-gray-900">{selectedReservation.child_name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">نام والدین:</label>
                  <p className="text-gray-900">{selectedReservation.parent_name}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">شماره تلفن:</label>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <p className="text-gray-900">{selectedReservation.phone}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">ایمیل:</label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <p className="text-gray-900">{selectedReservation.email || 'وارد نشده'}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">تاریخ مهمانی:</label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <p className="text-gray-900">{formatDate(selectedReservation.party_date)}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">ساعت مهمانی:</label>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <p className="text-gray-900">{selectedReservation.party_time}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">تعداد مهمان:</label>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <p className="text-gray-900">{selectedReservation.guest_count} نفر</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">نوع پکیج:</label>
                  <p className="text-gray-900">{selectedReservation.package_type}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">مبلغ کل:</label>
                <p className="text-lg font-bold text-green-600">{formatPrice(selectedReservation.total_price || 0)}</p>
              </div>

              {selectedReservation.special_requests && (
                <div>
                  <label className="text-sm font-medium text-gray-700">درخواست‌های ویژه:</label>
                  <div className="flex items-start gap-2 mt-1">
                    <MessageSquare className="h-4 w-4 text-gray-400 mt-1" />
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedReservation.special_requests}</p>
                  </div>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-700">وضعیت:</label>
                <span className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(selectedReservation.status)}`}>
                  {getStatusLabel(selectedReservation.status)}
                </span>
              </div>

              <div className="flex gap-2 pt-4">
                {selectedReservation.status === 'pending' && (
                  <>
                    <Button
                      onClick={() => {
                        updateReservationStatus(selectedReservation.id, 'confirmed');
                        setIsDetailDialogOpen(false);
                      }}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      تایید رزرو
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        updateReservationStatus(selectedReservation.id, 'cancelled');
                        setIsDetailDialogOpen(false);
                      }}
                      className="text-red-600 border-red-600 hover:bg-red-50"
                    >
                      لغو رزرو
                    </Button>
                  </>
                )}
                <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
                  بستن
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReservationManagement;
