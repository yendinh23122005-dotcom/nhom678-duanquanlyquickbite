import React from 'react';
import {
  UtensilsCrossed,
  ChefHat,
  LayoutDashboard,
  Receipt,
  ShoppingCart,
  CreditCard,
  Code2,
  Bell,
  Clock
} from 'lucide-react';
import { useCanteen } from '../context/CanteenContext';

export const Navbar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    cartCount,
    setIsCartOpen,
    userCard,
    setIsCardModalOpen,
    orders,
    setTrackingOrderId
  } = useCanteen();

  // Find active orders that are ready or preparing
  const activeOrders = orders.filter(o => o.status === 'preparing' || o.status === 'ready');
  const readyOrders = orders.filter(o => o.status === 'ready');

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('menu')}
              className="flex items-center gap-2.5 text-left focus:outline-none group"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold shadow-sm shadow-orange-200 group-hover:bg-orange-700 transition-colors">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-tight text-stone-900">Canteen<span className="text-orange-600">GO</span></span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-orange-100 text-orange-800">
                    Smart POS
                  </span>
                </div>
                <p className="text-xs text-stone-500 hidden sm:block">Đặt món nhanh · Chuông báo thông minh</p>
              </div>
            </button>
          </div>

          {/* Navigation View Switcher */}
          <nav className="hidden md:flex items-center gap-1 p-1 bg-stone-100 rounded-xl border border-stone-200/80 text-sm">
            <button
              onClick={() => setActiveView('menu')}
              className={`flex items-center gap-2 px-3.5 py-1.5 font-medium rounded-lg transition-all ${
                activeView === 'menu'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <UtensilsCrossed className="w-4 h-4 text-orange-600" />
              <span>Thực Đơn</span>
            </button>

            <button
              onClick={() => setActiveView('kitchen')}
              className={`flex items-center gap-2 px-3.5 py-1.5 font-medium rounded-lg transition-all relative ${
                activeView === 'kitchen'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <ChefHat className="w-4 h-4 text-amber-600" />
              <span>Màn Hình Bếp (KDS)</span>
              {activeOrders.length > 0 && (
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              )}
            </button>

            <button
              onClick={() => setActiveView('admin')}
              className={`flex items-center gap-2 px-3.5 py-1.5 font-medium rounded-lg transition-all ${
                activeView === 'admin'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-stone-600" />
              <span>Quản Lý Bán Hàng</span>
            </button>

            <button
              onClick={() => setActiveView('my-orders')}
              className={`flex items-center gap-2 px-3.5 py-1.5 font-medium rounded-lg transition-all relative ${
                activeView === 'my-orders'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Receipt className="w-4 h-4 text-stone-600" />
              <span>Đơn Của Tôi</span>
              {readyOrders.length > 0 && (
                <span className="inline-flex items-center justify-center text-[10px] font-bold px-1.5 h-4 rounded-full bg-emerald-600 text-white">
                  {readyOrders.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveView('import-code')}
              className={`flex items-center gap-2 px-3 py-1.5 font-medium rounded-lg transition-all ${
                activeView === 'import-code'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Code2 className="w-4 h-4 text-indigo-600" />
              <span>Vercel / Mã Nguồn</span>
            </button>
          </nav>

          {/* Right Actions: Ready Alert, User Smart Card, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Ready Notification if any */}
            {readyOrders.length > 0 && (
              <button
                onClick={() => {
                  setTrackingOrderId(readyOrders[0].id);
                }}
                className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs px-2.5 py-1.5 rounded-lg transition-colors animate-bounce"
                title="Món ăn đã xong! Nhấn để xem số còi / bàn"
              >
                <Bell className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                <span className="font-semibold hidden sm:inline">Món sẵn sàng!</span>
                <span className="font-bold sm:hidden">Xong!</span>
              </button>
            )}

            {/* Smart Canteen Card */}
            <button
              onClick={() => setIsCardModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg text-xs transition-colors"
              title="Xem thông tin Thẻ Căn Tin & Nạp tiền"
            >
              <div className="w-6 h-6 rounded-md bg-stone-800 text-white flex items-center justify-center shrink-0">
                <CreditCard className="w-3.5 h-3.5" />
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-[10px] text-stone-500 leading-tight">Thẻ Căn Tin</p>
                <p className="font-bold text-stone-900 leading-tight">
                  {userCard.balance.toLocaleString('vi-VN')}₫
                </p>
              </div>
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-orange-600 hover:bg-orange-700 text-white transition-all shadow-sm"
              aria-label="Giỏ hàng"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-stone-900 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile View Switcher Tabs */}
        <div className="flex md:hidden items-center justify-between overflow-x-auto py-2 border-t border-stone-100 gap-1 text-xs no-scrollbar">
          <button
            onClick={() => setActiveView('menu')}
            className={`px-2.5 py-1.5 font-medium rounded-md shrink-0 flex items-center gap-1.5 ${
              activeView === 'menu' ? 'bg-orange-100 text-orange-900' : 'text-stone-600'
            }`}
          >
            <UtensilsCrossed className="w-3.5 h-3.5 text-orange-600" />
            <span>Thực đơn</span>
          </button>

          <button
            onClick={() => setActiveView('kitchen')}
            className={`px-2.5 py-1.5 font-medium rounded-md shrink-0 flex items-center gap-1.5 ${
              activeView === 'kitchen' ? 'bg-amber-100 text-amber-900' : 'text-stone-600'
            }`}
          >
            <ChefHat className="w-3.5 h-3.5 text-amber-600" />
            <span>Bếp KDS</span>
          </button>

          <button
            onClick={() => setActiveView('admin')}
            className={`px-2.5 py-1.5 font-medium rounded-md shrink-0 flex items-center gap-1.5 ${
              activeView === 'admin' ? 'bg-stone-200 text-stone-900' : 'text-stone-600'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Quản lý</span>
          </button>

          <button
            onClick={() => setActiveView('my-orders')}
            className={`px-2.5 py-1.5 font-medium rounded-md shrink-0 flex items-center gap-1.5 ${
              activeView === 'my-orders' ? 'bg-stone-200 text-stone-900' : 'text-stone-600'
            }`}
          >
            <Receipt className="w-3.5 h-3.5" />
            <span>Đơn ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveView('import-code')}
            className={`px-2.5 py-1.5 font-medium rounded-md shrink-0 flex items-center gap-1.5 ${
              activeView === 'import-code' ? 'bg-indigo-100 text-indigo-900' : 'text-stone-600'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-indigo-600" />
            <span>Vercel fix</span>
          </button>
        </div>
      </div>
    </header>
  );
};
