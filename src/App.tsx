import React from 'react';
import { CanteenProvider, useCanteen } from './context/CanteenContext';
import { Navbar } from './components/Navbar';
import { VercelBanner } from './components/VercelBanner';
import { CustomerMenu } from './components/CustomerMenu';
import { KitchenDisplay } from './components/KitchenDisplay';
import { AdminDashboard } from './components/AdminDashboard';
import { MyOrdersView } from './components/MyOrdersView';
import { VercelHelperView } from './components/VercelHelperView';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { CanteenCardModal } from './components/CanteenCardModal';

const MainLayout: React.FC = () => {
  const { activeView } = useCanteen();

  return (
    <div className="min-h-screen bg-stone-100/60 text-stone-900 font-sans flex flex-col selection:bg-orange-500 selection:text-white">
      {/* Vercel Status notification bar */}
      <VercelBanner />

      {/* Main App Bar */}
      <Navbar />

      {/* View router */}
      <main className="flex-1 pb-16">
        {activeView === 'menu' && <CustomerMenu />}
        {activeView === 'kitchen' && <KitchenDisplay />}
        {activeView === 'admin' && <AdminDashboard />}
        {activeView === 'my-orders' && <MyOrdersView />}
        {activeView === 'import-code' && <VercelHelperView />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 py-6 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            <strong>CanteenGO</strong> · Hệ Thống Quản Lý & Đặt Món Căn Tin Thông Minh
          </p>
          <p className="text-stone-400">
            Hỗ trợ hiển thị trên điện thoại, máy tính bảng & màn hình POS / KDS Bếp
          </p>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <CartDrawer />
      <CheckoutModal />
      <OrderTrackerModal />
      <CanteenCardModal />
    </div>
  );
};

export default function App() {
  return (
    <CanteenProvider>
      <MainLayout />
    </CanteenProvider>
  );
}
