export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  description: string;
  isNew?: boolean;
  isBestseller?: boolean;
}

// Placeholder images - using picsum.photos for variety
const img = (id: number, w = 600, h = 800) =>
  `https://picsum.photos/seed/whybao${id}/${w}/${h}`;

export const products: Product[] = [
  {
    id: "1",
    slug: "hoodie-neon-dragon",
    name: "Худи Neon Dragon Oversize",
    brand: "neonpanda",
    category: "hoodies",
    price: 5490,
    images: [img(1), img(2), img(3)],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Чёрный", hex: "#0a0a0a" },
      { name: "Серый", hex: "#6b7280" },
      { name: "Электрик-синий", hex: "#3b82f6" },
    ],
    description:
      "Оверсайз худи с принтом дракона в неоновой стилистике. Ультрамягкий флис, капюшон с кулиской, карман кенгуру. Идеально для streetwear-луков.",
    isNew: true,
    isBestseller: true,
  },
  {
    id: "2",
    slug: "tee-silk-characters",
    name: "Футболка Silk Characters",
    brand: "silkdragon",
    category: "tshirts",
    price: 1890,
    images: [img(4), img(5)],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Белый", hex: "#ffffff" },
      { name: "Кремовый", hex: "#fef3c7" },
      { name: "Чёрный", hex: "#0a0a0a" },
    ],
    description:
      "Классическая футболка из премиального хлопка с иероглифами в стиле шёлковой вышивки. Минималистичный дизайн с китайским акцентом.",
    isNew: true,
  },
  {
    id: "3",
    slug: "cargo-pants-urban",
    name: "Карго-брюки Urban Qilin",
    brand: "urbanqilin",
    category: "pants",
    price: 4290,
    images: [img(6), img(7), img(8)],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Оливковый", hex: "#4d7c0f" },
      { name: "Чёрный", hex: "#0a0a0a" },
      { name: "Бежевый", hex: "#d4a574" },
    ],
    description:
      "Широкие карго с множеством карманов. Прочная ткань, удобный крой. Вдохновлено уличной модой Шанхая и Пекина.",
    isBestseller: true,
  },
  {
    id: "4",
    slug: "jeans-acid-wash",
    name: "Джинсы Acid Wash Slim",
    brand: "baostreet",
    category: "jeans",
    price: 3990,
    images: [img(9), img(10)],
    sizes: ["28", "30", "32", "34"],
    colors: [
      { name: "Голубой", hex: "#93c5fd" },
      { name: "Тёмно-синий", hex: "#1e3a8a" },
    ],
    description:
      "Слим-джинсы с эффектом кислотной стирки. Эластичный деним, комфортная посадка. Тренд сезона из китайских дропов.",
  },
  {
    id: "5",
    slug: "shorts-lotus-print",
    name: "Шорты Lotus Print",
    brand: "ghostlotus",
    category: "shorts",
    price: 2490,
    images: [img(11), img(12)],
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Чёрный", hex: "#0a0a0a" },
      { name: "Белый", hex: "#ffffff" },
      { name: "Розовый", hex: "#ec4899" },
    ],
    description:
      "Лёгкие шорты с принтом лотоса. Хлопок с добавлением эластана. Идеально для лета и пляжного вайба.",
    isNew: true,
  },
  {
    id: "6",
    slug: "jacket-windbreaker",
    name: "Ветровка Crimson Wave",
    brand: "crimsonwave",
    category: "jackets",
    price: 5990,
    images: [img(13), img(14), img(15)],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Красный", hex: "#dc2626" },
      { name: "Чёрный", hex: "#0a0a0a" },
      { name: "Кислотно-зелёный", hex: "#22c55e" },
    ],
    description:
      "Лёгкая ветровка с капюшоном. Водоотталкивающая ткань, стильный крой. Must-have для межсезонья.",
    isBestseller: true,
  },
  {
    id: "7",
    slug: "cap-panda",
    name: "Кепка Panda Logo",
    brand: "neonpanda",
    category: "accessories",
    price: 1290,
    images: [img(16)],
    sizes: ["Универсальный"],
    colors: [
      { name: "Чёрный", hex: "#0a0a0a" },
      { name: "Белый", hex: "#ffffff" },
      { name: "Серый", hex: "#6b7280" },
    ],
    description:
      "Бейсболка с вышитым логотипом панды. Хлопок, регулируемый размер. Лаконичный аксессуар для завершения образа.",
  },
  {
    id: "8",
    slug: "sneakers-echo",
    name: "Кроссовки Echo Silk",
    brand: "echosilk",
    category: "shoes",
    price: 7990,
    images: [img(17), img(18), img(19)],
    sizes: ["39", "40", "41", "42", "43", "44"],
    colors: [
      { name: "Белый", hex: "#ffffff" },
      { name: "Чёрный", hex: "#0a0a0a" },
      { name: "Кремовый", hex: "#fef3c7" },
    ],
    description:
      "Минималистичные кроссовки в духе китайской уличной моды. Удобная подошва, качественные материалы. Универсальная модель.",
    isBestseller: true,
  },
  {
    id: "9",
    slug: "hoodie-tokyo-bao",
    name: "Худи Tokyo Bao Oversize",
    brand: "tokyobao",
    category: "hoodies",
    price: 4790,
    images: [img(20), img(21)],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Серый меланж", hex: "#9ca3af" },
      { name: "Чёрный", hex: "#0a0a0a" },
      { name: "Бордовый", hex: "#7f1d1d" },
    ],
    description:
      "Оверсайз худи в японо-китайском стиле. Мягкий флис, лаконичный дизайн. Базовая вещь для капсульного гардероба.",
  },
  {
    id: "10",
    slug: "tee-dragon-thread",
    name: "Футболка Dragon Thread",
    brand: "dragonthread",
    category: "tshirts",
    price: 2190,
    images: [img(22), img(23)],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Чёрный", hex: "#0a0a0a" },
      { name: "Белый", hex: "#ffffff" },
      { name: "Электрик-синий", hex: "#3b82f6" },
    ],
    description:
      "Футболка с графикой дракона в стиле традиционной вышивки. Плотный хлопок, яркий принт. Заявление о стиле.",
  },
  {
    id: "11",
    slug: "pants-wide-silk",
    name: "Широкие брюки Silk",
    brand: "silkdragon",
    category: "pants",
    price: 4590,
    images: [img(24), img(25)],
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Чёрный", hex: "#0a0a0a" },
      { name: "Бежевый", hex: "#d4a574" },
      { name: "Зелёный", hex: "#166534" },
    ],
    description:
      "Широкие брюки из смесовой ткани с шёлковым блеском. Высокая посадка, свободный крой. Элегантный streetwear.",
  },
  {
    id: "12",
    slug: "jeans-relaxed-fit",
    name: "Джинсы Relaxed Fit",
    brand: "urbanqilin",
    category: "jeans",
    price: 4290,
    images: [img(26), img(27)],
    sizes: ["28", "30", "32", "34", "36"],
    colors: [
      { name: "Чёрный", hex: "#0a0a0a" },
      { name: "Тёмно-синий", hex: "#1e3a8a" },
      { name: "Светло-голубой", hex: "#93c5fd" },
    ],
    description:
      "Расслабленный крой, мягкий деним. Универсальные джинсы для повседневной носки. Качество и комфорт.",
  },
  {
    id: "13",
    slug: "shorts-cargo",
    name: "Карго-шорты Urban",
    brand: "baostreet",
    category: "shorts",
    price: 2990,
    images: [img(28), img(29)],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Оливковый", hex: "#4d7c0f" },
      { name: "Чёрный", hex: "#0a0a0a" },
      { name: "Камуфляж", hex: "#4a5568" },
    ],
    description:
      "Функциональные карго-шорты с боковыми карманами. Прочная ткань, военный вайб. Практичность и стиль.",
  },
  {
    id: "14",
    slug: "jacket-denim",
    name: "Джинсовая куртка",
    brand: "dragonthread",
    category: "jackets",
    price: 5490,
    images: [img(30), img(31)],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Голубой", hex: "#93c5fd" },
      { name: "Чёрный", hex: "#0a0a0a" },
    ],
    description:
      "Классическая джинсовая куртка с современным кроем. Качественный деним, металлическая фурнитура. Вечная классика.",
  },
  {
    id: "15",
    slug: "bag-mini-lotus",
    name: "Мини-сумка Lotus",
    brand: "ghostlotus",
    category: "accessories",
    price: 1990,
    images: [img(32)],
    sizes: ["Универсальный"],
    colors: [
      { name: "Чёрный", hex: "#0a0a0a" },
      { name: "Кремовый", hex: "#fef3c7" },
      { name: "Розовый", hex: "#ec4899" },
    ],
    description:
      "Компактная кросс-сумка с принтом лотоса. Идеальный размер для телефона и документов. Стильный аксессуар.",
  },
  {
    id: "16",
    slug: "hoodie-lotus-vibe",
    name: "Худи Lotus Vibe",
    brand: "lotusvibe",
    category: "hoodies",
    price: 4290,
    images: [img(33), img(34)],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Розовый", hex: "#ec4899" },
      { name: "Серый", hex: "#6b7280" },
      { name: "Чёрный", hex: "#0a0a0a" },
    ],
    description:
      "Худи с вышивкой лотоса. Мягкий материал, оверсайз крой. Для тех, кто любит спокойные, но выразительные образы.",
    isNew: true,
  },
  {
    id: "17",
    slug: "tee-minimal-qilin",
    name: "Футболка Minimal Qilin",
    brand: "urbanqilin",
    category: "tshirts",
    price: 1590,
    images: [img(35)],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Белый", hex: "#ffffff" },
      { name: "Чёрный", hex: "#0a0a0a" },
      { name: "Серый", hex: "#6b7280" },
    ],
    description:
      "Минималистичная футболка с маленьким логотипом цилиня. Базовый хлопок, идеальная посадка. На каждый день.",
  },
  {
    id: "18",
    slug: "pants-tech-cargo",
    name: "Технические карго",
    brand: "crimsonwave",
    category: "pants",
    price: 4990,
    images: [img(36), img(37)],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Чёрный", hex: "#0a0a0a" },
      { name: "Тёмно-серый", hex: "#374151" },
    ],
    description:
      "Технические брюки из водоотталкивающей ткани. Множество карманов, удобный крой. Для активного образа жизни.",
  },
  {
    id: "19",
    slug: "jeans-baggy",
    name: "Джинсы Baggy Fit",
    brand: "tokyobao",
    category: "jeans",
    price: 4490,
    images: [img(38), img(39)],
    sizes: ["28", "30", "32", "34"],
    colors: [
      { name: "Голубой", hex: "#93c5fd" },
      { name: "Чёрный", hex: "#0a0a0a" },
    ],
    description:
      "Широкие джинсы в тренде baggy. Мягкий деним, заниженная посадка. Must-have для streetwear-энтузиастов.",
    isNew: true,
  },
  {
    id: "20",
    slug: "shorts-swim",
    name: "Плавки Swim",
    brand: "echosilk",
    category: "shorts",
    price: 1790,
    images: [img(40)],
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Чёрный", hex: "#0a0a0a" },
      { name: "Синий", hex: "#1e3a8a" },
      { name: "Бирюзовый", hex: "#0d9488" },
    ],
    description:
      "Быстросохнущие плавки для бассейна и пляжа. Эластичный материал, удобная посадка. Лето в стиле WhyBao.",
  },
  {
    id: "21",
    slug: "jacket-puffer",
    name: "Пуховик Urban",
    brand: "neonpanda",
    category: "jackets",
    price: 8990,
    images: [img(41), img(42), img(43)],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Чёрный", hex: "#0a0a0a" },
      { name: "Серый", hex: "#6b7280" },
      { name: "Зелёный", hex: "#166534" },
    ],
    description:
      "Лёгкий пуховик с неоновыми акцентами. Современный крой, отличная теплоизоляция. Для холодных дней.",
    isBestseller: true,
  },
  {
    id: "22",
    slug: "socks-pack",
    name: "Набор носков Dragon",
    brand: "dragonthread",
    category: "accessories",
    price: 890,
    images: [img(44)],
    sizes: ["Универсальный"],
    colors: [
      { name: "Чёрный", hex: "#0a0a0a" },
      { name: "Белый", hex: "#ffffff" },
      { name: "Серый", hex: "#6b7280" },
    ],
    description:
      "Набор из 3 пар носков с принтом дракона. Хлопок с добавлением эластана. Деталь, которая завершает образ.",
  },
  {
    id: "23",
    slug: "sliders-echo",
    name: "Сланцы Echo",
    brand: "echosilk",
    category: "shoes",
    price: 2490,
    images: [img(45), img(46)],
    sizes: ["39", "40", "41", "42", "43", "44"],
    colors: [
      { name: "Чёрный", hex: "#0a0a0a" },
      { name: "Белый", hex: "#ffffff" },
      { name: "Бежевый", hex: "#d4a574" },
    ],
    description:
      "Удобные сланцы для дома и пляжа. Мягкая подошва, минималистичный дизайн. Расслабленный вайб.",
  },
  {
    id: "24",
    slug: "hoodie-zip",
    name: "Худи на молнии",
    brand: "crimsonwave",
    category: "hoodies",
    price: 4990,
    images: [img(47), img(48)],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Красный", hex: "#dc2626" },
      { name: "Чёрный", hex: "#0a0a0a" },
      { name: "Серый", hex: "#6b7280" },
    ],
    description:
      "Худи на молнии с капюшоном. Универсальная модель для слоёв. Качество и стиль Crimson Wave.",
  },
  {
    id: "25",
    slug: "tee-graphic-bao",
    name: "Футболка Graphic Bao",
    brand: "baostreet",
    category: "tshirts",
    price: 1990,
    images: [img(49), img(50)],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Белый", hex: "#ffffff" },
      { name: "Чёрный", hex: "#0a0a0a" },
      { name: "Розовый", hex: "#ec4899" },
    ],
    description:
      "Футболка с графикой баоцзы. Игривый дизайн, качественный хлопок. Для тех, кто любит несерьёзный streetwear.",
  },
  {
    id: "26",
    slug: "pants-pleated",
    name: "Брюки со складками",
    brand: "ghostlotus",
    category: "pants",
    price: 4790,
    images: [img(51), img(52)],
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Чёрный", hex: "#0a0a0a" },
      { name: "Бежевый", hex: "#d4a574" },
      { name: "Белый", hex: "#ffffff" },
    ],
    description:
      "Элегантные брюки со складками. Лёгкая ткань, высокая посадка. Современный азиатский минимализм.",
  },
  {
    id: "27",
    slug: "jeans-straight",
    name: "Джинсы Straight",
    brand: "silkdragon",
    category: "jeans",
    price: 4190,
    images: [img(53), img(54)],
    sizes: ["28", "30", "32", "34"],
    colors: [
      { name: "Тёмно-синий", hex: "#1e3a8a" },
      { name: "Чёрный", hex: "#0a0a0a" },
    ],
    description:
      "Классические прямые джинсы. Универсальная модель на все случаи жизни. Качество SilkDragon.",
  },
  {
    id: "28",
    slug: "shorts-denim",
    name: "Джинсовые шорты",
    brand: "urbanqilin",
    category: "shorts",
    price: 2790,
    images: [img(55), img(56)],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Голубой", hex: "#93c5fd" },
      { name: "Чёрный", hex: "#0a0a0a" },
    ],
    description:
      "Шорты из денима в стиле 90-х. Укороченная длина, удобная посадка. Летний must-have.",
  },
  {
    id: "29",
    slug: "vest-puffer",
    name: "Жилет пуховый",
    brand: "lotusvibe",
    category: "jackets",
    price: 5990,
    images: [img(57), img(58)],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Чёрный", hex: "#0a0a0a" },
      { name: "Оливковый", hex: "#4d7c0f" },
      { name: "Бежевый", hex: "#d4a574" },
    ],
    description:
      "Лёгкий пуховый жилет без рукавов. Идеален для слоёв. Стиль и практичность LotusVibe.",
  },
  {
    id: "30",
    slug: "belt-dragon",
    name: "Ремень Dragon",
    brand: "dragonthread",
    category: "accessories",
    price: 1590,
    images: [img(59)],
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Чёрный", hex: "#0a0a0a" },
      { name: "Коричневый", hex: "#78350f" },
    ],
    description:
      "Кожаный ремень с металлической пряжкой в стиле дракона. Универсальный аксессуар.",
  },
  {
    id: "31",
    slug: "hoodie-crop",
    name: "Кроп-худи",
    brand: "ghostlotus",
    category: "hoodies",
    price: 3790,
    images: [img(60), img(61)],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Розовый", hex: "#ec4899" },
      { name: "Чёрный", hex: "#0a0a0a" },
      { name: "Белый", hex: "#ffffff" },
    ],
    description:
      "Короткое худи с капюшоном. Трендовая длина, мягкий материал. Для смелых образов.",
    isNew: true,
  },
  {
    id: "32",
    slug: "tee-oversized",
    name: "Футболка Oversized",
    brand: "neonpanda",
    category: "tshirts",
    price: 2290,
    images: [img(62), img(63)],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Чёрный", hex: "#0a0a0a" },
      { name: "Белый", hex: "#ffffff" },
      { name: "Кислотно-зелёный", hex: "#22c55e" },
    ],
    description:
      "Оверсайз футболка с логотипом NeonPanda. Плотный хлопок, свободный крой. Базовый элемент гардероба.",
  },
  {
    id: "33",
    slug: "pants-jogger",
    name: "Джоггеры",
    brand: "baostreet",
    category: "pants",
    price: 3490,
    images: [img(64), img(65)],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Чёрный", hex: "#0a0a0a" },
      { name: "Серый", hex: "#6b7280" },
      { name: "Синий", hex: "#1e3a8a" },
    ],
    description:
      "Удобные джоггеры с манжетами. Мягкая ткань, спортивный крой. Для расслабленного стиля.",
  },
  {
    id: "34",
    slug: "sneakers-chunky",
    name: "Кроссовки Chunky",
    brand: "tokyobao",
    category: "shoes",
    price: 8490,
    images: [img(66), img(67), img(68)],
    sizes: ["39", "40", "41", "42", "43", "44"],
    colors: [
      { name: "Белый", hex: "#ffffff" },
      { name: "Чёрный", hex: "#0a0a0a" },
      { name: "Кремовый", hex: "#fef3c7" },
    ],
    description:
      "Массивные кроссовки в тренде chunky. Выразительный силуэт, комфортная колодка. Заявление о стиле.",
    isBestseller: true,
  },
  {
    id: "35",
    slug: "scarf-silk",
    name: "Шарф шёлковый",
    brand: "silkdragon",
    category: "accessories",
    price: 2490,
    images: [img(69)],
    sizes: ["Универсальный"],
    colors: [
      { name: "Красный", hex: "#dc2626" },
      { name: "Золотой", hex: "#ca8a04" },
      { name: "Чёрный", hex: "#0a0a0a" },
    ],
    description:
      "Шёлковый шарф с традиционным орнаментом. Лёгкий, изящный. Акцент для элегантного образа.",
  },
  {
    id: "36",
    slug: "hoodie-vest",
    name: "Худи-жилет",
    brand: "echosilk",
    category: "hoodies",
    price: 3590,
    images: [img(70), img(71)],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Серый", hex: "#6b7280" },
      { name: "Чёрный", hex: "#0a0a0a" },
      { name: "Бежевый", hex: "#d4a574" },
    ],
    description:
      "Худи без рукавов с капюшоном. Универсальный слой для переменчивой погоды. Минималистичный дизайн.",
  },
  {
    id: "37",
    slug: "tee-longsleeve",
    name: "Лонгслив Basic",
    brand: "lotusvibe",
    category: "tshirts",
    price: 2190,
    images: [img(72), img(73)],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Чёрный", hex: "#0a0a0a" },
      { name: "Белый", hex: "#ffffff" },
      { name: "Серый", hex: "#6b7280" },
    ],
    description:
      "Базовый лонгслив из мягкого хлопка. Идеальная база для слоёв. Качество и комфорт LotusVibe.",
  },
  {
    id: "38",
    slug: "jacket-bomber",
    name: "Бомбер",
    brand: "neonpanda",
    category: "jackets",
    price: 6490,
    images: [img(74), img(75), img(76)],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Чёрный", hex: "#0a0a0a" },
      { name: "Оливковый", hex: "#4d7c0f" },
      { name: "Синий", hex: "#1e3a8a" },
    ],
    description:
      "Классический бомбер с неоновыми акцентами. Качественная ткань, удобный крой. Уличный must-have.",
  },
  {
    id: "39",
    slug: "backpack-minimal",
    name: "Рюкзак Minimal",
    brand: "urbanqilin",
    category: "accessories",
    price: 3990,
    images: [img(77), img(78)],
    sizes: ["Универсальный"],
    colors: [
      { name: "Чёрный", hex: "#0a0a0a" },
      { name: "Серый", hex: "#6b7280" },
      { name: "Оливковый", hex: "#4d7c0f" },
    ],
    description:
      "Минималистичный рюкзак из прочной ткани. Вместительный, стильный. Для учёбы и путешествий.",
  },
  {
    id: "40",
    slug: "sneakers-slips",
    name: "Слипоны",
    brand: "crimsonwave",
    category: "shoes",
    price: 3290,
    images: [img(79), img(80)],
    sizes: ["39", "40", "41", "42", "43", "44"],
    colors: [
      { name: "Чёрный", hex: "#0a0a0a" },
      { name: "Белый", hex: "#ffffff" },
      { name: "Красный", hex: "#dc2626" },
    ],
    description:
      "Удобные слипоны на каждый день. Мягкая подошва, лаконичный дизайн. Практичность Crimson Wave.",
  },
];
