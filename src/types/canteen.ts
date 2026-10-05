export type CategoryId = 'all' | 'rice' | 'noodles' | 'snacks' | 'drinks' | 'desserts';

export interface Category {
  id: CategoryId;
  name: string;
  iconName: string;
}

export interface FoodOption {
  name: string;
  price: number;
}

export interface FoodItem {
  id: string;
  name: string;
  category: CategoryId;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  prepTimeMinutes: number;
  calories: number;
  isAvailable: boolean;
  isVegetarian?: boolean;
  isPopular?: boolean;
  isNew?: boolean;
  spicyLevel?: number; // 0 to 3
  options?: {
    title: string;
    items: FoodOption[];
  }[];
}

export interface CartItemOption {
  groupTitle: string;
  optionName: string;
  price: number;
}

export interface CartItem {
  id: string; // unique item instance id in cart
  foodId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedOptions: CartItemOption[];
  specialInstructions?: string;
}

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
export type PaymentMethod = 'qr_vietqr' | 'canteen_card' | 'cash';
export type OrderType = 'dine_in' | 'takeaway';

export interface Order {
  id: string; // e.g. CTG-8421
  customerName: string;
  customerPhone?: string;
  orderType: OrderType;
  tableNumber?: string;
  buzzerNumber?: string;
  pickupTime?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  voucherCode?: string;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'unpaid';
  status: OrderStatus;
  createdAt: string;
  readyAt?: string;
  completedAt?: string;
}

export interface CanteenUserCard {
  cardNumber: string;
  holderName: string;
  userRole: 'Sinh viên' | 'Giảng viên' | 'Nhân viên';
  balance: number;
  studentId: string;
  avatar: string;
}

export interface Voucher {
  code: string;
  description: string;
  discountPercent?: number;
  discountAmount?: number;
  minOrder: number;
}
