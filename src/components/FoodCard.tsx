import React from 'react';
import { Plus, Clock, Flame, Leaf, Sparkles } from 'lucide-react';
import { FoodItem } from '../types/canteen';

interface FoodCardProps {
  item: FoodItem;
  onSelect: (item: FoodItem) => void;
  onQuickAdd: (item: FoodItem) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item, onSelect, onQuickAdd }) => {
  const hasOptions = item.options && item.options.length > 0;

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!item.isAvailable) return;
    if (hasOptions) {
      onSelect(item);
    } else {
      onQuickAdd(item);
    }
  };

  return (
    <div
      onClick={() => onSelect(item)}
      className={`group cursor-pointer rounded-2xl bg-white border border-stone-200/80 overflow-hidden flex flex-col transition-all duration-200 hover:shadow-md hover:border-stone-300 relative ${
        !item.isAvailable ? 'opacity-65 grayscale-[30%]' : ''
      }`}
    >
      {/* Food Image & Badge Highlights */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Highlights banner if popular / new / veg */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
          {item.isPopular && (
            <span className="text-[11px] font-semibold text-amber-900 bg-amber-100/95 backdrop-blur px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-600 fill-amber-500" />
              Bán chạy
            </span>
          )}
          {item.isVegetarian && (
            <span className="text-[11px] font-semibold text-emerald-900 bg-emerald-100/95 backdrop-blur px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
              <Leaf className="w-3 h-3 text-emerald-600" />
              Món chay
            </span>
          )}
          {item.isNew && (
            <span className="text-[11px] font-semibold text-indigo-900 bg-indigo-100/95 backdrop-blur px-2 py-0.5 rounded shadow-sm">
              Món mới
            </span>
          )}
        </div>

        {/* Out of stock overlay */}
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <span className="bg-stone-900 text-white font-bold text-xs uppercase tracking-wider px-3 py-1.5 rounded-lg border border-stone-700">
              Tạm Hết Món
            </span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Metadata with subtle dot separators */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1.5 font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-stone-400" />
              {item.prepTimeMinutes} phút
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="flex items-center gap-1">
              <Flame className="w-3 h-3 text-stone-400" />
              {item.calories} kcal
            </span>
            {item.spicyLevel ? (
              <>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span className="text-orange-600 font-semibold text-[11px]">
                  {'🌶️'.repeat(item.spicyLevel)}
                </span>
              </>
            ) : null}
          </div>

          {/* Title */}
          <h3 className="font-bold text-stone-900 text-base leading-snug line-clamp-1 group-hover:text-orange-600 transition-colors">
            {item.name}
          </h3>

          {/* Description */}
          <p className="mt-1 text-xs text-stone-500 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Bottom Price & Add Action */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-extrabold text-orange-600">
              {item.price.toLocaleString('vi-VN')}₫
            </span>
            {item.originalPrice && (
              <span className="text-xs text-stone-400 line-through">
                {item.originalPrice.toLocaleString('vi-VN')}₫
              </span>
            )}
          </div>

          <button
            type="button"
            disabled={!item.isAvailable}
            onClick={handleActionClick}
            className={`flex items-center gap-1 text-xs font-semibold py-1.5 px-3 rounded-lg transition-all ${
              !item.isAvailable
                ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                : hasOptions
                ? 'bg-stone-100 hover:bg-orange-50 text-stone-800 hover:text-orange-700 border border-stone-200'
                : 'bg-orange-600 hover:bg-orange-700 text-white shadow-xs'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{hasOptions ? 'Tùy chọn' : 'Thêm'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
