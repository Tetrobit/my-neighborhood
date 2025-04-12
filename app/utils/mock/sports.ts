import { SportOrganization, SportSection } from '../types/api';

export const MOCK_SECTIONS: SportSection[] = [
  {
    id: '1',
    name: 'Бокс',
    price: 3000,
    description: 'Тренировки по боксу для начинающих и продвинутых спортсменов. Индивидуальный подход к каждому ученику. Опытные тренеры с профессиональным опытом.',
    schedule: [
      { day: 'Понедельник', time: ['10:00', '15:00', '19:00'] },
      { day: 'Среда', time: ['10:00', '15:00', '19:00'] },
      { day: 'Пятница', time: ['10:00', '15:00', '19:00'] },
    ],
    trainer: 'Иванов Александр Петрович',
    level: 'Для всех уровней',
    minAge: 14,
  },
  {
    id: '2',
    name: 'Дзюдо',
    price: 2800,
    description: 'Секция дзюдо для детей и взрослых. Развитие силы, гибкости и координации. Участие в соревнованиях.',
    schedule: [
      { day: 'Вторник', time: ['11:00', '16:00', '20:00'] },
      { day: 'Четверг', time: ['11:00', '16:00', '20:00'] },
      { day: 'Суббота', time: ['12:00', '15:00'] },
    ],
    trainer: 'Петров Михаил Иванович',
    level: 'Начальный, продвинутый',
    minAge: 6,
  },
  {
    id: '3',
    name: 'Йога',
    price: 2500,
    description: 'Практика йоги для улучшения физического и ментального здоровья. Подходит для всех возрастов.',
    schedule: [
      { day: 'Понедельник', time: ['09:00', '18:00'] },
      { day: 'Среда', time: ['09:00', '18:00'] },
      { day: 'Пятница', time: ['09:00', '18:00'] },
    ],
    trainer: 'Сидорова Анна Владимировна',
    level: 'Для всех уровней',
    minAge: 16,
  },
  {
    id: '4',
    name: 'Плавание',
    price: 3500,
    description: 'Обучение плаванию разными стилями. Тренировки в современном бассейне под руководством опытных тренеров.',
    schedule: [
      { day: 'Вторник', time: ['10:00', '14:00', '17:00'] },
      { day: 'Четверг', time: ['10:00', '14:00', '17:00'] },
      { day: 'Суббота', time: ['11:00', '15:00'] },
    ],
    trainer: 'Морозов Дмитрий Сергеевич',
    level: 'Начальный, средний',
    minAge: 5,
  },
  {
    id: '5',
    name: 'Футбол',
    price: 2000,
    description: 'Футбольная секция для детей и подростков. Тренировки на профессиональном поле, участие в городских соревнованиях.',
    schedule: [
      { day: 'Понедельник', time: ['15:00', '17:00'] },
      { day: 'Среда', time: ['15:00', '17:00'] },
      { day: 'Пятница', time: ['15:00', '17:00'] },
    ],
    trainer: 'Волков Игорь Александрович',
    level: 'Начальный, продвинутый',
    minAge: 7,
  }
];

export const MOCK_SPORT_ORGANIZATIONS: SportOrganization[] = [
  {
    id: '1',
    name: 'Спортивный комплекс "Олимпиец"',
    address: 'ул. Спортивная, 10',
    phone: '+7 (999) 123-45-67',
    latitude: 55.751244,
    longitude: 37.618423,
    rating: 4.8,
    workingHours: [
      { day: 'Понедельник', start: '07:00', end: '23:00' },
      { day: 'Вторник', start: '07:00', end: '23:00' },
      { day: 'Среда', start: '07:00', end: '23:00' },
      { day: 'Четверг', start: '07:00', end: '23:00' },
      { day: 'Пятница', start: '07:00', end: '23:00' },
      { day: 'Суббота', start: '08:00', end: '22:00' },
      { day: 'Воскресенье', start: '08:00', end: '22:00' },
    ],
    sections: [MOCK_SECTIONS[0], MOCK_SECTIONS[1], MOCK_SECTIONS[3]],
    description: 'Современный спортивный комплекс с бассейном, тренажерным залом и залами для единоборств.',
    photos: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800',
      'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800',
    ],
  },
  {
    id: '2',
    name: 'Фитнес-центр "Энергия"',
    address: 'пр. Ленина, 25',
    phone: '+7 (999) 234-56-78',
    latitude: 55.755814,
    longitude: 37.617635,
    rating: 4.9,
    workingHours: [
      { day: 'Понедельник', start: '06:00', end: '24:00' },
      { day: 'Вторник', start: '06:00', end: '24:00' },
      { day: 'Среда', start: '06:00', end: '24:00' },
      { day: 'Четверг', start: '06:00', end: '24:00' },
      { day: 'Пятница', start: '06:00', end: '24:00' },
      { day: 'Суббота', start: '08:00', end: '22:00' },
      { day: 'Воскресенье', start: '08:00', end: '22:00' },
    ],
    sections: [MOCK_SECTIONS[2], MOCK_SECTIONS[3]],
    description: 'Фитнес-центр премиум класса с современным оборудованием и профессиональными тренерами.',
    photos: [
      'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800',
      'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=800',
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800',
    ],
  },
  {
    id: '3',
    name: 'Детский спортивный клуб "Чемпион"',
    address: 'ул. Гагарина, 15',
    phone: '+7 (999) 345-67-89',
    latitude: 55.749792,
    longitude: 37.632495,
    rating: 4.7,
    workingHours: [
      { day: 'Понедельник', start: '09:00', end: '20:00' },
      { day: 'Вторник', start: '09:00', end: '20:00' },
      { day: 'Среда', start: '09:00', end: '20:00' },
      { day: 'Четверг', start: '09:00', end: '20:00' },
      { day: 'Пятница', start: '09:00', end: '20:00' },
      { day: 'Суббота', start: '10:00', end: '18:00' },
      { day: 'Воскресенье', start: '10:00', end: '18:00' },
    ],
    sections: [MOCK_SECTIONS[1], MOCK_SECTIONS[4]],
    description: 'Специализированный спортивный клуб для детей и подростков. Профессиональные тренеры с педагогическим образованием.',
    photos: [
      'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
      'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800',
    ],
  },
]; 