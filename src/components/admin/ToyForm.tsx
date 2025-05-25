
import React, { useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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

interface ToyFormProps {
  toy?: Toy | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const ToyForm: React.FC<ToyFormProps> = ({ toy, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    image_url: '',
    category: '',
    age_group: '',
    in_stock: 0,
  });
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (toy) {
      setFormData({
        name: toy.name || '',
        description: toy.description || '',
        price: toy.price || 0,
        image_url: toy.image_url || '',
        category: toy.category || '',
        age_group: toy.age_group || '',
        in_stock: toy.in_stock || 0,
      });
      setImagePreview(toy.image_url || '');
    }
  }, [toy]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `toys/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('toy-images')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('toy-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.image_url;

      // Upload new image if selected
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const toyData = {
        ...formData,
        image_url: imageUrl,
        price: Number(formData.price),
        in_stock: Number(formData.in_stock),
      };

      let error;
      if (toy) {
        // Update existing toy
        const { error: updateError } = await supabase
          .from('toys')
          .update(toyData)
          .eq('id', toy.id);
        error = updateError;
      } else {
        // Create new toy
        const { error: insertError } = await supabase
          .from('toys')
          .insert(toyData);
        error = insertError;
      }

      if (error) throw error;

      toast({
        title: "موفق",
        description: toy ? "کالا با موفقیت بروزرسانی شد" : "کالای جدید با موفقیت اضافه شد",
      });

      onSuccess();
    } catch (error) {
      console.error('Error saving toy:', error);
      toast({
        title: "خطا",
        description: "خطا در ذخیره کالا",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    'عروسک',
    'ماشین',
    'آموزشی',
    'ساختنی',
    'ورزشی',
    'فکری',
    'موسیقی',
    'هنری'
  ];

  const ageGroups = [
    '0-2 سال',
    '2-5 سال',
    '5-8 سال',
    '8-12 سال',
    '12+ سال'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">نام کالا</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="نام اسباب‌بازی را وارد کنید"
          required
        />
      </div>

      <div>
        <Label htmlFor="description">توضیحات</Label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="توضیحات کالا"
          className="w-full min-h-[80px] px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-kid-purple"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="price">قیمت (تومان)</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            placeholder="قیمت"
            required
          />
        </div>

        <div>
          <Label htmlFor="in_stock">موجودی</Label>
          <Input
            id="in_stock"
            type="number"
            value={formData.in_stock}
            onChange={(e) => setFormData({ ...formData, in_stock: Number(e.target.value) })}
            placeholder="تعداد موجودی"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">دسته‌بندی</Label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kid-purple"
            required
          >
            <option value="">انتخاب دسته‌بندی</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="age_group">رده سنی</Label>
          <select
            id="age_group"
            value={formData.age_group}
            onChange={(e) => setFormData({ ...formData, age_group: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kid-purple"
            required
          >
            <option value="">انتخاب رده سنی</option>
            {ageGroups.map((age) => (
              <option key={age} value={age}>{age}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor="image">تصویر کالا</Label>
        <div className="mt-2">
          {imagePreview && (
            <div className="mb-4 relative inline-block">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg border"
              />
              <button
                type="button"
                onClick={() => {
                  setImagePreview('');
                  setImageFile(null);
                  setFormData({ ...formData, image_url: '' });
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          
          <div className="flex items-center gap-4">
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <label
              htmlFor="image"
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
            >
              <Upload className="h-4 w-4" />
              انتخاب تصویر
            </label>
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Button type="submit" disabled={loading} className="bg-kid-purple hover:bg-kid-purple/90">
          {loading ? 'در حال ذخیره...' : (toy ? 'بروزرسانی' : 'افزودن')}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          لغو
        </Button>
      </div>
    </form>
  );
};

export default ToyForm;
