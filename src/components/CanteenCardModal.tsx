import React, { useState } from 'react';
import { X, CreditCard, PlusCircle, Check, ShieldCheck, Sparkles, ArrowDownLeft } from 'lucide-react';
import { useCanteen } from '../context/CanteenContext';

export const CanteenCardModal: React.FC = () => {
  const { isCardModalOpen, setIsCardModalOpen, userCard, topUpCard } = useCanteen();
  const [selectedTopUp, setSelectedTopUp] = useState<number>(100000);
  const [successMsg, setSuccessMsg] = useState(false);

  if (!isCardModalOpen) return null;

  const topUpAmounts = [50000, 100000, 200000, 500000];

  const handleTopUp = () => {
    topUpCard(selectedTopUp);
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-orange-600" />
            <h2 className="text-base font-bold text-stone-900">Thẻ Căn Tin Thông Minh</h2>
          </div>
          <button
            onClick={() => setIsCardModalOpen(false)}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6">
          
          {/* Card Simulation */}
          <div className="relative rounded-2xl p-6 bg-gradient-to-tr from-stone-900 via-stone-800 to-stone-900 text-white shadow-xl overflow-hidden border border-stone-700">
            {/* Hologram aesthetic pattern */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest font-extrabold text-orange-400">
                CANTEEN GO SMART PASS
              </span>
              <span className="text-[11px] font-mono text-stone-400 border border-stone-700 px-2 py-0.5 rounded">
                RFID · NFC
              </span>
            </div>

            <div className="my-6">
              <p className="text-xs text-stone-400 font-medium">Số dư khả dụng</p>
              <p className="text-3xl font-black tracking-tight text-white mt-1">
                {userCard.balance.toLocaleString('vi-VN')}₫
              </p>
            </div>

            <div className="flex items-end justify-between text-xs pt-2 border-t border-stone-800">
              <div>
                <p className="text-[10px] text-stone-400 uppercase font-semibold">Chủ thẻ</p>
                <p className="font-bold text-white text-sm">{userCard.holderName}</p>
                <p className="text-[11px] text-stone-400">{userCard.userRole} · {userCard.studentId}</p>
              </div>
              <div className="text-right font-mono text-xs text-stone-400">
                {userCard.cardNumber}
              </div>
            </div>
          </div>

          {/* Top up selector */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Nạp tiền nhanh vào thẻ
            </h3>

            <div className="grid grid-cols-2 gap-2">
              {topUpAmounts.map(amt => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setSelectedTopUp(amt)}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                    selectedTopUp === amt
                      ? 'border-orange-600 bg-orange-50 text-orange-950 ring-1 ring-orange-500'
                      : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-white'
                  }`}
                >
                  +{amt.toLocaleString('vi-VN')}₫
                </button>
              ))}
            </div>

            {successMsg && (
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Nạp thành công +{selectedTopUp.toLocaleString('vi-VN')}₫ vào thẻ!</span>
              </div>
            )}

            <button
              type="button"
              onClick={handleTopUp}
              className="w-full py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Nạp ngay {selectedTopUp.toLocaleString('vi-VN')}₫</span>
            </button>
          </div>

          {/* Benefits Info */}
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-stone-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Đặc quyền Thẻ Căn Tin:</span>
            </div>
            <p>• Tự động áp dụng giảm giá khi thanh toán tại quầy.</p>
            <p>• Không cần mang theo tiền mặt hoặc quét mã QR mỗi lần mua.</p>
            <p>• Hoàn tiền ngay vào tài khoản nếu đơn hủy.</p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            type="button"
            onClick={() => setIsCardModalOpen(false)}
            className="px-4 py-2 rounded-xl text-stone-700 hover:bg-stone-200 text-xs font-bold transition-colors"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
};
