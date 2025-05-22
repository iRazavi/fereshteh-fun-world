
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Baby } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  React.useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    document.documentElement.dir = 'rtl';
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <Baby className="h-20 w-20 text-kid-pink opacity-80" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-kid-purple">404</h1>
        <p className="text-xl text-gray-600 mb-8">صفحه مورد نظر یافت نشد</p>
        <Button asChild className="bg-kid-pink hover:bg-kid-purple text-white rounded-full px-8 py-6">
          <Link to="/">بازگشت به صفحه اصلی</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
