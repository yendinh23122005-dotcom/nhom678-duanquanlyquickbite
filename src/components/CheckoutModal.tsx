import React, { useState } from 'react';
import { X, QrCode, CreditCard, Banknote, CheckCircle2, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCanteen } from '../context/CanteenContext';
import { PaymentMethod, OrderType } from '../types/canteen';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    userCard,
    createOrder,
    setTrackingOrderId,
    setIsCardModalOpen
  } = useCanteen();

  const [customerName, setCustomerName] = useState(userCard.holderName || '');
  const [customerPhone, setCustomerPhone] = useState('0908889999');
  const [orderType, setOrderType] = useState<OrderType>('dine_in');
  const [tableNumber, setTableNumber] = useState('Bàn 04');
  const [buzzerNumber, setBuzzerNumber] = useState('12');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('qr_vietqr');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isCheckoutOpen) return null;

  const total = cartTotal; // Or with discount
  const isCardInsufficient = paymentMethod === 'canteen_card' && userCard.balance < total;

  const handlePlaceOrder = () => {
    setErrorMsg('');
    if (!customerName.trim()) {
      setErrorMsg('Vui lòng nhập tên người đặt');
      return;
    }

    if (isCardInsufficient) {
      setErrorMsg('Số dư Thẻ Căn Tin không đủ. Vui lòng nạp thêm hoặc đổi hình thức thanh toán.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const newOrder = createOrder({
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        orderType,
        tableNumber: orderType === 'dine_in' ? tableNumber : undefined,
        buzzerNumber,
        paymentMethod,
        discount: 0
      });

      // Fire celebratory confetti
      confetti({
        particleCount: 90,
        spread: 60,
        origin: { y: 0.6 }
      });

      setIsCheckoutOpen(false);
      setTrackingOrderId(newOrder.id);
    }, 700);
  };

  // Generate dynamic VietQR image URL (standard VietQR quicklink)
  const vietQrUrl = `https://api.vietqr.io/image/970422-03456789999-compact2.jpg?amount=${total}&addInfo=CANTEENGO%20ORDER&accountName=CANTEEN%20GO%20SYSTEM`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150 my-6">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-600 text-white flex items-center justify-center font-bold">
              ✓
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900">Thanh toán đơn Căn Tin</h2>
              <p className="text-xs text-stone-500">Xác nhận thông tin & hình thức thanh toán</p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Customer info */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Thông tin nhận món
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">
                  Họ và tên
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  placeholder="VD: Nguyễn Văn A"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">
                  Số điện thoại (Nhận SMS báo món)
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  placeholder="VD: 090xxxxxxx"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Dine-in vs Takeaway */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Hình thức dùng món
            </h3>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setOrderType('dine_in')}
                className={`p-3 rounded-xl border text-sm font-medium text-center transition-all ${
                  orderType === 'dine_in'
                    ? 'border-orange-600 bg-orange-50 text-orange-950 font-bold shadow-xs'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                }`}
              >
                🍽️ Ăn tại Căn Tin
              </button>

              <button
                type="button"
                onClick={() => setOrderType('takeaway')}
                className={`p-3 rounded-xl border text-sm font-medium text-center transition-all ${
                  orderType === 'takeaway'
                    ? 'border-orange-600 bg-orange-50 text-orange-950 font-bold shadow-xs'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                }`}
              >
                🥡 Mang đi (Takeaway)
              </button>
            </div>

            {orderType === 'dine_in' ? (
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">
                    Vị trí bàn ăn
                  </label>
                  <select
                    value={tableNumber}
                    onChange={e => setTableNumber(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-orange-500"
                  >
                    {Array.from({ length: 20 }, (_, i) => `Bàn ${String(i + 1).padStart(2, '0')}`).map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">
                    Số còi rung (Buzzer)
                  </label>
                  <input
                    type="text"
                    value={buzzerNumber}
                    onChange={e => setBuzzerNumber(e.target.value)}
                    placeholder="VD: 12"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            ) : (
              <div className="pt-1">
                <label className="block text-xs font-medium text-stone-600 mb-1">
                  Số thẻ / Còi rung nhận món
                </label>
                <input
                  type="text"
                  value={buzzerNumber}
                  onChange={e => setBuzzerNumber(e.target.value)}
                  placeholder="Lấy tại quầy lấy khay Canteen"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 focus:outline-none focus:border-orange-500"
                />
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Phương thức thanh toán
            </h3>

            <div className="space-y-2">
              {/* VietQR */}
              <button
                type="button"
                onClick={() => setPaymentMethod('qr_vietqr')}
                className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                  paymentMethod === 'qr_vietqr'
                    ? 'border-orange-600 bg-orange-50/60 ring-1 ring-orange-500'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <QrCode className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-stone-900">Quét mã QR Chuyển khoản (VietQR / Napas 247)</p>
                    <p className="text-xs text-stone-500">Momo, ZaloPay, Vietcombank, MB, Techcombank, VPBank...</p>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'qr_vietqr' ? 'border-orange-600 bg-orange-600' : 'border-stone-300'}`}>
                  {paymentMethod === 'qr_vietqr' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </button>

              {/* Canteen Smart Card */}
              <button
                type="button"
                onClick={() => setPaymentMethod('canteen_card')}
                className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                  paymentMethod === 'canteen_card'
                    ? 'border-orange-600 bg-orange-50/60 ring-1 ring-orange-500'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center shrink-0">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-stone-900">Thẻ Căn Tin Thông Minh</p>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                        Số dư: {userCard.balance.toLocaleString('vi-VN')}₫
                      </span>
                    </div>
                    <p className="text-xs text-stone-500">Trừ tiền trực tiếp vào tài khoản thẻ sinh viên / nhân viên</p>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'canteen_card' ? 'border-orange-600 bg-orange-600' : 'border-stone-300'}`}>
                  {paymentMethod === 'canteen_card' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </button>

              {/* Cash at Counter */}
              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                  paymentMethod === 'cash'
                    ? 'border-orange-600 bg-orange-50/60 ring-1 ring-orange-500'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Banknote className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-stone-900">Tiền mặt tại quầy Căn Tin</p>
                    <p className="text-xs text-stone-500">Thanh toán khi tới lấy món ăn tại quầy phục vụ</p>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'cash' ? 'border-orange-600 bg-orange-600' : 'border-stone-300'}`}>
                  {paymentMethod === 'cash' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </button>
            </div>

            {/* If VietQR Selected: Show preview QR Box */}
            {paymentMethod === 'qr_vietqr' && (
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col items-center text-center space-y-3">
                <p className="text-xs font-semibold text-stone-700">
                  Quét mã bên dưới bằng bất kỳ ứng dụng Ngân hàng nào:
                </p>
                <div className="p-3 bg-white rounded-xl shadow-xs border border-stone-200 inline-block">
                  <img
                    src={vietQrUrl}
                    alt="VietQR Payment Code"
                    className="w-48 h-48 object-contain"
                  />
                </div>
                <div className="text-xs text-stone-600 space-y-1">
                  <p><span className="text-stone-400">Ngân hàng:</span> <span className="font-semibold text-stone-800">MB Bank (Quân Đội)</span></p>
                  <p><span className="text-stone-400">Số tài khoản:</span> <span className="font-mono font-bold text-stone-900">03456789999</span></p>
                  <p><span className="text-stone-400">Chủ tài khoản:</span> <span className="font-semibold text-stone-800">CANTEEN GO VIET NAM</span></p>
                  <p><span className="text-stone-400">Số tiền:</span> <span className="font-bold text-orange-600">{total.toLocaleString('vi-VN')}₫</span></p>
                </div>
              </div>
            )}

            {/* If Canteen Card selected and balance low */}
            {isCardInsufficient && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between text-xs text-amber-900">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Số dư còn thiếu {(total - userCard.balance).toLocaleString('vi-VN')}₫</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCardModalOpen(true)}
                  className="font-bold text-orange-600 hover:text-orange-700 underline underline-offset-2 ml-2"
                >
                  Nạp tiền ngay
                </button>
              </div>
            )}
          </div>

          {errorMsg && (
            <p className="text-xs text-rose-600 flex items-center gap-1 font-medium bg-rose-50 p-2.5 rounded-lg border border-rose-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {errorMsg}
            </p>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-stone-500">Tổng thanh toán ({cart.length} món):</p>
            <p className="text-lg font-black text-orange-600">
              {total.toLocaleString('vi-VN')}₫
            </p>
          </div>

          <button
            type="button"
            disabled={isProcessing}
            onClick={handlePlaceOrder}
            className="flex-1 py-3 px-5 rounded-xl bg-orange-600 hover:bg-orange-700 disabled:bg-stone-300 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            {isProcessing ? (
              <span>Đang xử lý đơn...</span>
            ) : (
              <>
                <span>Đặt món ngay</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
