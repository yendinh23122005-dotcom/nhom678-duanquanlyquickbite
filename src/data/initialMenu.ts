import { FoodItem, Category, Voucher, CanteenUserCard } from '../types/canteen';

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'Tất Cả Món', iconName: 'Utensils' },
  { id: 'rice', name: 'Cơm & Món Chính', iconName: 'CookingPot' },
  { id: 'noodles', name: 'Bún / Phở / Mì', iconName: 'Soup' },
  { id: 'snacks', name: 'Ăn Vặt & Bánh', iconName: 'Sandwich' },
  { id: 'drinks', name: 'Đồ Uống & Trà', iconName: 'Coffee' },
  { id: 'desserts', name: 'Tráng Miệng', iconName: 'IceCream' },
];

export const INITIAL_MENU: FoodItem[] = [
  {
    id: 'f-1',
    name: 'Cơm Tấm Sườn Bì Chả Đặc Biệt',
    category: 'rice',
    price: 45000,
    originalPrice: 50000,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
    description: 'Sườn nướng mật ong vàng ruộm thơm lừng, bì heo dai giòn trộn thính, chả trứng hấp béo ngậy kèm dưa leo chua ngọt.',
    prepTimeMinutes: 7,
    calories: 680,
    isAvailable: true,
    isPopular: true,
    options: [
      {
        title: 'Món gọi thêm',
        items: [
          { name: 'Thêm trứng ốp la lòng đào', price: 7000 },
          { name: 'Thêm chén cơm thêm', price: 5000 },
          { name: 'Thêm 1 miếng sườn nướng', price: 20000 },
          { name: 'Thêm canh rong biển thịt bằm', price: 8000 }
        ]
      },
      {
        title: 'Lựa chọn gia vị',
        items: [
          { name: 'Nhiều mỡ hành tóp mỡ', price: 0 },
          { name: 'Không hành lá', price: 0 },
          { name: 'Nước mắm cay riêng', price: 0 }
        ]
      }
    ]
  },
  {
    id: 'f-2',
    name: 'Phở Bò Tái Nạm Cổ Truyền',
    category: 'noodles',
    price: 42000,
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600&auto=format&fit=crop&q=80',
    description: 'Nước dùng hầm xương ống 12 tiếng thơm quế hồi thảo quả, thịt bò mềm ngọt, bánh phở tươi tráng thủ công.',
    prepTimeMinutes: 5,
    calories: 520,
    isAvailable: true,
    isPopular: true,
    options: [
      {
        title: 'Món gọi thêm',
        items: [
          { name: 'Thêm trứng chần thảo mộc', price: 6000 },
          { name: 'Thêm dĩa quẩy giòn (2 cái)', price: 5000 },
          { name: 'Thêm thịt bò tái nạm', price: 15000 }
        ]
      },
      {
        title: 'Hành và rau',
        items: [
          { name: 'Nhiều đầu hành hoa', price: 0 },
          { name: 'Không hành ngò', price: 0 },
          { name: 'Rau quế giá trụng chín', price: 0 }
        ]
      }
    ]
  },
  {
    id: 'f-3',
    name: 'Cơm Gà Xối Mỡ Da Giòn',
    category: 'rice',
    price: 42000,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=600&auto=format&fit=crop&q=80',
    description: 'Đùi gà góc tư chiên xối mỡ vàng óng da siêu giòn, cơm chiên cà chua thơm mềm cùng xốt chua ngọt đặc trưng.',
    prepTimeMinutes: 8,
    calories: 720,
    isAvailable: true,
    isPopular: true,
    options: [
      {
        title: 'Gia vị & món kèm',
        items: [
          { name: 'Thêm chén canh rau củ', price: 5000 },
          { name: 'Thêm xốt chua cay đặc biệt', price: 3000 },
          { name: 'Nâng cấp cơm thêm', price: 5000 }
        ]
      }
    ]
  },
  {
    id: 'f-4',
    name: 'Bún Đậu Mắm Tôm Thập Cẩm',
    category: 'noodles',
    price: 48000,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80',
    description: 'Mẹt bún lá cắt miếng, đậu mơ rán lướt ván giòn vỏ mềm trong, chả cốm Hà Nội chiên phồng, nem chua rán và thịt luộc.',
    prepTimeMinutes: 9,
    calories: 610,
    isAvailable: true,
    options: [
      {
        title: 'Lựa chọn nước chấm',
        items: [
          { name: 'Mắm tôm đánh sủi bọt tắc ớt', price: 0 },
          { name: 'Nước mắm chua ngọt (Không ăn mắm tôm)', price: 0 }
        ]
      },
      {
        title: 'Gọi thêm',
        items: [
          { name: 'Thêm nem chua rán', price: 10000 },
          { name: 'Thêm chả cốm chiên', price: 10000 },
          { name: 'Thêm dĩa đậu rán giòn', price: 8000 }
        ]
      }
    ]
  },
  {
    id: 'f-5',
    name: 'Mì Trộn Xá Xíu Trứng Lòng Đào',
    category: 'noodles',
    price: 38000,
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=600&auto=format&fit=crop&q=80',
    description: 'Mì trứng dai ngon trộn sốt cay ngọt kiểu Hong Kong, thịt xá xíu mềm thơm, rau cải thìa, tóp mỡ giòn rụm.',
    prepTimeMinutes: 6,
    calories: 550,
    isAvailable: true,
    isNew: true,
    spicyLevel: 1,
    options: [
      {
        title: 'Mức độ cay',
        items: [
          { name: 'Cay vừa chuẩn vị', price: 0 },
          { name: 'Ít cay nhẹ', price: 0 },
          { name: 'Không cay', price: 0 },
          { name: 'Siêu cay cấp độ 2', price: 0 }
        ]
      },
      {
        title: 'Thêm topping',
        items: [
          { name: 'Thêm há cảo tôm thịt (2 viên)', price: 10000 },
          { name: 'Thêm trứng luộc lòng đào', price: 6000 }
        ]
      }
    ]
  },
  {
    id: 'f-6',
    name: 'Cơm Chay Nấm Kho Tiêu Tô Đất',
    category: 'rice',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
    description: 'Món chay thuần khiết với nấm đùi gà, nấm rơm kho quẹt tiêu đen cay nồng, ăn kèm rau củ luộc thanh mát.',
    prepTimeMinutes: 6,
    calories: 390,
    isAvailable: true,
    isVegetarian: true,
    options: [
      {
        title: 'Thêm món chay',
        items: [
          { name: 'Thêm canh chua đậu hũ chay', price: 7000 },
          { name: 'Thêm chả lụa chay chiên giòn', price: 8000 }
        ]
      }
    ]
  },
  {
    id: 'f-7',
    name: 'Bánh Mì Thịt Nướng Căn Tin',
    category: 'snacks',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=600&auto=format&fit=crop&q=80',
    description: 'Bánh mì giòn rụm kẹp thịt xiên nướng sả, pate gan béo mịn, bơ trứng béo ngậy, đồ chua và dưa leo giòn mát.',
    prepTimeMinutes: 3,
    calories: 420,
    isAvailable: true,
    isPopular: true,
    options: [
      {
        title: 'Tùy chọn',
        items: [
          { name: 'Thêm pate gan béo', price: 5000 },
          { name: 'Thêm trứng ốp la', price: 7000 },
          { name: 'Không ớt, không ngò', price: 0 }
        ]
      }
    ]
  },
  {
    id: 'f-8',
    name: 'Khoai Tây Lắc Phô Mai Rong Biển',
    category: 'snacks',
    price: 22000,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80',
    description: 'Khoai tây sợi vàng ươm mới chiên giòn rụm, lắc đều bột phô mai béo mặn và rong biển sấy thơm nức mũi.',
    prepTimeMinutes: 5,
    calories: 360,
    isAvailable: true,
    options: [
      {
        title: 'Gia vị lắc',
        items: [
          { name: 'Phô mai truyền thống', price: 0 },
          { name: 'Phô mai cay nhẹ', price: 0 },
          { name: 'Bột xí muội chua ngọt', price: 0 }
        ]
      }
    ]
  },
  {
    id: 'f-9',
    name: 'Trà Sữa Trân Châu Đường Đen',
    category: 'drinks',
    price: 28000,
    originalPrice: 32000,
    image: 'https://images.unsplash.com/photo-1558857563-b37cf5a14d59?w=600&auto=format&fit=crop&q=80',
    description: 'Trà sữa đậm đà nấu từ lá trà đen Ceylon cao cấp, trân châu nấu đường thốt nốt dẻo mềm chuẩn vị quán.',
    prepTimeMinutes: 3,
    calories: 320,
    isAvailable: true,
    isPopular: true,
    options: [
      {
        title: 'Mức đường',
        items: [
          { name: '100% đường (Chuẩn ngọt)', price: 0 },
          { name: '70% đường (Vừa phải)', price: 0 },
          { name: '50% đường (Ít ngọt)', price: 0 },
          { name: '30% đường (Nhạt thanh)', price: 0 }
        ]
      },
      {
        title: 'Lượng đá',
        items: [
          { name: 'Đá bình thường (100%)', price: 0 },
          { name: 'Ít đá (50%)', price: 0 },
          { name: 'Không đá', price: 0 }
        ]
      },
      {
        title: 'Topping thêm',
        items: [
          { name: 'Thêm kem cheese béo mặn', price: 8000 },
          { name: 'Thêm thạch pudding trứng', price: 6000 },
          { name: 'Thêm gấp đôi trân châu', price: 5000 }
        ]
      }
    ]
  },
  {
    id: 'f-10',
    name: 'Trà Đào Cam Sả Tươi Mát Lạnh',
    category: 'drinks',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80',
    description: 'Nước cốt cam tươi mọng nước kết hợp sả đập dập thơm the mát, kèm 3 miếng đào giòn ngâm giòn ngọt thanh lọc.',
    prepTimeMinutes: 3,
    calories: 180,
    isAvailable: true,
    isPopular: true,
    options: [
      {
        title: 'Độ ngọt',
        items: [
          { name: 'Ngọt thanh chuẩn vị', price: 0 },
          { name: 'Ít ngọt (50%)', price: 0 }
        ]
      },
      {
        title: 'Topping thêm',
        items: [
          { name: 'Thêm 2 miếng đào miếng', price: 7000 },
          { name: 'Thêm hạt chia hữu cơ', price: 5000 }
        ]
      }
    ]
  },
  {
    id: 'f-11',
    name: 'Cà Phê Muối / Cà Phê Sữa Đá',
    category: 'drinks',
    price: 20000,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
    description: 'Cà phê Robusta pha phin nguyên chất đậm đặc sánh nâu, phủ lớp kem muối béo ngậy ngọt ngào gây thương nhớ.',
    prepTimeMinutes: 2,
    calories: 190,
    isAvailable: true,
    options: [
      {
        title: 'Loại cà phê',
        items: [
          { name: 'Cà phê muối kem béo', price: 0 },
          { name: 'Cà phê sữa đá truyền thống', price: 0 },
          { name: 'Cà phê đen đá', price: 0 },
          { name: 'Bạc xỉu 3 tầng béo', price: 2000 }
        ]
      }
    ]
  },
  {
    id: 'f-12',
    name: 'Chè Dưỡng Nhan Tuyết Yến Hạt Chia',
    category: 'desserts',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
    description: 'Chè thanh mát bổ dưỡng gồm tuyết yến, nhựa đào, hạt sen bùi béo, táo đỏ, long nhãn nấu cùng đường phèn thanh khiết.',
    prepTimeMinutes: 2,
    calories: 210,
    isAvailable: true,
    isVegetarian: true,
    options: [
      {
        title: 'Tùy chọn đá',
        items: [
          { name: 'Ăn kèm đá bào ướp lạnh', price: 0 },
          { name: 'Ăn mát tự nhiên không đá', price: 0 }
        ]
      }
    ]
  }
];

export const INITIAL_USER_CARD: CanteenUserCard = {
  cardNumber: 'CTG-998822',
  holderName: 'Nguyễn Văn An',
  userRole: 'Sinh viên',
  studentId: 'SV-20268841',
  balance: 185000,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
};

export const INITIAL_VOUCHERS: Voucher[] = [
  {
    code: 'SINHVIEN10',
    description: 'Giảm 10% cho sinh viên & nhân viên trường',
    discountPercent: 10,
    minOrder: 30000
  },
  {
    code: 'CANTEEN15K',
    description: 'Giảm ngay 15.000₫ cho đơn từ 60.000₫',
    discountAmount: 15000,
    minOrder: 60000
  },
  {
    code: 'GOO20',
    description: 'Khuyến mãi đặc biệt Canteen GO giảm 20%',
    discountPercent: 20,
    minOrder: 50000
  }
];
