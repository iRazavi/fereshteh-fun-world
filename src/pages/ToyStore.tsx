import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Filter, Plus, Minus, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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

interface CartItem extends Toy {
  quantity: number;
}

const ToyStore = () => {
  const [toys, setToys] = useState<Toy[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchToys();
  }, []);

  const fetchToys = async () => {
    try {
      const { data, error } = await supabase
        .from('toys')
        .select('*')
        .gt('in_stock', 0)
        .order('name');

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

  const categories = [...new Set(toys.map(toy => toy.category))];
  const ageGroups = [...new Set(toys.map(toy => toy.age_group))];

  const filteredToys = toys.filter(toy => {
    const matchesSearch = toy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         toy.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || toy.category === selectedCategory;
    const matchesAgeGroup = !selectedAgeGroup || toy.age_group === selectedAgeGroup;
    return matchesSearch && matchesCategory && matchesAgeGroup;
  });

  const addToCart = (toy: Toy) => {
    const existingItem = cart.find(item => item.id === toy.id);
    
    if (existingItem) {
      if (existingItem.quantity < toy.in_stock) {
        setCart(cart.map(item =>
          item.id === toy.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
        toast({
          title: "افزوده شد",
          description: `${toy.name} به سبد خرید اضافه شد`,
        });
      } else {
        toast({
          title: "موجودی ناکافی",
          description: "تعداد درخواستی بیش از موجودی است",
          variant: "destructive",
        });
      }
    } else {
      setCart([...cart, { ...toy, quantity: 1 }]);
      toast({
        title: "افزوده شد",
        description: `${toy.name} به سبد خرید اضافه شد`,
      });
    }
  };

  const removeFromCart = (toyId: string) => {
    setCart(cart.filter(item => item.id !== toyId));
  };

  const updateQuantity = (toyId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(toyId);
      return;
    }
    
    const toy = toys.find(t => t.id === toyId);
    if (toy && newQuantity <= toy.in_stock) {
      setCart(cart.map(item =>
        item.id === toyId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
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
            <Store className="h-12 w-12 text-kid-purple" />
            <h1 className="text-4xl font-bold text-gray-800">فروشگاه اسباب‌بازی</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            بهترین اسباب‌بازی‌ها برای کودکان عزیز شما
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="جستجو در اسباب‌بازی‌ها..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kid-purple"
            >
              <option value="">همه دسته‌ها</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={selectedAgeGroup}
              onChange={(e) => setSelectedAgeGroup(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kid-purple"
            >
              <option value="">همه سنین</option>
              {ageGroups.map(ageGroup => (
                <option key={ageGroup} value={ageGroup}>{ageGroup}</option>
              ))}
            </select>

            <Button
              onClick={() => setIsCartOpen(true)}
              className="bg-kid-purple hover:bg-kid-purple/90 relative"
            >
              <ShoppingCart className="ml-2 h-4 w-4" />
              سبد خرید
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">در حال بارگذاری...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredToys.map((toy) => (
              <Card key={toy.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="p-4">
                  {toy.image_url ? (
                    <img
                      src={toy.image_url}
                      alt={toy.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                      <Store className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  <CardTitle className="text-lg">{toy.name}</CardTitle>
                  <CardDescription className="text-sm">{toy.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">دسته‌بندی:</span>
                      <span>{toy.category}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">رده سنی:</span>
                      <span>{toy.age_group}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">موجودی:</span>
                      <span className={toy.in_stock > 5 ? 'text-green-600' : 'text-orange-600'}>
                        {toy.in_stock} عدد
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-green-600">
                      {formatPrice(toy.price)}
                    </span>
                    <Button
                      onClick={() => addToCart(toy)}
                      disabled={toy.in_stock === 0}
                      className="bg-kid-pink hover:bg-kid-pink/90"
                    >
                      <Plus className="ml-1 h-4 w-4" />
                      افزودن
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && filteredToys.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            هیچ محصولی یافت نشد
          </div>
        )}

        {/* Cart Sidebar */}
        {isCartOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
            <div className="bg-white w-96 h-full p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">سبد خرید</h2>
                <Button variant="ghost" onClick={() => setIsCartOpen(false)}>×</Button>
              </div>

              {cart.length === 0 ? (
                <p className="text-gray-500 text-center">سبد خرید خالی است</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="border-b pb-4">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">{formatPrice(item.price)}</p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="px-3 py-1 border rounded">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.in_stock}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          حذف
                        </Button>
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 border-t">
                    <div className="flex justify-between text-lg font-bold">
                      <span>مجموع:</span>
                      <span>{formatPrice(getTotalPrice())}</span>
                    </div>
                    
                    <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                      تکمیل خرید
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ToyStore;
