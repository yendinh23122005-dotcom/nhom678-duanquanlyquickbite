import React from 'react';
import { Receipt, Clock, Bell, CheckCircle2, ChevronRight, Volume2, ShoppingBag } from 'lucide-react';
import { useCanteen } from '../context/CanteenContext';
import { sounds } from '../utils/audio';

export const MyOrdersView: React.FC = () => {
  const { orders, setTrackingOrderId, setActiveView } = useCanteen();

  const handleTestSound = () => {
    sounds.playOrderReady();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
            <Receipt className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-stone-900">Danh Sách Đơn Món Của Bạn</h1>
            <p className="text-xs text-stone-500">
              Theo dõi tiến trình bếp nấu và nhận thông báo chuông còi khi món xong
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleTestSound}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-xs font-semibold text-stone-700 transition-colors"
          title="Bấm để nghe thử tiếng chuông báo khi món ăn làm xong"
        >
          <Volume2 className="w-4 h-4 text-emerald-600" />
          <span>Thử chuông báo món</span>
        </button>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center text-stone-400 space-y-3">
          <ShoppingBag className="w-12 h-12 stroke-1 mx-auto text-stone-300" />
          <h3 className="font-bold text-base text-stone-700">Bạn chưa có đơn đặt món nào</h3>
          <p className="text-xs text-stone-400 max-w-sm mx-auto">
            Hãy khám phá thực đơn đa dạng và đặt món nóng hổi để xem đơn tại đây.
          </p>
          <button
            onClick={() => setActiveView('menu')}
            className="mt-2 px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700 transition-colors"
          >
            Xem thực đơn ngay
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map(order => {
            const isReady = order.status === 'ready';

            return (
              <div
                key={order.id}
                onClick={() => setTrackingOrderId(order.id)}
                className={`bg-white rounded-2xl border p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition-all hover:shadow-md ${
                  isReady
                    ? 'border-emerald-500 ring-2 ring-emerald-100 bg-emerald-50/20'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-mono font-black text-stone-900 text-sm">
                      {order.id}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-900">
                      {order.buzzerNumber ? `Còi #${order.buzzerNumber}` : order.tableNumber || '#01'}
                    </span>
                    <span className="text-[11px] text-stone-500 font-medium">
                      {order.orderType === 'dine_in' ? 'Ăn tại chỗ' : 'Mang về'}
                    </span>
                    <span className="text-[11px] text-stone-400">
                      {new Date(order.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  {/* Summary of items */}
                  <div className="text-xs text-stone-700 font-medium line-clamp-1">
                    {order.items.map(it => `${it.quantity}x ${it.name}`).join(' · ')}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <span>Tổng: <strong className="text-orange-600">{order.total.toLocaleString('vi-VN')}₫</strong></span>
                    <span>·</span>
                    <span>{order.paymentMethod === 'canteen_card' ? 'Thẻ Căn Tin' : order.paymentMethod === 'qr_vietqr' ? 'VietQR' : 'Tiền mặt'}</span>
                  </div>
                </div>

                {/* Right Status & Action */}
                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                  {isReady ? (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-900 font-bold text-xs animate-pulse">
                      <Bell className="w-4 h-4 text-emerald-700" />
                      <span>Mời lấy món tại quầy!</span>
                    </div>
                  ) : order.status === 'preparing' ? (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-100 text-orange-900 font-semibold text-xs">
                      <Clock className="w-3.5 h-3.5 text-orange-700" />
                      <span>Bếp đang nấu...</span>
                    </div>
                  ) : order.status === 'completed' ? (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-100 text-blue-900 font-semibold text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />
                      <span>Đã hoàn tất</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 text-stone-700 font-semibold text-xs">
                      <Clock className="w-3.5 h-3.5 text-stone-500" />
                      <span>Chờ tiếp nhận</span>
                    </div>
                  )}

                  <div className="flex items-center text-xs font-bold text-stone-700">
                    <span>Xem còi rung</span>
                    <ChevronRight className="w-4 h-4 text-stone-400" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
