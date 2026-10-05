import React, { createContext, useContext, useState, useEffect } from 'react';
import { FoodItem, CartItem, Order, OrderStatus, CategoryId, CanteenUserCard } from '../types/canteen';
import { INITIAL_MENU, INITIAL_USER_CARD } from '../data/initialMenu';
import { sounds } from '../utils/audio';

interface CanteenContextType {
  menu: FoodItem[];
  cart: CartItem[];
  orders: Order[];
  userCard: CanteenUserCard;
  activeView: 'menu' | 'kitchen' | 'admin' | 'my-orders' | 'import-code';
  setActiveView: (view: 'menu' | 'kitchen' | 'admin' | 'my-orders' | 'import-code') => void;
  selectedCategory: CategoryId;
  setSelectedCategory: (cat: CategoryId) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  dietaryFilter: 'all' | 'veg' | 'popular' | 'under40k';
  setDietaryFilter: (f: 'all' | 'veg' | 'popular' | 'under40k') => void;
  
  // Cart
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  // Checkout & Modals
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isCardModalOpen: boolean;
  setIsCardModalOpen: (open: boolean) => void;
  trackingOrderId: string | null;
  setTrackingOrderId: (id: string | null) => void;
  showVercelNotice: boolean;
  setShowVercelNotice: (show: boolean) => void;

