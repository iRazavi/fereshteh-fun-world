
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Upload, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ToyForm from './ToyForm';

interface Toy {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  age_group: string;
  in_stock: number;
}

const ToyManagement = () => {
  const [toys, setToys] = useState<Toy[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingToy, setEditingToy] = useState<Toy | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchToys();
  }, []);

  const fetchToys = async () => {
    try {
      const { data, error } = await supabase
        .from('toys')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setToys(data || []);
    } catch (error) {
      console.error('Error fetching toys:', error);
      toast({
        title: "خطا",
        description: "خطا در بارگذاری کالاها",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('آیا از حذف این کالا اطمینان دارید؟')) return;

    try {
      const { error } = await supabase
        .from('toys')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setToys(toys.filter(toy => toy.id !== id));
      toast({
        title: "موفق",
        description: "کالا با موفقیت حذف شد",
      });
    } catch (error) {
      console.error('Error deleting toy:', error);
      toast({
        title: "خطا",
        description: "خطا در حذف کالا",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (toy: Toy) => {
    setEditingToy(toy);
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingToy(null);
    setIsDialogOpen(true);
  };

  const filteredToys = toys.filter(toy =>
    toy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    toy.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>مدیریت کالاهای فروشگاه</CardTitle>
              <CardDescription>افزودن، ویرایش و حذف اسباب‌بازی‌ها</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleAddNew} className="bg-kid-purple hover:bg-kid-purple/90">
                  <Plus className="ml-2 h-4 w-4" />
                  افزودن کالای جدید
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
                <DialogHeader>
                  <DialogTitle>
                    {editingToy ? 'ویرایش کالا' : 'افزودن کالای جدید'}
                  </DialogTitle>
                  <DialogDescription>
                    لطفاً اطلاعات کالا را وارد کنید
                  </DialogDescription>
                </DialogHeader>
                <ToyForm
                  toy={editingToy}
                  onSuccess={() => {
                    setIsDialogOpen(false);
                    fetchToys();
                    setEditingToy(null);
                  }}
                  onCancel={() => {
                    setIsDialogOpen(false);
                    setEditingToy(null);
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="جستجو در کالاها..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">در حال بارگذاری...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>تصویر</TableHead>
                  <TableHead>نام کالا</TableHead>
                  <TableHead>دسته‌بندی</TableHead>
                  <TableHead>قیمت</TableHead>
                  <TableHead>موجودی</TableHead>
                  <TableHead>رده سنی</TableHead>
                  <TableHead>عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredToys.map((toy) => (
                  <TableRow key={toy.id}>
                    <TableCell>
                      {toy.image_url ? (
                        <img
                          src={toy.image_url}
                          alt={toy.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                          <Upload className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{toy.name}</TableCell>
                    <TableCell>{toy.category}</TableCell>
                    <TableCell>{formatPrice(toy.price)}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        toy.in_stock > 10 
                          ? 'bg-green-100 text-green-800' 
                          : toy.in_stock > 0 
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {toy.in_stock} عدد
                      </span>
                    </TableCell>
                    <TableCell>{toy.age_group}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(toy)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(toy.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {!loading && filteredToys.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              هیچ کالایی یافت نشد
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ToyManagement;
