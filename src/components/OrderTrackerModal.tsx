import React from 'react';
import { X, CheckCircle, Clock, ChefHat, Bell, Utensils, AlertCircle } from 'lucide-react';
import { useCanteen } from '../context/CanteenContext';

export const OrderTrackerModal: React.FC = () => {
  const { trackingOrderId, setTrackingOrderId, orders, updateOrderStatus } = useCanteen();

  if (!trackingOrderId) return null;

  const order = orders.find(o => o.id === trackingOrderId);
  if (!order) return null;

  const steps = [
    { key: 'pending', label: 'Tiếp nhận đơn', desc: 'Đơn đã gửi tới bếp Canteen' },
    { key: 'preparing', label: 'Bếp đang nấu', desc: 'Đầu bếp đang chế biến' },
    { key: 'ready', label: 'Sẵn sàng lấy món', desc: 'Món ăn đã xong tại quầy' },
    { key: 'completed', label: 'Hoàn tất', desc: 'Đã nhận món & chúc ngon miệng' }
  ];

  const getCurrentStepIndex = () => {
    switch (order.status) {
      case 'pending': return 0;
      case 'preparing': return 1;
      case 'ready': return 2;
      case 'completed': return 3;
      default: return 0;
    }
  };

  const currentIndex = getCurrentStepIndex();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150 my-6">
        
        {/* Header */}
        <div className="bg-stone-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center font-bold">
              <Utensils className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-lg">{order.id}</span>
                <span className="text-[11px] bg-stone-800 text-stone-300 px-2 py-0.5 rounded">
                  {order.orderType === 'dine_in' ? 'Ăn tại Căn Tin' : 'Mang về'}
                </span>
              </div>
              <p className="text-xs text-stone-400">Khách hàng: {order.customerName}</p>
            </div>
          </div>

          <button
            onClick={() => setTrackingOrderId(null)}
            className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Buzzer / Table Highlight Card */}
        <div className="p-6 bg-gradient-to-b from-orange-50/50 to-white text-center border-b border-stone-100">
          <div className="inline-block p-4 rounded-2xl bg-white border-2 border-dashed border-orange-300 shadow-sm max-w-xs w-full">
            <p className="text-xs uppercase tracking-widest font-bold text-orange-700">
              {order.orderType === 'dine_in' ? 'Số bàn / Còi rung của bạn' : 'Số còi rung nhận món'}
            </p>
            <div className="my-2 flex items-center justify-center gap-2">
              <span className="text-4xl font-black font-mono tracking-tight text-stone-900">
                {order.buzzerNumber ? `#${order.buzzerNumber}` : order.tableNumber || '#01'}
              </span>
            </div>
            <p className="text-[11px] text-stone-500">
              {order.status === 'ready' ? (
                <span className="font-bold text-emerald-700 animate-pulse">
                  🔔 Ting! Món đã chuẩn bị xong. Mời bạn đến quầy nhận món ngay!
                </span>
              ) : (
                'Giữ còi rung hoặc theo dõi màn hình hiển thị số khi tới lượt.'
              )}
            </p>
          </div>
        </div>

        {/* Progress Tracker Steps */}
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            {steps.map((st, idx) => {
              const isPassed = idx < currentIndex;
              const isCurrent = idx === currentIndex;

              return (
                <div key={st.key} className="flex items-start gap-3.5 relative">
                  {/* Vertical connector line */}
                  {idx < steps.length - 1 && (
                    <div
                      className={`absolute left-4 top-8 -bottom-3 w-0.5 ${
                        idx < currentIndex ? 'bg-orange-500' : 'bg-stone-200'
                      }`}
                    />
                  )}

                  {/* Icon Node */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${
                      isPassed
                        ? 'bg-orange-600 text-white'
                        : isCurrent
                        ? 'bg-orange-600 text-white ring-4 ring-orange-100 animate-pulse'
                        : 'bg-stone-100 text-stone-400 border border-stone-200'
                    }`}
                  >
                    {isPassed ? (
                      <CheckCircle className="w-4 h-4 stroke-[2.5]" />
                    ) : isCurrent ? (
                      st.key === 'ready' ? (
                        <Bell className="w-4 h-4" />
                      ) : (
                        <ChefHat className="w-4 h-4" />
                      )
                    ) : (
                      <span className="text-xs font-bold">{idx + 1}</span>
                    )}
                  </div>

                  {/* Step Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p
                        className={`text-sm font-bold ${
                          isCurrent ? 'text-orange-950' : isPassed ? 'text-stone-900' : 'text-stone-400'
                        }`}
                      >
                        {st.label}
                      </p>
                      {isCurrent && (
                        <span className="text-[11px] font-semibold text-orange-600 bg-orange-100 px-2 py-0.5 rounded">
                          Đang diễn ra
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5">{st.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Ordered items breakdown */}
          <div className="mt-6 pt-5 border-t border-stone-100 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Chi tiết các món ({order.items.length} món)
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {order.items.map(it => (
                <div key={it.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-5 text-stone-500 font-bold">{it.quantity}x</span>
                    <span className="text-stone-800 font-medium">{it.name}</span>
                  </div>
                  <span className="font-semibold text-stone-900">
                    {(it.price * it.quantity).toLocaleString('vi-VN')}₫
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-stone-100 flex justify-between text-sm font-bold text-stone-900">
              <span>Tổng thanh toán ({order.paymentMethod === 'canteen_card' ? 'Thẻ Căn Tin' : order.paymentMethod === 'qr_vietqr' ? 'VietQR' : 'Tiền mặt'})</span>
              <span className="text-orange-600">{order.total.toLocaleString('vi-VN')}₫</span>
            </div>
          </div>

          {/* Quick simulator buttons for testing */}
          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
            <p className="text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-2">
              Mô phỏng quy trình bếp (Dành cho thử nghiệm):
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <button
                type="button"
                onClick={() => updateOrderStatus(order.id, 'preparing')}
                className="px-2.5 py-1 rounded bg-stone-200 hover:bg-stone-300 text-stone-800 font-medium transition-colors"
              >
                1. Bếp nấu
              </button>
              <button
                type="button"
                onClick={() => updateOrderStatus(order.id, 'ready')}
                className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors flex items-center gap-1"
              >
                <Bell className="w-3 h-3" />
                2. Báo món sẵn sàng (Chuông)
              </button>
              <button
                type="button"
                onClick={() => updateOrderStatus(order.id, 'completed')}
                className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
              >
                3. Hoàn tất nhận món
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            type="button"
            onClick={() => setTrackingOrderId(null)}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold transition-colors"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
};
