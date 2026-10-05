import React, { useState, useEffect } from 'react';
import { ChefHat, Clock, Bell, CheckCircle2, AlertTriangle, RefreshCw, Flame } from 'lucide-react';
import { useCanteen } from '../context/CanteenContext';
import { Order, OrderStatus } from '../types/canteen';

export const KitchenDisplay: React.FC = () => {
  const { orders, updateOrderStatus } = useCanteen();
  const [filter, setFilter] = useState<'all' | 'pending' | 'preparing' | 'ready'>('all');
  const [now, setNow] = useState(Date.now());

  // Update timer tick every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 10000);
    return () => clearInterval(timer);
  }, []);

  const kitchenOrders = orders.filter(o => o.status !== 'completed' && o.status !== 'cancelled');

  const filteredOrders = kitchenOrders.filter(o => {
    if (filter === 'all') return true;
    return o.status === filter;
  });

  const getElapsedTimeMinutes = (createdAt: string) => {
    const diff = Math.max(0, now - new Date(createdAt).getTime());
    return Math.floor(diff / 60000);
  };

  const pendingCount = kitchenOrders.filter(o => o.status === 'pending').length;
  const preparingCount = kitchenOrders.filter(o => o.status === 'preparing').length;
  const readyCount = kitchenOrders.filter(o => o.status === 'ready').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Top Banner / Summary metrics */}
      <div className="bg-stone-900 text-white rounded-2xl p-5 sm:p-6 shadow-sm border border-stone-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <ChefHat className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Màn Hình Điều Phối Bếp (KDS)</h1>
              <p className="text-xs text-stone-400 mt-0.5">
                Quản lý vé chế biến thức ăn & kích hoạt chuông gọi món theo thời gian thực
              </p>
            </div>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-stone-800/80 border border-stone-700/80 rounded-xl px-4 py-2.5 text-center">
              <p className="text-xs text-stone-400 font-medium">Chờ chế biến</p>
              <p className="text-xl font-black text-amber-400 mt-0.5">{pendingCount}</p>
            </div>
            <div className="bg-stone-800/80 border border-stone-700/80 rounded-xl px-4 py-2.5 text-center">
              <p className="text-xs text-stone-400 font-medium">Đang nấu</p>
              <p className="text-xl font-black text-orange-400 mt-0.5">{preparingCount}</p>
            </div>
            <div className="bg-stone-800/80 border border-stone-700/80 rounded-xl px-4 py-2.5 text-center">
              <p className="text-xs text-stone-400 font-medium">Gọi chuông</p>
              <p className="text-xl font-black text-emerald-400 mt-0.5">{readyCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Segmented Control */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl border border-stone-200">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              filter === 'all' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Tất cả ({kitchenOrders.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              filter === 'pending' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Chờ nhận ({pendingCount})
          </button>
          <button
            onClick={() => setFilter('preparing')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              filter === 'preparing' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Đang nấu ({preparingCount})
          </button>
          <button
            onClick={() => setFilter('ready')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              filter === 'ready' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Đang gọi khách ({readyCount})
          </button>
        </div>

        <span className="text-xs text-stone-500 font-medium flex items-center gap-1.5">
          <RefreshCw className="w-3.5 h-3.5 text-stone-400 animate-spin" />
          Tự động đồng bộ thời gian thực
        </span>
      </div>

      {/* Tickets Grid */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center text-stone-400 space-y-2">
          <ChefHat className="w-12 h-12 stroke-1 mx-auto text-stone-300" />
          <h3 className="font-bold text-base text-stone-700">Hiện không có vé món nào đang chờ</h3>
          <p className="text-xs text-stone-400">
            Các đơn hàng mới của khách sẽ xuất hiện ngay lập tức tại đây.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOrders.map(order => {
            const elapsed = getElapsedTimeMinutes(order.createdAt);
            const isLate = elapsed >= 10;
            const isVeryLate = elapsed >= 15;

            return (
              <div
                key={order.id}
                className={`rounded-2xl bg-white border-2 flex flex-col justify-between overflow-hidden shadow-xs transition-all ${
                  order.status === 'ready'
                    ? 'border-emerald-400 ring-2 ring-emerald-50'
                    : isVeryLate
                    ? 'border-rose-400 ring-2 ring-rose-50'
                    : isLate
                    ? 'border-amber-400'
                    : 'border-stone-200'
                }`}
              >
                {/* Ticket Top Bar */}
                <div className="p-4 border-b border-stone-100 bg-stone-50/70 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-base text-stone-900">
                      {order.id}
                    </span>
                    <span className="text-[11px] font-semibold text-stone-600 bg-white border border-stone-200 px-2 py-0.5 rounded">
                      {order.orderType === 'dine_in' ? 'Ăn tại chỗ' : 'Mang về'}
                    </span>
                  </div>

                  {/* Buzzer Badge */}
                  <div className="bg-orange-100 text-orange-900 font-mono font-bold text-xs px-2.5 py-1 rounded-lg">
                    {order.buzzerNumber ? `Còi #${order.buzzerNumber}` : order.tableNumber || '#01'}
                  </div>
                </div>

                {/* Ticket Metadata Bar */}
                <div className="px-4 py-2 bg-stone-100/50 flex items-center justify-between text-xs text-stone-600">
                  <span className="font-medium text-stone-700">
                    Khách: {order.customerName}
                  </span>
                  <div
                    className={`flex items-center gap-1 font-bold ${
                      isVeryLate
                        ? 'text-rose-600 animate-pulse'
                        : isLate
                        ? 'text-amber-600'
                        : 'text-stone-500'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>{elapsed} phút trước</span>
                  </div>
                </div>

                {/* Ordered Items List */}
                <div className="p-4 flex-1 space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="pb-2.5 border-b border-stone-100 last:border-0 last:pb-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-md bg-stone-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                            {item.quantity}
                          </span>
                          <span className="font-bold text-sm text-stone-900">
                            {item.name}
                          </span>
                        </div>
                      </div>

                      {/* Item options */}
                      {item.selectedOptions && item.selectedOptions.length > 0 && (
                        <div className="ml-8 mt-1 space-y-0.5">
                          {item.selectedOptions.map((opt, i) => (
                            <p key={i} className="text-xs text-stone-600 font-medium">
                              • {opt.optionName}
                            </p>
                          ))}
                        </div>
                      )}

                      {/* Special instructions */}
                      {item.specialInstructions && (
                        <div className="ml-8 mt-1.5 p-1.5 rounded bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold flex items-center gap-1.5">
                          <Flame className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>Ghi chú: {item.specialInstructions}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Ticket Actions */}
                <div className="p-3 bg-stone-50 border-t border-stone-200">
                  {order.status === 'pending' && (
                    <button
                      type="button"
                      onClick={() => updateOrderStatus(order.id, 'preparing')}
                      className="w-full py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                    >
                      <ChefHat className="w-4 h-4" />
                      <span>Bắt đầu nấu món</span>
                    </button>
                  )}

                  {order.status === 'preparing' && (
                    <button
                      type="button"
                      onClick={() => updateOrderStatus(order.id, 'ready')}
                      className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                    >
                      <Bell className="w-4 h-4" />
                      <span>Món đã xong (Rung chuông còi)</span>
                    </button>
                  )}

                  {order.status === 'ready' && (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => updateOrderStatus(order.id, 'ready')}
                        className="py-2.5 px-3 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs flex items-center justify-center gap-1 transition-all"
                        title="Bấm để rung chuông lần nữa"
                      >
                        <Bell className="w-4 h-4 text-emerald-600" />
                        <span>Rung lại</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => updateOrderStatus(order.id, 'completed')}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Khách đã nhận khay</span>
                      </button>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
