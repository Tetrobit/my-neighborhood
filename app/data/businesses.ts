export interface Business {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  image: string;
  address: string;
  openHours: string;
  phone: string;
  website?: string;
  email?: string;
  description?: string;
  reviews?: Array<{
    id: string;
    author: string;
    rating: number;
    date: string;
    text: string;
  }>;
}

export const BUSINESSES: Business[] = [
  {
    id: '1',
    name: 'Кафе "У Дома"',
    category: 'Рестораны',
    rating: 4.8,
    reviewCount: 124,
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400',
    address: 'ул. Примерная, 1',
    openHours: '09:00 - 22:00',
    phone: '+7 (999) 123-45-67',
    website: 'www.cafe-home.ru',
    email: 'info@cafe-home.ru',
    description: 'Уютное кафе с домашней атмосферой и вкусной едой. Мы предлагаем широкий выбор блюд европейской и русской кухни, свежую выпечку и ароматный кофе.',
    reviews: [
      {
        id: '1',
        author: 'Анна М.',
        rating: 5,
        date: '2024-03-15',
        text: 'Отличное место! Очень вкусная еда и приятная атмосфера. Обязательно приду еще раз!',
      },
      {
        id: '2',
        author: 'Иван П.',
        rating: 4,
        date: '2024-03-10',
        text: 'Хорошее обслуживание, уютная атмосфера. Немного высокие цены, но качество того стоит.',
      },
    ],
  },
  // ... добавляем остальные 51 предприятие ...
  {
    id: '2',
    name: 'Салон красоты "Элегант"',
    category: 'Красота',
    rating: 4.6,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400',
    address: 'ул. Центральная, 15',
    openHours: '10:00 - 20:00',
    phone: '+7 (999) 234-56-78',
    website: 'www.elegant-salon.ru',
    email: 'info@elegant-salon.ru',
    description: 'Профессиональный салон красоты с широким спектром услуг. Наши мастера имеют многолетний опыт работы и используют только качественные материалы.',
    reviews: [
      {
        id: '1',
        author: 'Мария К.',
        rating: 5,
        date: '2024-03-14',
        text: 'Прекрасный салон! Делала здесь маникюр и стрижку, результатом очень довольна.',
      },
      {
        id: '2',
        author: 'Елена С.',
        rating: 4,
        date: '2024-03-12',
        text: 'Хороший сервис, приятные мастера. Немного задержали начало процедуры.',
      },
    ],
  },
  {
    id: '3',
    name: 'Ресторан "Итальянский дворик"',
    category: 'Рестораны',
    rating: 4.7,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
    address: 'ул. Ленина, 45',
    openHours: '11:00 - 23:00',
    phone: '+7 (999) 345-67-89',
    website: 'www.italian-yard.ru',
    email: 'info@italian-yard.ru',
    description: 'Аутентичная итальянская кухня в сердце города. Пицца из дровяной печи, домашняя паста и великолепные десерты.',
    reviews: [
      {
        id: '1',
        author: 'Павел Р.',
        rating: 5,
        date: '2024-03-13',
        text: 'Лучшая пицца в городе! Отличное обслуживание и уютная атмосфера.',
      },
      {
        id: '2',
        author: 'Ольга М.',
        rating: 4,
        date: '2024-03-11',
        text: 'Очень вкусная паста и тирамису. Немного долго ждали заказ.',
      },
    ],
  },
  {
    id: '4',
    name: 'Фитнес-клуб "Олимп"',
    category: 'Здоровье',
    rating: 4.5,
    reviewCount: 203,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
    address: 'пр. Победы, 78',
    openHours: '07:00 - 23:00',
    phone: '+7 (999) 456-78-90',
    website: 'www.olimp-fitness.ru',
    email: 'info@olimp-fitness.ru',
    description: 'Современный фитнес-клуб с профессиональными тренерами, новейшим оборудованием и групповыми программами.',
    reviews: [
      {
        id: '1',
        author: 'Дмитрий К.',
        rating: 5,
        date: '2024-03-14',
        text: 'Отличный зал, много оборудования, внимательные тренеры!',
      },
      {
        id: '2',
        author: 'Светлана В.',
        rating: 4,
        date: '2024-03-12',
        text: 'Хороший фитнес-клуб, но иногда бывает очень людно в вечернее время.',
      },
    ],
  },
  {
    id: '5',
    name: 'Супермаркет "Свежий выбор"',
    category: 'Магазины',
    rating: 4.3,
    reviewCount: 312,
    image: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=400',
    address: 'ул. Гагарина, 23',
    openHours: '08:00 - 22:00',
    phone: '+7 (999) 567-89-01',
    website: 'www.fresh-choice.ru',
    email: 'info@fresh-choice.ru',
    description: 'Супермаркет с широким ассортиментом свежих продуктов, фермерских товаров и товаров для дома.',
    reviews: [
      {
        id: '1',
        author: 'Татьяна К.',
        rating: 4,
        date: '2024-03-14',
        text: 'Хороший выбор свежих овощей и фруктов. Приятные цены.',
      },
      {
        id: '2',
        author: 'Сергей М.',
        rating: 5,
        date: '2024-03-12',
        text: 'Удобное расположение, всегда есть парковка. Отличный ассортимент.',
      },
    ],
  },
  {
    id: '6',
    name: 'Автосервис "Мастер"',
    category: 'Услуги',
    rating: 4.9,
    reviewCount: 167,
    image: 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=400',
    address: 'ул. Промышленная, 12',
    openHours: '09:00 - 20:00',
    phone: '+7 (999) 678-90-12',
    website: 'www.master-auto.ru',
    email: 'service@master-auto.ru',
    description: 'Профессиональный автосервис с современным оборудованием. Выполняем все виды ремонта и технического обслуживания.',
    reviews: [
      {
        id: '1',
        author: 'Андрей В.',
        rating: 5,
        date: '2024-03-15',
        text: 'Отличный сервис! Быстро нашли и устранили проблему. Рекомендую.',
      },
      {
        id: '2',
        author: 'Максим Д.',
        rating: 5,
        date: '2024-03-13',
        text: 'Профессиональный подход, разумные цены. Всё сделали в срок.',
      },
    ],
  },
  {
    id: '7',
    name: 'Развлекательный центр "Галактика"',
    category: 'Развлечения',
    rating: 4.4,
    reviewCount: 245,
    image: 'https://images.unsplash.com/photo-1511882150382-421056c89033?w=400',
    address: 'пр. Космонавтов, 56',
    openHours: '10:00 - 00:00',
    phone: '+7 (999) 789-01-23',
    website: 'www.galaxy-fun.ru',
    email: 'info@galaxy-fun.ru',
    description: 'Современный развлекательный центр для всей семьи. Боулинг, бильярд, игровые автоматы, детская площадка и кафе.',
    reviews: [
      {
        id: '1',
        author: 'Наталья П.',
        rating: 5,
        date: '2024-03-14',
        text: 'Отличное место для семейного отдыха! Дети в восторге от игровой зоны.',
      },
      {
        id: '2',
        author: 'Артём С.',
        rating: 4,
        date: '2024-03-12',
        text: 'Хороший боулинг, приятная атмосфера. Немного дороговато.',
      },
    ],
  },
  {
    id: '8',
    name: 'Стоматология "Белая жемчужина"',
    category: 'Здоровье',
    rating: 4.8,
    reviewCount: 143,
    image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400',
    address: 'ул. Медицинская, 8',
    openHours: '09:00 - 20:00',
    phone: '+7 (999) 890-12-34',
    website: 'www.white-pearl-dental.ru',
    email: 'info@white-pearl-dental.ru',
    description: 'Современная стоматологическая клиника с опытными врачами. Все виды лечения зубов, протезирование, имплантация.',
    reviews: [
      {
        id: '1',
        author: 'Ирина М.',
        rating: 5,
        date: '2024-03-15',
        text: 'Очень внимательные врачи, безболезненное лечение. Спасибо!',
      },
      {
        id: '2',
        author: 'Дмитрий К.',
        rating: 5,
        date: '2024-03-13',
        text: 'Профессиональный подход, современное оборудование. Рекомендую.',
      },
    ],
  },
  {
    id: '9',
    name: 'Суши-бар "Токио"',
    category: 'Рестораны',
    rating: 4.6,
    reviewCount: 178,
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400',
    address: 'ул. Пушкина, 34',
    openHours: '11:00 - 23:00',
    phone: '+7 (999) 901-23-45',
    website: 'www.tokyo-sushi.ru',
    email: 'order@tokyo-sushi.ru',
    description: 'Уютный суши-бар с аутентичной японской кухней. Свежие морепродукты, большой выбор роллов и суши.',
    reviews: [
      {
        id: '1',
        author: 'Алексей Н.',
        rating: 5,
        date: '2024-03-14',
        text: 'Очень вкусные роллы! Быстрая доставка, всё свежее.',
      },
      {
        id: '2',
        author: 'Марина В.',
        rating: 4,
        date: '2024-03-12',
        text: 'Приятная атмосфера, вкусная еда. Немного долго ждали заказ.',
      },
    ],
  },
  {
    id: '10',
    name: 'Спа-салон "Оазис"',
    category: 'Красота',
    rating: 4.7,
    reviewCount: 92,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400',
    address: 'ул. Курортная, 15',
    openHours: '10:00 - 21:00',
    phone: '+7 (999) 012-34-56',
    website: 'www.oasis-spa.ru',
    email: 'booking@oasis-spa.ru',
    description: 'Роскошный спа-салон с широким спектром услуг. Массаж, обертывания, уходовые процедуры, сауна.',
    reviews: [
      {
        id: '1',
        author: 'Елена Р.',
        rating: 5,
        date: '2024-03-15',
        text: 'Великолепный массаж! Отличная атмосфера, внимательный персонал.',
      },
      {
        id: '2',
        author: 'Ольга С.',
        rating: 4,
        date: '2024-03-13',
        text: 'Хороший сервис, приятная обстановка. Немного высокие цены.',
      },
    ],
  },
  {
    id: '11',
    name: 'Книжный магазин "Страницы"',
    category: 'Магазины',
    rating: 4.5,
    reviewCount: 167,
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400',
    address: 'ул. Литературная, 22',
    openHours: '09:00 - 21:00',
    phone: '+7 (999) 123-45-67',
    website: 'www.pages-books.ru',
    email: 'info@pages-books.ru',
    description: 'Уютный книжный магазин с большим выбором литературы. Художественная литература, учебники, детские книги, канцтовары.',
    reviews: [
      {
        id: '1',
        author: 'Мария К.',
        rating: 5,
        date: '2024-03-15',
        text: 'Отличный выбор книг, приятная атмосфера для чтения.',
      },
      {
        id: '2',
        author: 'Павел Д.',
        rating: 4,
        date: '2024-03-14',
        text: 'Хороший магазин, но некоторых новинок не хватает.',
      },
    ],
  },
  {
    id: '12',
    name: 'Ветеринарная клиника "Добрый доктор"',
    category: 'Здоровье',
    rating: 4.9,
    reviewCount: 203,
    image: 'https://images.unsplash.com/photo-1628009368231-7bb7cf0a6947?w=400',
    address: 'ул. Ветеринарная, 5',
    openHours: '00:00 - 24:00',
    phone: '+7 (999) 234-56-78',
    website: 'www.good-vet.ru',
    email: 'help@good-vet.ru',
    description: 'Круглосуточная ветеринарная клиника. Опытные врачи, современное оборудование, стационар для животных.',
    reviews: [
      {
        id: '1',
        author: 'Анна С.',
        rating: 5,
        date: '2024-03-16',
        text: 'Спасли нашего кота! Очень благодарны врачам за профессионализм.',
      },
      {
        id: '2',
        author: 'Игорь М.',
        rating: 5,
        date: '2024-03-15',
        text: 'Отличная клиника, внимательное отношение к животным.',
      },
    ],
  },
  {
    id: '13',
    name: 'Цветочный салон "Флора"',
    category: 'Магазины',
    rating: 4.7,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400',
    address: 'ул. Цветочная, 12',
    openHours: '08:00 - 20:00',
    phone: '+7 (999) 345-67-89',
    website: 'www.flora-flowers.ru',
    email: 'order@flora-flowers.ru',
    description: 'Магазин цветов и подарков. Свежие букеты, комнатные растения, оформление праздников.',
    reviews: [
      {
        id: '1',
        author: 'Светлана П.',
        rating: 5,
        date: '2024-03-16',
        text: 'Прекрасные букеты! Всегда свежие цветы и креативный подход.',
      },
      {
        id: '2',
        author: 'Андрей К.',
        rating: 4,
        date: '2024-03-15',
        text: 'Хороший выбор, но цены выше среднего.',
      },
    ],
  },
  {
    id: '14',
    name: 'Детский центр "Умка"',
    category: 'Образование',
    rating: 4.8,
    reviewCount: 189,
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400',
    address: 'ул. Детская, 45',
    openHours: '09:00 - 19:00',
    phone: '+7 (999) 456-78-90',
    website: 'www.umka-kids.ru',
    email: 'info@umka-kids.ru',
    description: 'Развивающий центр для детей. Подготовка к школе, иностранные языки, творческие занятия.',
    reviews: [
      {
        id: '1',
        author: 'Татьяна М.',
        rating: 5,
        date: '2024-03-16',
        text: 'Отличные педагоги, ребенок с удовольствием ходит на занятия.',
      },
      {
        id: '2',
        author: 'Сергей В.',
        rating: 5,
        date: '2024-03-15',
        text: 'Заметен прогресс в развитии детей, рекомендую!',
      },
    ],
  },
  {
    id: '15',
    name: 'Кофейня "Арома"',
    category: 'Рестораны',
    rating: 4.6,
    reviewCount: 234,
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400',
    address: 'ул. Кофейная, 7',
    openHours: '07:00 - 22:00',
    phone: '+7 (999) 567-89-01',
    website: 'www.aroma-coffee.ru',
    email: 'info@aroma-coffee.ru',
    description: 'Уютная кофейня с авторскими напитками. Свежая выпечка, десерты, завтраки весь день.',
    reviews: [
      {
        id: '1',
        author: 'Екатерина Л.',
        rating: 5,
        date: '2024-03-16',
        text: 'Лучший кофе в городе! Очень вкусные круассаны.',
      },
      {
        id: '2',
        author: 'Максим Р.',
        rating: 4,
        date: '2024-03-15',
        text: 'Приятная атмосфера, но иногда бывает очень людно.',
      },
    ],
  },
  {
    id: '16',
    name: 'Автошкола "Профи"',
    category: 'Образование',
    rating: 4.7,
    reviewCount: 178,
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400',
    address: 'ул. Автомобильная, 28',
    openHours: '09:00 - 20:00',
    phone: '+7 (999) 678-90-12',
    website: 'www.profi-auto.ru',
    email: 'study@profi-auto.ru',
    description: 'Профессиональная автошкола с опытными инструкторами. Обучение на права категории A, B, C. Современный автопарк.',
    reviews: [
      {
        id: '1',
        author: 'Виктор Н.',
        rating: 5,
        date: '2024-03-16',
        text: 'Отличная автошкола! Сдал с первого раза благодаря хорошей подготовке.',
      },
      {
        id: '2',
        author: 'Анастасия Р.',
        rating: 4,
        date: '2024-03-15',
        text: 'Хорошие инструкторы, удобное расписание занятий.',
      },
    ],
  },
  {
    id: '17',
    name: 'Магазин электроники "ТехноМир"',
    category: 'Магазины',
    rating: 4.5,
    reviewCount: 312,
    image: 'https://images.unsplash.com/photo-1440558805255-4b8c8bdc2861?w=400',
    address: 'пр. Технический, 15',
    openHours: '10:00 - 22:00',
    phone: '+7 (999) 789-01-23',
    website: 'www.technomir.ru',
    email: 'sales@technomir.ru',
    description: 'Магазин электроники и бытовой техники. Смартфоны, ноутбуки, телевизоры, аксессуары. Официальная гарантия.',
    reviews: [
      {
        id: '1',
        author: 'Денис К.',
        rating: 5,
        date: '2024-03-16',
        text: 'Большой выбор техники, грамотные консультанты.',
      },
      {
        id: '2',
        author: 'Юлия М.',
        rating: 4,
        date: '2024-03-15',
        text: 'Хороший магазин, но иногда бывают очереди.',
      },
    ],
  },
  {
    id: '18',
    name: 'Пиццерия "Неаполь"',
    category: 'Рестораны',
    rating: 4.8,
    reviewCount: 423,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
    address: 'ул. Итальянская, 9',
    openHours: '11:00 - 23:00',
    phone: '+7 (999) 890-12-34',
    website: 'www.naples-pizza.ru',
    email: 'order@naples-pizza.ru',
    description: 'Аутентичная итальянская пиццерия. Пицца на тонком тесте, паста, салаты. Доставка по городу.',
    reviews: [
      {
        id: '1',
        author: 'Антон С.',
        rating: 5,
        date: '2024-03-16',
        text: 'Лучшая пицца в городе! Всегда свежие ингредиенты.',
      },
      {
        id: '2',
        author: 'Ольга В.',
        rating: 5,
        date: '2024-03-15',
        text: 'Отличное обслуживание, вкусная еда, уютная атмосфера.',
      },
    ],
  },
  {
    id: '19',
    name: 'Фитнес-клуб "Энергия"',
    category: 'Спорт',
    rating: 4.7,
    reviewCount: 289,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
    address: 'ул. Спортивная, 33',
    openHours: '06:00 - 23:00',
    phone: '+7 (999) 901-23-45',
    website: 'www.energy-fitness.ru',
    email: 'info@energy-fitness.ru',
    description: 'Современный фитнес-клуб с бассейном. Тренажерный зал, групповые занятия, персональные тренировки.',
    reviews: [
      {
        id: '1',
        author: 'Михаил Д.',
        rating: 5,
        date: '2024-03-16',
        text: 'Отличное оборудование, профессиональные тренеры.',
      },
      {
        id: '2',
        author: 'Алина К.',
        rating: 4,
        date: '2024-03-15',
        text: 'Хороший бассейн, но в часы пик бывает многолюдно.',
      },
    ],
  },
  {
    id: '20',
    name: 'Салон красоты "Шарм"',
    category: 'Красота',
    rating: 4.9,
    reviewCount: 167,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400',
    address: 'ул. Красоты, 17',
    openHours: '09:00 - 21:00',
    phone: '+7 (999) 012-34-56',
    website: 'www.charm-beauty.ru',
    email: 'booking@charm-beauty.ru',
    description: 'Премиум салон красоты. Парикмахерские услуги, маникюр, педикюр, косметология, макияж.',
    reviews: [
      {
        id: '1',
        author: 'Евгения М.',
        rating: 5,
        date: '2024-03-16',
        text: 'Высокий уровень сервиса, отличные мастера!',
      },
      {
        id: '2',
        author: 'Карина Л.',
        rating: 5,
        date: '2024-03-15',
        text: 'Всегда довольна результатом. Рекомендую!',
      },
    ],
  },
  {
    id: '21',
    name: 'Строительный магазин "Мастер"',
    category: 'Магазины',
    rating: 4.6,
    reviewCount: 245,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400',
    address: 'ул. Строителей, 42',
    openHours: '08:00 - 20:00',
    phone: '+7 (999) 123-45-67',
    website: 'www.master-build.ru',
    email: 'sales@master-build.ru',
    description: 'Магазин строительных материалов и инструментов. Все для ремонта и строительства. Консультации специалистов.',
    reviews: [
      {
        id: '1',
        author: 'Игорь С.',
        rating: 5,
        date: '2024-03-16',
        text: 'Большой выбор материалов, адекватные цены.',
      },
      {
        id: '2',
        author: 'Николай П.',
        rating: 4,
        date: '2024-03-15',
        text: 'Хороший магазин, но иногда не хватает некоторых позиций.',
      },
    ],
  },
  {
    id: '22',
    name: 'Языковая школа "Полиглот"',
    category: 'Образование',
    rating: 4.8,
    reviewCount: 178,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400',
    address: 'ул. Лингвистов, 15',
    openHours: '09:00 - 21:00',
    phone: '+7 (999) 234-56-78',
    website: 'www.polyglot-school.ru',
    email: 'info@polyglot-school.ru',
    description: 'Школа иностранных языков. Английский, немецкий, французский, испанский, китайский. Подготовка к международным экзаменам.',
    reviews: [
      {
        id: '1',
        author: 'Марина К.',
        rating: 5,
        date: '2024-03-16',
        text: 'Отличные преподаватели, эффективная методика обучения.',
      },
      {
        id: '2',
        author: 'Дмитрий Л.',
        rating: 5,
        date: '2024-03-15',
        text: 'За полгода значительно улучшил свой английский.',
      },
    ],
  },
  {
    id: '23',
    name: 'Ресторан "Восточный экспресс"',
    category: 'Рестораны',
    rating: 4.7,
    reviewCount: 312,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
    address: 'ул. Восточная, 28',
    openHours: '12:00 - 23:00',
    phone: '+7 (999) 345-67-89',
    website: 'www.oriental-express.ru',
    email: 'reserve@oriental-express.ru',
    description: 'Ресторан восточной кухни. Блюда из Китая, Японии, Кореи и Таиланда. Уютный интерьер, живая музыка по выходным.',
    reviews: [
      {
        id: '1',
        author: 'Анна В.',
        rating: 5,
        date: '2024-03-16',
        text: 'Потрясающие блюда! Аутентичный вкус и красивая подача.',
      },
      {
        id: '2',
        author: 'Сергей М.',
        rating: 4,
        date: '2024-03-15',
        text: 'Хороший ресторан, но цены выше среднего.',
      },
    ],
  },
  {
    id: '24',
    name: 'Детский магазин "Карусель"',
    category: 'Магазины',
    rating: 4.6,
    reviewCount: 198,
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400',
    address: 'ул. Детская, 10',
    openHours: '09:00 - 21:00',
    phone: '+7 (999) 456-78-90',
    website: 'www.carousel-kids.ru',
    email: 'shop@carousel-kids.ru',
    description: 'Магазин детских товаров. Одежда, обувь, игрушки, товары для новорожденных. Широкий выбор брендов.',
    reviews: [
      {
        id: '1',
        author: 'Елена К.',
        rating: 5,
        date: '2024-03-16',
        text: 'Отличный выбор детской одежды, приятные цены.',
      },
      {
        id: '2',
        author: 'Ольга Н.',
        rating: 4,
        date: '2024-03-15',
        text: 'Хороший ассортимент, но не всегда есть нужные размеры.',
      },
    ],
  },
  {
    id: '25',
    name: 'Медицинский центр "Здоровье"',
    category: 'Здоровье',
    rating: 4.9,
    reviewCount: 287,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400',
    address: 'пр. Медицинский, 20',
    openHours: '08:00 - 20:00',
    phone: '+7 (999) 567-89-01',
    website: 'www.health-center.ru',
    email: 'info@health-center.ru',
    description: 'Многопрофильный медицинский центр. Консультации специалистов, диагностика, лечение. Современное оборудование.',
    reviews: [
      {
        id: '1',
        author: 'Татьяна С.',
        rating: 5,
        date: '2024-03-16',
        text: 'Высококвалифицированные врачи, внимательное отношение к пациентам.',
      },
      {
        id: '2',
        author: 'Андрей В.',
        rating: 5,
        date: '2024-03-15',
        text: 'Отличный сервис, быстрая диагностика.',
      },
    ],
  },
  {
    id: '26',
    name: 'Автомойка "Блеск"',
    category: 'Авто',
    rating: 4.7,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=400',
    address: 'ул. Автомобильная, 15',
    openHours: '08:00 - 22:00',
    phone: '+7 (999) 678-90-12',
    website: 'www.blesk-wash.ru',
    email: 'info@blesk-wash.ru',
    description: 'Современная автомойка. Ручная и автоматическая мойка, химчистка салона, полировка. Кафе для клиентов.',
    reviews: [
      {
        id: '1',
        author: 'Владимир К.',
        rating: 5,
        date: '2024-03-16',
        text: 'Отличное качество мойки, внимательное отношение к автомобилю.',
      },
      {
        id: '2',
        author: 'Александр Н.',
        rating: 4,
        date: '2024-03-15',
        text: 'Хороший сервис, но иногда приходится подождать.',
      },
    ],
  },
  {
    id: '27',
    name: 'Зоомагазин "Любимчик"',
    category: 'Магазины',
    rating: 4.8,
    reviewCount: 234,
    image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400',
    address: 'ул. Пушистая, 8',
    openHours: '09:00 - 21:00',
    phone: '+7 (999) 789-01-23',
    website: 'www.pet-favorite.ru',
    email: 'shop@pet-favorite.ru',
    description: 'Магазин товаров для животных. Корма, аксессуары, игрушки, средства по уходу. Консультации ветеринара.',
    reviews: [
      {
        id: '1',
        author: 'Наталья М.',
        rating: 5,
        date: '2024-03-16',
        text: 'Большой выбор товаров, грамотные консультации.',
      },
      {
        id: '2',
        author: 'Иван С.',
        rating: 5,
        date: '2024-03-15',
        text: 'Отличный магазин, всегда есть нужный корм.',
      },
    ],
  },
  {
    id: '28',
    name: 'Кинотеатр "Премьера"',
    category: 'Развлечения',
    rating: 4.6,
    reviewCount: 567,
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400',
    address: 'пр. Кинематографистов, 30',
    openHours: '10:00 - 00:00',
    phone: '+7 (999) 890-12-34',
    website: 'www.premiere-cinema.ru',
    email: 'info@premiere-cinema.ru',
    description: 'Современный кинотеатр с 6 залами. IMAX, 3D, VIP-зал. Кафе, попкорн-бар.',
    reviews: [
      {
        id: '1',
        author: 'Дмитрий Р.',
        rating: 5,
        date: '2024-03-16',
        text: 'Отличное качество изображения и звука, удобные кресла.',
      },
      {
        id: '2',
        author: 'Анастасия К.',
        rating: 4,
        date: '2024-03-15',
        text: 'Хороший кинотеатр, но дороговатый попкорн.',
      },
    ],
  },
  {
    id: '29',
    name: 'Химчистка "Чистюля"',
    category: 'Услуги',
    rating: 4.7,
    reviewCount: 145,
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=400',
    address: 'ул. Чистая, 25',
    openHours: '08:00 - 20:00',
    phone: '+7 (999) 901-23-45',
    website: 'www.clean-service.ru',
    email: 'order@clean-service.ru',
    description: 'Профессиональная химчистка одежды и текстиля. Срочная чистка, выведение пятен, ремонт одежды.',
    reviews: [
      {
        id: '1',
        author: 'Ольга В.',
        rating: 5,
        date: '2024-03-16',
        text: 'Отличное качество чистки, вещи как новые.',
      },
      {
        id: '2',
        author: 'Михаил П.',
        rating: 4,
        date: '2024-03-15',
        text: 'Хороший сервис, но сроки иногда затягиваются.',
      },
    ],
  },
  {
    id: '30',
    name: 'Мебельный салон "Комфорт"',
    category: 'Магазины',
    rating: 4.5,
    reviewCount: 198,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
    address: 'пр. Мебельщиков, 50',
    openHours: '10:00 - 21:00',
    phone: '+7 (999) 012-34-56',
    website: 'www.comfort-mebel.ru',
    email: 'sales@comfort-mebel.ru',
    description: 'Салон мебели для дома и офиса. Мягкая мебель, кухни, спальни, детская мебель. Доставка и сборка.',
    reviews: [
      {
        id: '1',
        author: 'Евгений К.',
        rating: 5,
        date: '2024-03-16',
        text: 'Отличное качество мебели, профессиональная сборка.',
      },
      {
        id: '2',
        author: 'Марина С.',
        rating: 4,
        date: '2024-03-15',
        text: 'Хороший выбор, но долгие сроки доставки.',
      },
    ],
  },
  {
    id: '31',
    name: 'Ювелирный салон "Золотой век"',
    category: 'Магазины',
    rating: 4.9,
    reviewCount: 167,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
    address: 'ул. Ювелирная, 12',
    openHours: '10:00 - 21:00',
    phone: '+7 (999) 123-45-67',
    website: 'www.golden-age.ru',
    email: 'sales@golden-age.ru',
    description: 'Ювелирный салон премиум-класса. Золото, серебро, драгоценные камни. Изготовление украшений на заказ.',
    reviews: [
      {
        id: '1',
        author: 'Алина М.',
        rating: 5,
        date: '2024-03-16',
        text: 'Прекрасный выбор украшений, профессиональные консультанты.',
      },
      {
        id: '2',
        author: 'Сергей К.',
        rating: 5,
        date: '2024-03-15',
        text: 'Отличное качество изделий, приятное обслуживание.',
      },
    ],
  },
  {
    id: '32',
    name: 'Танцевальная студия "Ритм"',
    category: 'Спорт',
    rating: 4.8,
    reviewCount: 234,
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400',
    address: 'ул. Танцевальная, 5',
    openHours: '09:00 - 22:00',
    phone: '+7 (999) 234-56-78',
    website: 'www.rhythm-dance.ru',
    email: 'info@rhythm-dance.ru',
    description: 'Танцевальная студия для всех возрастов. Современные танцы, бальные танцы, хип-хоп, йога.',
    reviews: [
      {
        id: '1',
        author: 'Мария Л.',
        rating: 5,
        date: '2024-03-16',
        text: 'Отличные преподаватели, дружелюбная атмосфера.',
      },
      {
        id: '2',
        author: 'Артём В.',
        rating: 5,
        date: '2024-03-15',
        text: 'Профессиональный подход к обучению, удобное расписание.',
      },
    ],
  },
  {
    id: '33',
    name: 'Пекарня "Свежая выпечка"',
    category: 'Рестораны',
    rating: 4.7,
    reviewCount: 345,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
    address: 'ул. Хлебная, 8',
    openHours: '07:00 - 20:00',
    phone: '+7 (999) 345-67-89',
    website: 'www.fresh-bakery.ru',
    email: 'order@fresh-bakery.ru',
    description: 'Пекарня-кондитерская с собственным производством. Хлеб, выпечка, торты, пирожные. Кофе с собой.',
    reviews: [
      {
        id: '1',
        author: 'Наталья С.',
        rating: 5,
        date: '2024-03-16',
        text: 'Всегда свежая и вкусная выпечка, приятные цены.',
      },
      {
        id: '2',
        author: 'Дмитрий П.',
        rating: 4,
        date: '2024-03-15',
        text: 'Отличные круассаны, но иногда бывают очереди.',
      },
    ],
  },
  {
    id: '34',
    name: 'Компьютерный сервис "Цифровой доктор"',
    category: 'Услуги',
    rating: 4.6,
    reviewCount: 189,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400',
    address: 'пр. Компьютерный, 22',
    openHours: '09:00 - 21:00',
    phone: '+7 (999) 456-78-90',
    website: 'www.digital-doctor.ru',
    email: 'help@digital-doctor.ru',
    description: 'Ремонт компьютеров и ноутбуков. Установка ПО, восстановление данных, чистка от вирусов.',
    reviews: [
      {
        id: '1',
        author: 'Игорь Н.',
        rating: 5,
        date: '2024-03-16',
        text: 'Быстрый и качественный ремонт, адекватные цены.',
      },
      {
        id: '2',
        author: 'Елена В.',
        rating: 4,
        date: '2024-03-15',
        text: 'Хороший сервис, но хотелось бы более быстрой диагностики.',
      },
    ],
  },
  {
    id: '35',
    name: 'Магазин комнатных растений "Зелёный дом"',
    category: 'Магазины',
    rating: 4.8,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400',
    address: 'ул. Ботаническая, 15',
    openHours: '09:00 - 20:00',
    phone: '+7 (999) 567-89-01',
    website: 'www.green-home.ru',
    email: 'shop@green-home.ru',
    description: 'Магазин комнатных растений и товаров для ухода. Редкие растения, кашпо, грунты, удобрения.',
    reviews: [
      {
        id: '1',
        author: 'Ольга М.',
        rating: 5,
        date: '2024-03-16',
        text: 'Отличный выбор растений, грамотные консультации по уходу.',
      },
      {
        id: '2',
        author: 'Андрей С.',
        rating: 5,
        date: '2024-03-15',
        text: 'Здоровые растения, хорошие цены, приятный персонал.',
      },
    ],
  },
  // ... continue adding more businesses ...
];

export const BUSINESSES_BY_ID = BUSINESSES.reduce((acc, business) => {
  acc[business.id] = business;
  return acc;
}, {} as Record<string, Business>);

export const CATEGORIES = [
  { id: '1', name: 'Рестораны', icon: '🍽️' },
  { id: '2', name: 'Магазины', icon: '🛍️' },
  { id: '3', name: 'Красота', icon: '💇‍♀️' },
  { id: '4', name: 'Здоровье', icon: '🏥' },
  { id: '5', name: 'Услуги', icon: '🔧' },
  { id: '6', name: 'Развлечения', icon: '🎮' },
]; 