  // Orders
  createOrder: (orderInfo: {
    customerName: string;
    customerPhone: string;
    orderType: 'dine_in' | 'takeaway';
    tableNumber?: string;
    buzzerNumber?: string;
    paymentMethod: 'qr_vietqr' | 'canteen_card' | 'cash';
    voucherCode?: string;
    discount: number;
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  
  // Card
  topUpCard: (amount: number) => void;

  // Menu Admin
  toggleAvailability: (id: string) => void;
  updateMenuItem: (item: FoodItem) => void;
  addMenuItem: (item: FoodItem) => void;
  deleteMenuItem: (id: string) => void;
  resetMenu: () => void;
}

const CanteenContext = createContext<CanteenContextType | undefined>(undefined);

const SAMPLE_ORDERS: Order[] = [
  {
    id: 'CTG-9024',
    customerName: 'Trần Minh Quân',
    customerPhone: '0901234567',
    orderType: 'dine_in',
    tableNumber: 'Bàn 08',
    buzzerNumber: '08',
    items: [
      {
        id: 'c-1',
        foodId: 'f-1',
        name: 'Cơm Tấm Sườn Bì Chả Đặc Biệt',
        price: 52000,
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
        quantity: 1,
        selectedOptions: [{ groupTitle: 'Món gọi thêm', optionName: 'Thêm trứng ốp la lòng đào', price: 7000 }]
      },
      {
        id: 'c-2',
        foodId: 'f-10',
        name: 'Trà Đào Cam Sả Tươi Mát Lạnh',
        price: 25000,
        image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80',
        quantity: 1,
        selectedOptions: []
      }
    ],
    subtotal: 77000,
    discount: 7700,
    voucherCode: 'SINHVIEN10',
    total: 69300,
    paymentMethod: 'canteen_card',
    paymentStatus: 'paid',
    status: 'preparing',
    createdAt: new Date(Date.now() - 6 * 60000).toISOString()
  },
  {
    id: 'CTG-9023',
    customerName: 'Lê Thu Trang',
    customerPhone: '0987654321',
    orderType: 'takeaway',
    buzzerNumber: '14',
    items: [
      {
        id: 'c-3',
        foodId: 'f-2',
        name: 'Phở Bò Tái Nạm Cổ Truyền',
        price: 47000,
        image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600&auto=format&fit=crop&q=80',
        quantity: 1,
        selectedOptions: [{ groupTitle: 'Món gọi thêm', optionName: 'Thêm dĩa quẩy giòn (2 cái)', price: 5000 }]
      },
      {
        id: 'c-4',
        foodId: 'f-9',
        name: 'Trà Sữa Trân Châu Đường Đen',
        price: 36000,
        image: 'https://images.unsplash.com/photo-1558857563-b37cf5a14d59?w=600&auto=format&fit=crop&q=80',
        quantity: 1,
        selectedOptions: [{ groupTitle: 'Topping thêm', optionName: 'Thêm kem cheese béo mặn', price: 8000 }]
      }
    ],
    subtotal: 83000,
    discount: 0,
    total: 83000,
    paymentMethod: 'qr_vietqr',
    paymentStatus: 'paid',
    status: 'ready',
    createdAt: new Date(Date.now() - 14 * 60000).toISOString(),
    readyAt: new Date(Date.now() - 2 * 60000).toISOString()
  }
];

export const CanteenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menu, setMenu] = useState<FoodItem[]>(() => {
    try {
      const saved = localStorage.getItem('canteen_menu');
      return saved ? JSON.parse(saved) : INITIAL_MENU;
    } catch {
      return INITIAL_MENU;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('canteen_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('canteen_orders');
      return saved ? JSON.parse(saved) : SAMPLE_ORDERS;
    } catch {
      return SAMPLE_ORDERS;
    }
  });

  const [userCard, setUserCard] = useState<CanteenUserCard>(() => {
    try {
      const saved = localStorage.getItem('canteen_user_card');
      return saved ? JSON.parse(saved) : INITIAL_USER_CARD;
    } catch {
      return INITIAL_USER_CARD;
    }
  });

  const [activeView, setActiveView] = useState<'menu' | 'kitchen' | 'admin' | 'my-orders' | 'import-code'>('menu');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'popular' | 'under40k'>('all');

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState<string | null>(null);
  const [showVercelNotice, setShowVercelNotice] = useState(true);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('canteen_menu', JSON.stringify(menu));
  }, [menu]);

  useEffect(() => {
    localStorage.setItem('canteen_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('canteen_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('canteen_user_card', JSON.stringify(userCard));
  }, [userCard]);

  // Cart operations
  const addToCart = (item: Omit<CartItem, 'id'>) => {
    sounds.playAddToCart();
    const uniqueId = 'cart-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
    
    // Check if identical item already in cart
    const existingIndex = cart.findIndex(c => 
      c.foodId === item.foodId &&
      JSON.stringify(c.selectedOptions) === JSON.stringify(item.selectedOptions) &&
      (c.specialInstructions || '') === (item.specialInstructions || '')
    );

    if (existingIndex > -1) {
      setCart(prev => {
        const next = [...prev];
        next[existingIndex].quantity += item.quantity;
        return next;
      });
    } else {
      setCart(prev => [...prev, { ...item, id: uniqueId }]);
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Order creation
  const createOrder = (orderInfo: {
    customerName: string;
    customerPhone: string;
    orderType: 'dine_in' | 'takeaway';
    tableNumber?: string;
    buzzerNumber?: string;
    paymentMethod: 'qr_vietqr' | 'canteen_card' | 'cash';
    voucherCode?: string;
    discount: number;
  }): Order => {
    const orderNum = Math.floor(1000 + Math.random() * 9000);
    const newOrderId = `CTG-${orderNum}`;
    const subtotal = cartTotal;
    const total = Math.max(0, subtotal - orderInfo.discount);

    // If paid by Canteen card, deduct balance
    if (orderInfo.paymentMethod === 'canteen_card') {
      setUserCard(prev => ({
        ...prev,
        balance: Math.max(0, prev.balance - total)
      }));
    }

    const newOrder: Order = {
      id: newOrderId,
      customerName: orderInfo.customerName || 'Khách Canteen',
      customerPhone: orderInfo.customerPhone,
      orderType: orderInfo.orderType,
      tableNumber: orderInfo.tableNumber,
      buzzerNumber: orderInfo.buzzerNumber || String(Math.floor(1 + Math.random() * 50)).padStart(2, '0'),
      items: [...cart],
      subtotal,
      discount: orderInfo.discount,
      voucherCode: orderInfo.voucherCode,
      total,
      paymentMethod: orderInfo.paymentMethod,
      paymentStatus: 'paid',
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    sounds.playOrderSuccess();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          const updated: Order = { ...ord, status };
          if (status === 'ready') {
            updated.readyAt = new Date().toISOString();
            sounds.playOrderReady();
          }
          if (status === 'completed') {
            updated.completedAt = new Date().toISOString();
          }
          return updated;
        }
        return ord;
      })
    );
  };

  // Card top up
  const topUpCard = (amount: number) => {
    setUserCard(prev => ({
      ...prev,
      balance: prev.balance + amount
    }));
  };

  // Menu Admin
  const toggleAvailability = (id: string) => {
    setMenu(prev =>
      prev.map(item => (item.id === id ? { ...item, isAvailable: !item.isAvailable } : item))
    );
  };

  const updateMenuItem = (item: FoodItem) => {
    setMenu(prev => prev.map(m => (m.id === item.id ? item : m)));
  };

  const addMenuItem = (item: FoodItem) => {
    setMenu(prev => [item, ...prev]);
  };

  const deleteMenuItem = (id: string) => {
    setMenu(prev => prev.filter(m => m.id !== id));
  };

  const resetMenu = () => {
    setMenu(INITIAL_MENU);
  };

  return (
    <CanteenContext.Provider
      value={{
        menu,
        cart,
        orders,
        userCard,
        activeView,
        setActiveView,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        dietaryFilter,
        setDietaryFilter,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isCardModalOpen,
        setIsCardModalOpen,
        trackingOrderId,
        setTrackingOrderId,
        showVercelNotice,
        setShowVercelNotice,
        createOrder,
        updateOrderStatus,
        topUpCard,
        toggleAvailability,
        updateMenuItem,
        addMenuItem,
        deleteMenuItem,
        resetMenu
      }}
    >
      {children}
    </CanteenContext.Provider>
  );
};

export const useCanteen = () => {
  const context = useContext(CanteenContext);
  if (!context) {
    throw new Error('useCanteen must be used within a CanteenProvider');
  }
  return context;
};
