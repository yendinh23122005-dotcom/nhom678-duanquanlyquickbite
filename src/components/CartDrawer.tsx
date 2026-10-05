import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag, Check, AlertCircle } from 'lucide-react';
import { useCanteen } from '../context/CanteenContext';
import { INITIAL_VOUCHERS } from '../data/initialMenu';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    setIsCheckoutOpen
  } = useCanteen();

  const [voucherInput, setVoucherInput] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState<{
    code: string;
    discount: number;
    description: string;
  } | null>(null);
  const [voucherError, setVoucherError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyVoucher = (codeToApply?: string) => {
    const code = (codeToApply || voucherInput).trim().toUpperCase();
    setVoucherError('');

    if (!code) {
      setAppliedVoucher(null);
      return;
    }

    const found = INITIAL_VOUCHERS.find(v => v.code === code);
    if (!found) {
      setVoucherError('Mã ưu đãi không hợp lệ.');
      return;
    }

    if (cartTotal < found.minOrder) {
      setVoucherError(`Đơn hàng tối thiểu ${found.minOrder.toLocaleString('vi-VN')}₫ để dùng mã này.`);
      return;
    }

    let discount = 0;
    if (found.discountPercent) {
      discount = Math.round((cartTotal * found.discountPercent) / 100);
    } else if (found.discountAmount) {
      discount = found.discountAmount;
    }

    setAppliedVoucher({
      code: found.code,
      discount,
      description: found.description
    });
    setVoucherInput('');
  };

  const finalDiscount = appliedVoucher ? appliedVoucher.discount : 0;
  const finalTotal = Math.max(0, cartTotal - finalDiscount);

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-stone-900">Giỏ hàng của bạn</h2>
                <p className="text-xs text-stone-500">{cart.length} món đã chọn</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-stone-400 hover:text-rose-600 font-medium px-2 py-1 rounded transition-colors"
                >
                  Xóa tất cả
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                aria-label="Đóng giỏ hàng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-stone-400">
                <ShoppingBag className="w-16 h-16 stroke-1 mb-3 text-stone-300" />
                <p className="text-base font-medium text-stone-700">Giỏ hàng đang trống</p>
                <p className="text-xs text-stone-400 mt-1 max-w-xs">
                  Chọn các món ăn nóng hổi ngon lành từ thực đơn Canteen để bắt đầu đặt nhé!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 px-4 py-2 rounded-xl bg-orange-600 text-white font-medium text-xs hover:bg-orange-700 transition-colors"
                >
                  Khám phá thực đơn
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 rounded-xl border border-stone-200/90 bg-stone-50/50"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover bg-stone-100 shrink-0"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-bold text-stone-900 leading-snug line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-300 hover:text-rose-500 p-0.5 transition-colors"
                          title="Xóa món"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Selected options */}
                      {item.selectedOptions && item.selectedOptions.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {item.selectedOptions.map((opt, i) => (
                            <span
                              key={i}
                              className="text-[11px] text-stone-600 bg-white border border-stone-200 px-1.5 py-0.5 rounded"
                            >
                              +{opt.optionName}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Special instructions */}
                      {item.specialInstructions && (
                        <p className="text-[11px] text-orange-700 font-medium italic mt-1">
                          Ghi chú: {item.specialInstructions}
                        </p>
                      )}
                    </div>

                    <div className="mt-2 flex items-center justify-between pt-1">
                      <span className="text-xs font-bold text-orange-600">
                        {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                      </span>

                      {/* Quantity buttons */}
                      <div className="flex items-center border border-stone-200 rounded-lg bg-white p-0.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-stone-500 hover:bg-stone-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-stone-500 hover:bg-stone-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Calculations */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-stone-200 bg-stone-50/80 space-y-4">
              
              {/* Voucher section */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      value={voucherInput}
                      onChange={e => setVoucherInput(e.target.value)}
                      placeholder="Nhập mã ưu đãi (VD: SINHVIEN10)"
                      className="w-full pl-8 pr-3 py-1.5 text-xs uppercase font-medium rounded-lg border border-stone-200 bg-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleApplyVoucher()}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-800 hover:bg-stone-900 text-white transition-colors"
                  >
                    Áp dụng
                  </button>
                </div>

                {/* Quick suggestions */}
                <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] text-stone-500 no-scrollbar">
                  <span>Gợi ý:</span>
                  {INITIAL_VOUCHERS.map(v => (
                    <button
                      key={v.code}
                      type="button"
                      onClick={() => handleApplyVoucher(v.code)}
                      className="text-stone-700 bg-white hover:bg-orange-50 border border-stone-200 px-1.5 py-0.5 rounded font-mono transition-colors"
                    >
                      {v.code}
                    </button>
                  ))}
                </div>

                {voucherError && (
                  <p className="text-xs text-rose-600 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3 h-3" />
                    {voucherError}
                  </p>
                )}

                {appliedVoucher && (
                  <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-800">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{appliedVoucher.code}: {appliedVoucher.description}</span>
                    </div>
                    <button
                      onClick={() => setAppliedVoucher(null)}
                      className="text-emerald-700 hover:text-emerald-950 font-bold ml-2"
                    >
                      Bỏ
                    </button>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-200/80 pt-3">
                <div className="flex justify-between">
                  <span>Tạm tính ({cart.length} món)</span>
                  <span className="font-medium text-stone-900">{cartTotal.toLocaleString('vi-VN')}₫</span>
                </div>
                {finalDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Mã giảm giá</span>
                    <span>-{finalDiscount.toLocaleString('vi-VN')}₫</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-extrabold text-stone-900 pt-1.5 border-t border-stone-200">
                  <span>Tổng thanh toán</span>
                  <span className="text-base text-orange-600">{finalTotal.toLocaleString('vi-VN')}₫</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                type="button"
                onClick={handleProceedCheckout}
                className="w-full py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span>Xác nhận & Thanh toán</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
