import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Clock, Flame, Check } from 'lucide-react';
import { FoodItem, CartItemOption } from '../types/canteen';
import { useCanteen } from '../context/CanteenContext';

interface FoodDetailModalProps {
  item: FoodItem | null;
  onClose: () => void;
}

export const FoodDetailModal: React.FC<FoodDetailModalProps> = ({ item, onClose }) => {
  const { addToCart } = useCanteen();

  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<CartItemOption[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Reset state when item changes
  useEffect(() => {
    if (item) {
      setQuantity(1);
      setSelectedOptions([]);
      setSpecialInstructions('');
    }
  }, [item]);

  if (!item) return null;

  const toggleOption = (groupTitle: string, optionName: string, price: number, isRadio: boolean) => {
    if (isRadio) {
      // Replace existing selection in same group
      setSelectedOptions(prev => [
        ...prev.filter(o => o.groupTitle !== groupTitle),
        { groupTitle, optionName, price }
      ]);
    } else {
      // Toggle
      setSelectedOptions(prev => {
        const exists = prev.some(o => o.groupTitle === groupTitle && o.optionName === optionName);
        if (exists) {
          return prev.filter(o => !(o.groupTitle === groupTitle && o.optionName === optionName));
        } else {
          return [...prev, { groupTitle, optionName, price }];
        }
      });
    }
  };

  const optionsTotal = selectedOptions.reduce((sum, opt) => sum + opt.price, 0);
  const unitPrice = item.price + optionsTotal;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart({
      foodId: item.id,
      name: item.name,
      price: unitPrice,
      image: item.image,
      quantity,
      selectedOptions,
      specialInstructions: specialInstructions.trim() || undefined
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150 my-8">
        
        {/* Header Image */}
        <div className="relative aspect-[16/9] w-full bg-stone-100">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center transition-colors backdrop-blur-xs"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[65vh] overflow-y-auto">
          {/* Metadata */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-1 font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              Chuẩn bị ~{item.prepTimeMinutes} phút
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-stone-400" />
              {item.calories} kcal
            </span>
          </div>

          <h2 className="text-xl font-bold text-stone-900 leading-snug">
            {item.name}
          </h2>

          <p className="mt-1.5 text-sm text-stone-600 leading-relaxed">
            {item.description}
          </p>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-lg font-bold text-orange-600">
              {item.price.toLocaleString('vi-VN')}₫
            </span>
            {item.originalPrice && (
              <span className="text-sm text-stone-400 line-through">
                {item.originalPrice.toLocaleString('vi-VN')}₫
              </span>
            )}
          </div>

          {/* Customization Options */}
          {item.options && item.options.length > 0 && (
            <div className="mt-6 space-y-5 border-t border-stone-100 pt-5">
              {item.options.map((group, groupIdx) => {
                // Determine if group is radio style (e.g. single choice like mức đường, loại cà phê)
                const isSingleChoice = group.title.includes('Mức') || group.title.includes('Lượng') || group.title.includes('Loại');

                return (
                  <div key={groupIdx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                        {group.title}
                      </h4>
                      <span className="text-[11px] text-stone-400">
                        {isSingleChoice ? 'Chọn 1' : 'Có thể chọn nhiều'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-1.5">
                      {group.items.map((opt, optIdx) => {
                        const isSelected = selectedOptions.some(
                          o => o.groupTitle === group.title && o.optionName === opt.name
                        );

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => toggleOption(group.title, opt.name, opt.price, isSingleChoice)}
                            className={`flex items-center justify-between p-2.5 rounded-xl border text-sm text-left transition-colors ${
                              isSelected
                                ? 'border-orange-500 bg-orange-50/50 text-stone-900 font-medium'
                                : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-white'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-4 h-4 rounded-md flex items-center justify-center transition-colors ${
                                  isSelected
                                    ? 'bg-orange-600 text-white'
                                    : 'border border-stone-300 bg-white'
                                }`}
                              >
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <span>{opt.name}</span>
                            </div>

                            {opt.price > 0 && (
                              <span className="text-xs text-stone-500 font-medium">
                                +{opt.price.toLocaleString('vi-VN')}₫
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Special notes */}
          <div className="mt-5 border-t border-stone-100 pt-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
              Ghi chú cho bếp (Tùy chọn)
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={e => setSpecialInstructions(e.target.value)}
              placeholder="VD: Không hành lá, ít cay, mang nước chấm riêng..."
              className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-4">
          {/* Quantity Selector */}
          <div className="flex items-center border border-stone-200 rounded-xl bg-white p-1">
            <button
              type="button"
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-100 disabled:opacity-30 disabled:hover:bg-transparent"
              aria-label="Giảm"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center text-sm font-bold text-stone-900">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(q => q + 1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-100"
              aria-label="Tăng"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm flex items-center justify-between shadow-sm transition-all"
          >
            <span>Thêm vào giỏ hàng</span>
            <span>{totalPrice.toLocaleString('vi-VN')}₫</span>
          </button>
        </div>

      </div>
    </div>
  );
};
