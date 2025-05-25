
import React, { useState } from 'react';
import { ShoppingCart, Star, Heart, Search } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface Toy {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  inStock: boolean;
  description: string;
}

const ToyStore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<Toy[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const { toast } = useToast();

  React.useEffect(() => {
    document.documentElement.dir = 'rtl';
  }, []);

  const toys: Toy[] = [
    {
      id: 1,
      name: 'ماشین کنترلی',
      price: 250000,
      image: '/lovable-uploads/97a59d89-6c0d-4b08-a39b-741e1a39230e.png',
      category: 'vehicles',
      rating: 4.5,
      inStock: true,
      description: 'ماشین کنترلی زیبا و کیفیت بالا برای کودکان'
    },
    {
      id: 2,
      name: 'عروسک تدی',
      price: 180000,
      image: '/lovable-uploads/50bcd95e-1163-4772-8a43-0ebb0df2466a.png',
      category: 'dolls',
      rating: 5,
      inStock: true,
      description: 'عروسک نرم و دوست‌داشتنی برای کودکان'
    },
    {
      id: 3,
      name: 'پازل آموزشی',
      price: 120000,
      image: '/lovable-uploads/af4816ad-cff9-4037-aa50-5fad4cef4525.png',
      category: 'educational',
      rating: 4.8,
      inStock: true,
      description: 'پازل تعلیمی برای تقویت هوش کودک'
    },
    {
      id: 4,
      name: 'توپ بازی',
      price: 45000,
      image: '/lovable-uploads/fb760065-c240-46c4-9d66-35dcc8537a0c.png',
      category: 'sports',
      rating: 4.2,
      inStock: true,
      description: 'توپ رنگارنگ برای بازی و تفریح'
    },
    {
      id: 5,
      name: 'بلوک‌های ساختنی',
      price: 320000,
      image: '/lovable-uploads/0aa126d7-129e-4b19-a7a4-9ceeede72d7f.png',
      category: 'building',
      rating: 4.7,
      inStock: false,
      description: 'بلوک‌های رنگی برای ساخت و ساز'
    },
    {
      id: 6,
      name: 'کتاب داستان',
      price: 85000,
      image: '/lovable-uploads/282d71b1-3c40-4153-b8aa-5874e54ae266.png',
      category: 'books',
      rating: 4.9,
      inStock: true,
      description: 'کتاب داستان‌های جذاب برای کودکان'
    }
  ];

  const categories = [
    { id: 'all', name: 'همه محصولات' },
    { id: 'vehicles', name: 'وسائل نقلیه' },
    { id: 'dolls', name: 'عروسک' },
    { id: 'educational', name: 'آموزشی' },
    { id: 'sports', name: 'ورزشی' },
    { id: 'building', name: 'ساختنی' },
    { id: 'books', name: 'کتاب' }
  ];

  const filteredToys = toys.filter(toy => {
    const matchesSearch = toy.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || toy.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (toy: Toy) => {
    setCart([...cart, toy]);
    toast({
      title: "به سبد خرید اضافه شد!",
      description: `${toy.name} به سبد خرید شما اضافه شد.`,
    });
  };

  const toggleFavorite = (toyId: number) => {
    if (favorites.includes(toyId)) {
      setFavorites(favorites.filter(id => id !== toyId));
    } else {
      setFavorites([...favorites, toyId]);
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('fa-IR') + ' تومان';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-16 bg-gradient-to-b from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-purple-600">فروشگاه اسباب بازی</h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              بهترین اسباب بازی‌ها را برای فرزندان عزیزتان انتخاب کنید
            </p>
          </div>

          {/* جستجو و فیلتر */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-3 h-4 w-4 text-purple-500" />
              <Input
                placeholder="جستجوی اسباب بازی..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-input bg-background rounded-md"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-md shadow">
              <ShoppingCart className="h-5 w-5 text-purple-500" />
              <span className="text-purple-600 font-semibold">سبد خرید: {cart.length}</span>
            </div>
          </div>

          {/* محصولات */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredToys.map(toy => (
              <Card key={toy.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img 
                    src={toy.image} 
                    alt={toy.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  <button
                    onClick={() => toggleFavorite(toy.id)}
                    className="absolute top-2 left-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                  >
                    <Heart 
                      className={`h-4 w-4 ${favorites.includes(toy.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                    />
                  </button>
                  
                  {!toy.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-bold bg-red-500 px-3 py-1 rounded">ناموجود</span>
                    </div>
                  )}
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg text-purple-700 mb-2">{toy.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{toy.description}</p>
                  
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.floor(toy.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="text-sm text-gray-600 mr-2">({toy.rating})</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-pink-600">{formatPrice(toy.price)}</span>
                    <Button
                      onClick={() => addToCart(toy)}
                      disabled={!toy.inStock}
                      className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-purple-500 hover:to-pink-400 disabled:opacity-50"
                    >
                      <ShoppingCart className="h-4 w-4 ml-2" />
                      خرید
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredToys.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">هیچ محصولی یافت نشد!</p>
            </div>
          )}

          {/* اطلاعات تحویل */}
          <Card className="max-w-4xl mx-auto mt-12">
            <CardHeader>
              <CardTitle className="text-center text-2xl text-purple-600">اطلاعات مهم</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <ShoppingCart className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-bold text-purple-700">تحویل رایگان</h3>
                <p className="text-gray-600">برای خریدهای بالای ۲۰۰ هزار تومان</p>
              </div>
              
              <div className="space-y-2">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Star className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-purple-700">کیفیت تضمینی</h3>
                <p className="text-gray-600">تمام محصولات دارای گارانتی کیفیت</p>
              </div>
              
              <div className="space-y-2">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="font-bold text-purple-700">رضایت ۱۰۰٪</h3>
                <p className="text-gray-600">ضمانت بازگشت وجه تا ۷ روز</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ToyStore;
