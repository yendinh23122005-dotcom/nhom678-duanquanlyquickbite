import React, { useState } from 'react';
import { Search, Flame, Leaf, Sparkles, Utensils, Coffee, Soup, Sandwich, IceCream, CookingPot, Tag } from 'lucide-react';
import { useCanteen } from '../context/CanteenContext';
import { FoodCard } from './FoodCard';
import { FoodDetailModal } from './FoodDetailModal';
import { FoodItem, CategoryId } from '../types/canteen';
import { CATEGORIES } from '../data/initialMenu';

export const CustomerMenu: React.FC = () => {
  const {
    menu,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    dietaryFilter,
    setDietaryFilter,
    addToCart
  } = useCanteen();

  const [selectedFoodForModal, setSelectedFoodForModal] = useState<FoodItem | null>(null);

  // Filter items
  const filteredItems = menu.filter(item => {
    // Category match
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }

    // Dietary filter
    if (dietaryFilter === 'veg' && !item.isVegetarian) return false;
    if (dietaryFilter === 'popular' && !item.isPopular) return false;
    if (dietaryFilter === 'under40k' && item.price >= 40000) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      if (!matchName && !matchDesc) return false;
    }

    return true;
  });

  const getCategoryIcon = (id: CategoryId) => {
    switch (id) {
      case 'rice': return <CookingPot className="w-4 h-4" />;
      case 'noodles': return <Soup className="w-4 h-4" />;
      case 'snacks': return <Sandwich className="w-4 h-4" />;
      case 'drinks': return <Coffee className="w-4 h-4" />;
      case 'desserts': return <IceCream className="w-4 h-4" />;
      default: return <Utensils className="w-4 h-4" />;
    }
  };

  const handleQuickAdd = (item: FoodItem) => {
    addToCart({
      foodId: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
      selectedOptions: []
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-orange-600 via-amber-600 to-amber-700 text-white p-6 sm:p-8 shadow-sm">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>Thực đơn Căn Tin hôm nay · Phục vụ nhanh trong 5 - 10 phút</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Đặt Món Nóng Hổi, Không Cần Xếp Hàng!
          </h1>

          <p className="text-sm text-orange-100 leading-relaxed">
            Chọn món yêu thích, thanh toán tiện lợi qua thẻ Căn Tin hoặc mã VietQR. Chuông rung thông minh sẽ thông báo khi món ăn đã sẵn sàng tại quầy.
          </p>

          <div className="pt-2 flex flex-wrap gap-3 text-xs font-medium text-orange-100">
            <span className="flex items-center gap-1">
              ✓ Thực phẩm tươi nóng mỗi ngày
            </span>
            <span className="flex items-center gap-1">
              ✓ Giảm ngay 10% với thẻ sinh viên
            </span>
            <span className="flex items-center gap-1">
              ✓ Rung chuông còi tự động
            </span>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none flex items-center justify-center">
          <Utensils className="w-64 h-64 -rotate-12" />
        </div>
      </div>

      {/* Search and Secondary Filter Row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm món ăn, cơm tấm, phở, bún, trà sữa..."
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Quick Filter Segmented Buttons */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl border border-stone-200 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setDietaryFilter('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors shrink-0 ${
              dietaryFilter === 'all'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Tất cả
          </button>
          <button
            type="button"
            onClick={() => setDietaryFilter('popular')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors shrink-0 flex items-center gap-1 ${
              dietaryFilter === 'popular'
                ? 'bg-white text-amber-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>Bán chạy</span>
          </button>
          <button
            type="button"
            onClick={() => setDietaryFilter('veg')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors shrink-0 flex items-center gap-1 ${
              dietaryFilter === 'veg'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Leaf className="w-3 h-3 text-emerald-600" />
            <span>Món chay</span>
          </button>
          <button
            type="button"
            onClick={() => setDietaryFilter('under40k')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors shrink-0 flex items-center gap-1 ${
              dietaryFilter === 'under40k'
                ? 'bg-white text-orange-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Tag className="w-3 h-3 text-orange-600" />
            <span>Tiết kiệm (&lt; 40k)</span>
          </button>
        </div>

      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {CATEGORIES.map(category => {
          const isSelected = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                isSelected
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'bg-white hover:bg-stone-50 border border-stone-200 text-stone-700'
              }`}
            >
              {getCategoryIcon(category.id)}
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>

      {/* Food Items Count & Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-stone-500 font-medium">
            Hiển thị <span className="font-bold text-stone-800">{filteredItems.length}</span> món ngon
          </p>
        </div>

        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center text-stone-400 space-y-3">
            <Utensils className="w-12 h-12 stroke-1 mx-auto text-stone-300" />
            <h3 className="font-bold text-base text-stone-700">Không tìm thấy món phù hợp</h3>
            <p className="text-xs text-stone-400 max-w-sm mx-auto">
              Hãy thử tìm kiếm với từ khóa khác hoặc bỏ chọn bộ lọc để xem toàn bộ thực đơn.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setDietaryFilter('all');
              }}
              className="mt-2 px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700 transition-colors"
            >
              Xem tất cả món
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {filteredItems.map(item => (
              <FoodCard
                key={item.id}
                item={item}
                onSelect={food => setSelectedFoodForModal(food)}
                onQuickAdd={handleQuickAdd}
              />
            ))}
          </div>
        )}
      </div>

      {/* Food Detail Modal */}
      <FoodDetailModal
        item={selectedFoodForModal}
        onClose={() => setSelectedFoodForModal(null)}
      />

    </div>
  );
};
