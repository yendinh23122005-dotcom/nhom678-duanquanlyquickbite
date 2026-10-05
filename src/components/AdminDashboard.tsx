import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  Package,
  Plus,
  Trash2,
  ToggleLeft,
  ToggleRight,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Clock,
  Search,
  Receipt
} from 'lucide-react';
import { useCanteen } from '../context/CanteenContext';
import { FoodItem, CategoryId } from '../types/canteen';
import { CATEGORIES } from '../data/initialMenu';

export const AdminDashboard: React.FC = () => {
  const {
    menu,
    orders,
    toggleAvailability,
    addMenuItem,
    deleteMenuItem,
    resetMenu,
    setTrackingOrderId
  } = useCanteen();

  const [activeTab, setActiveTab] = useState<'menu' | 'orders'>('menu');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [adminSearch, setAdminSearch] = useState('');

  // Form state for adding new item
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<CategoryId>('rice');
  const [newItemPrice, setNewItemPrice] = useState(35000);
  const [newItemImage, setNewItemImage] = useState('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80');
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemPrepTime, setNewItemPrepTime] = useState(5);
  const [newItemCalories, setNewItemCalories] = useState(450);

  // Statistics
  const totalRevenue = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0);
  const completedOrders = orders.filter(o => o.status === 'completed').length;
  const inProgressOrders = orders.filter(o => o.status === 'pending' || o.status === 'preparing').length;

  const filteredMenu = menu.filter(m =>
    m.name.toLowerCase().includes(adminSearch.toLowerCase()) ||
    m.category.toLowerCase().includes(adminSearch.toLowerCase())
  );

  const handleCreateFood = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const newFood: FoodItem = {
      id: 'f-custom-' + Date.now(),
      name: newItemName.trim(),
      category: newItemCategory,
      price: Number(newItemPrice),
      image: newItemImage.trim() || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
      description: newItemDesc.trim() || 'Món ăn thơm ngon chế biến theo công thức đặc biệt.',
      prepTimeMinutes: Number(newItemPrepTime) || 5,
      calories: Number(newItemCalories) || 400,
      isAvailable: true,
      isNew: true
    };

    addMenuItem(newFood);
    setIsAddModalOpen(false);
    // Reset form
    setNewItemName('');
    setNewItemDesc('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Top Banner Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Doanh thu Căn Tin</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-stone-900 tracking-tight">
            {totalRevenue.toLocaleString('vi-VN')}₫
          </p>
          <p className="text-xs text-stone-500 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-700 font-semibold">{orders.length} lượt gọi món</span>
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Đơn đang chế biến</span>
            <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-stone-900 tracking-tight">
            {inProgressOrders}
          </p>
          <p className="text-xs text-stone-500 mt-1">Đang cần bếp ưu tiên phục vụ</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Đơn đã hoàn tất</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-stone-900 tracking-tight">
            {completedOrders}
          </p>
          <p className="text-xs text-stone-500 mt-1">Khách đã nhận món ngon miệng</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Tổng món thực đơn</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-stone-900 tracking-tight">
            {menu.length}
          </p>
          <p className="text-xs text-stone-500 mt-1">
            {menu.filter(m => m.isAvailable).length} món đang sẵn sàng phục vụ
          </p>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-stone-200 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('menu')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'menu'
                ? 'bg-stone-900 text-white'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Quản Lý Thực Đơn ({menu.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'orders'
                ? 'bg-stone-900 text-white'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Lịch Sử Đơn Hàng ({orders.length})
          </button>
        </div>

        {activeTab === 'menu' && (
          <div className="flex items-center gap-2">
            <button
              onClick={resetMenu}
              className="px-3 py-1.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-100 text-xs font-medium flex items-center gap-1.5 transition-colors"
              title="Đặt lại danh sách món mẫu ban đầu"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Khôi phục mẫu</span>
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm món mới</span>
            </button>
          </div>
        )}
      </div>

      {/* TAB 1: Menu Management */}
      {activeTab === 'menu' && (
        <div className="space-y-4">
          {/* Search bar */}
          <div className="relative max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={adminSearch}
              onChange={e => setAdminSearch(e.target.value)}
              placeholder="Tìm kiếm món ăn trong kho thực đơn..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Món ăn</th>
                    <th className="py-3 px-4">Danh mục</th>
                    <th className="py-3 px-4">Giá bán</th>
                    <th className="py-3 px-4">Thời gian</th>
                    <th className="py-3 px-4">Trạng thái bán</th>
                    <th className="py-3 px-4 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredMenu.map(item => (
                    <tr key={item.id} className="hover:bg-stone-50/70 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 rounded-lg object-cover bg-stone-100 shrink-0"
                          />
                          <div>
                            <p className="font-bold text-stone-900 text-sm">{item.name}</p>
                            <p className="text-[11px] text-stone-400 line-clamp-1">{item.description}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-stone-600 font-medium">
                        {CATEGORIES.find(c => c.id === item.category)?.name || item.category}
                      </td>

                      <td className="py-3 px-4 font-bold text-orange-600">
                        {item.price.toLocaleString('vi-VN')}₫
                      </td>

                      <td className="py-3 px-4 text-stone-500">
                        {item.prepTimeMinutes} phút · {item.calories} kcal
                      </td>

                      <td className="py-3 px-4">
                        <button
                          type="button"
                          onClick={() => toggleAvailability(item.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                            item.isAvailable
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-stone-100 text-stone-600 border border-stone-200'
                          }`}
                        >
                          {item.isAvailable ? (
                            <>
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                              <span>Còn món</span>
                            </>
                          ) : (
                            <>
                              <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                              <span>Tạm hết</span>
                            </>
                          )}
                        </button>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => deleteMenuItem(item.id)}
                          className="p-1.5 text-stone-300 hover:text-rose-600 rounded-lg transition-colors"
                          title="Xóa món khỏi thực đơn"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Orders History */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Mã đơn</th>
                  <th className="py-3 px-4">Khách hàng</th>
                  <th className="py-3 px-4">Bàn / Còi</th>
                  <th className="py-3 px-4">Các món</th>
                  <th className="py-3 px-4">Tổng tiền</th>
                  <th className="py-3 px-4">Thanh toán</th>
                  <th className="py-3 px-4">Trạng thái</th>
                  <th className="py-3 px-4 text-right">Chi tiết</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-stone-900">
                      {order.id}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-stone-800">{order.customerName}</p>
                      {order.customerPhone && (
                        <p className="text-[11px] text-stone-400">{order.customerPhone}</p>
                      )}
                    </td>
                    <td className="py-3 px-4 font-bold text-stone-700">
                      {order.buzzerNumber ? `Còi #${order.buzzerNumber}` : order.tableNumber || '-'}
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-stone-600 max-w-xs truncate">
                        {order.items.map(it => `${it.quantity}x ${it.name}`).join(', ')}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-extrabold text-orange-600">
                      {order.total.toLocaleString('vi-VN')}₫
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[11px] font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded">
                        {order.paymentMethod === 'canteen_card'
                          ? 'Thẻ Căn Tin'
                          : order.paymentMethod === 'qr_vietqr'
                          ? 'VietQR'
                          : 'Tiền mặt'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                          order.status === 'completed'
                            ? 'bg-blue-50 text-blue-700'
                            : order.status === 'ready'
                            ? 'bg-emerald-50 text-emerald-700'
                            : order.status === 'preparing'
                            ? 'bg-orange-50 text-orange-700'
                            : 'bg-stone-100 text-stone-700'
                        }`}
                      >
                        {order.status === 'completed'
                          ? 'Đã xong'
                          : order.status === 'ready'
                          ? 'Đang gọi chuông'
                          : order.status === 'preparing'
                          ? 'Đang nấu'
                          : 'Chờ nhận'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setTrackingOrderId(order.id)}
                        className="px-2.5 py-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold transition-colors"
                      >
                        Xem phiếu
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-stone-900 mb-4">Thêm Món Ăn Mới Vào Căn Tin</h3>
            
            <form onSubmit={handleCreateFood} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Tên món</label>
                <input
                  type="text"
                  required
                  value={newItemName}
                  onChange={e => setNewItemName(e.target.value)}
                  placeholder="VD: Cơm sườn xào chua ngọt"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Phân loại</label>
                  <select
                    value={newItemCategory}
                    onChange={e => setNewItemCategory(e.target.value as CategoryId)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-orange-500"
                  >
                    {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Giá bán (VNĐ)</label>
                  <input
                    type="number"
                    step="1000"
                    required
                    value={newItemPrice}
                    onChange={e => setNewItemPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Link ảnh món (URL)</label>
                <input
                  type="url"
                  value={newItemImage}
                  onChange={e => setNewItemImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Mô tả nguyên liệu</label>
                <textarea
                  rows={2}
                  value={newItemDesc}
                  onChange={e => setNewItemDesc(e.target.value)}
                  placeholder="Thịt tươi thơm ngon, sốt chua ngọt..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Thời gian nấu (phút)</label>
                  <input
                    type="number"
                    value={newItemPrepTime}
                    onChange={e => setNewItemPrepTime(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Lượng Calo (kcal)</label>
                  <input
                    type="number"
                    value={newItemCalories}
                    onChange={e => setNewItemCalories(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-xs font-bold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-all shadow-xs"
                >
                  Thêm món ngay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
