
import React, { useState } from 'react';
import { Settings, Package, Calendar, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ToyManagement from '@/components/admin/ToyManagement';
import ReservationManagement from '@/components/admin/ReservationManagement';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('toys');

  const tabs = [
    { id: 'toys', label: 'مدیریت کالاها', icon: Package },
    { id: 'reservations', label: 'مدیریت رزروها', icon: Calendar },
    { id: 'stats', label: 'آمار', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Settings className="h-8 w-8 text-kid-purple" />
            <h1 className="text-2xl font-bold text-gray-800">پنل مدیریتی شهربازی فرشته</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  className={`w-full justify-start gap-3 ${
                    activeTab === tab.id 
                      ? 'bg-kid-purple text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon className="h-5 w-5" />
                  {tab.label}
                </Button>
              );
            })}
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'toys' && <ToyManagement />}
            {activeTab === 'reservations' && <ReservationManagement />}
            {activeTab === 'stats' && (
              <Card>
                <CardHeader>
                  <CardTitle>آمار و گزارشات</CardTitle>
                  <CardDescription>آمار کلی عملکرد شهربازی</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">این بخش در حال توسعه است.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
