import { MedicalOrganization, Doctor } from '../types/api';

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Иванов Иван Иванович',
    specialization: 'Терапевт',
    price: 2000,
    experience: 15,
    rating: 4.8,
    photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=500',
    description: 'Врач высшей категории, кандидат медицинских наук. Специализируется на диагностике и лечении внутренних болезней.',
    schedule: [
      { day: 'Понедельник', time: ['09:00', '11:00', '14:00'] },
      { day: 'Среда', time: ['10:00', '13:00', '16:00'] },
      { day: 'Пятница', time: ['09:00', '12:00', '15:00'] },
    ]
  },
  {
    id: '2',
    name: 'Петрова Мария Сергеевна',
    specialization: 'Кардиолог',
    price: 2500,
    experience: 12,
    rating: 4.9,
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500',
    description: 'Врач-кардиолог высшей категории. Специализируется на диагностике и лечении сердечно-сосудистых заболеваний.',
    schedule: [
      { day: 'Вторник', time: ['10:00', '12:00', '15:00'] },
      { day: 'Четверг', time: ['09:00', '11:00', '14:00'] },
      { day: 'Суббота', time: ['10:00', '13:00'] },
    ]
  },
  {
    id: '3',
    name: 'Смирнов Алексей Петрович',
    specialization: 'Невролог',
    price: 2300,
    experience: 10,
    rating: 4.7,
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500',
    description: 'Врач-невролог первой категории. Специализируется на диагностике и лечении заболеваний нервной системы.',
    schedule: [
      { day: 'Понедельник', time: ['11:00', '14:00', '16:00'] },
      { day: 'Среда', time: ['09:00', '12:00', '15:00'] },
      { day: 'Пятница', time: ['10:00', '13:00', '16:00'] },
    ]
  },
  {
    id: '4',
    name: 'Козлова Анна Михайловна',
    specialization: 'Эндокринолог',
    price: 2400,
    experience: 8,
    rating: 4.8,
    photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500',
    description: 'Врач-эндокринолог первой категории. Специализируется на лечении заболеваний эндокринной системы.',
    schedule: [
      { day: 'Вторник', time: ['09:00', '12:00', '15:00'] },
      { day: 'Четверг', time: ['10:00', '13:00', '16:00'] },
      { day: 'Суббота', time: ['09:00', '12:00'] },
    ]
  },
  {
    id: '5',
    name: 'Соколов Дмитрий Александрович',
    specialization: 'Хирург',
    price: 2800,
    experience: 14,
    rating: 4.9,
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500',
    description: 'Врач-хирург высшей категории. Специализируется на общей хирургии и малоинвазивных операциях.',
    schedule: [
      { day: 'Понедельник', time: ['10:00', '13:00', '16:00'] },
      { day: 'Среда', time: ['09:00', '12:00', '15:00'] },
      { day: 'Пятница', time: ['11:00', '14:00', '17:00'] },
    ]
  }
];

export const MOCK_ORGANIZATIONS: MedicalOrganization[] = [
  {
    id: '1',
    name: 'Городская клиническая больница №1',
    address: 'ул. Ленина, 15',
    phone: '+7 (999) 123-45-67',
    latitude: 55.751244,
    longitude: 37.618423,
    rating: 4.8,
    workingHours: [
      { day: 'Понедельник', start: '08:00', end: '20:00' },
      { day: 'Вторник', start: '08:00', end: '20:00' },
      { day: 'Среда', start: '08:00', end: '20:00' },
      { day: 'Четверг', start: '08:00', end: '20:00' },
      { day: 'Пятница', start: '08:00', end: '20:00' },
      { day: 'Суббота', start: '09:00', end: '18:00' },
      { day: 'Воскресенье', start: '09:00', end: '16:00' },
    ],
    doctors: [MOCK_DOCTORS[0], MOCK_DOCTORS[1], MOCK_DOCTORS[4]],
    description: 'Современная многопрофильная клиника с высококвалифицированными специалистами и новейшим оборудованием.',
    photos: [
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800',
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800',
    ],
  },
  {
    id: '2',
    name: 'Медицинский центр "Здоровье"',
    address: 'пр. Мира, 42',
    phone: '+7 (999) 234-56-78',
    latitude: 55.755814,
    longitude: 37.617635,
    rating: 4.9,
    workingHours: [
      { day: 'Понедельник', start: '09:00', end: '21:00' },
      { day: 'Вторник', start: '09:00', end: '21:00' },
      { day: 'Среда', start: '09:00', end: '21:00' },
      { day: 'Четверг', start: '09:00', end: '21:00' },
      { day: 'Пятница', start: '09:00', end: '21:00' },
      { day: 'Суббота', start: '10:00', end: '18:00' },
      { day: 'Воскресенье', start: '10:00', end: '16:00' },
    ],
    doctors: [MOCK_DOCTORS[2], MOCK_DOCTORS[3]],
    description: 'Частный медицинский центр с широким спектром услуг. Индивидуальный подход к каждому пациенту.',
    photos: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800',
      'https://images.unsplash.com/photo-1519494080410-f9aa76cb4283?w=800',
      'https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=800',
    ],
  },
  {
    id: '3',
    name: 'Клиника семейной медицины',
    address: 'ул. Гагарина, 78',
    phone: '+7 (999) 345-67-89',
    latitude: 55.749792,
    longitude: 37.632495,
    rating: 4.7,
    workingHours: [
      { day: 'Понедельник', start: '08:00', end: '20:00' },
      { day: 'Вторник', start: '08:00', end: '20:00' },
      { day: 'Среда', start: '08:00', end: '20:00' },
      { day: 'Четверг', start: '08:00', end: '20:00' },
      { day: 'Пятница', start: '08:00', end: '20:00' },
      { day: 'Суббота', start: '09:00', end: '17:00' },
      { day: 'Воскресенье', start: '09:00', end: '15:00' },
    ],
    doctors: [MOCK_DOCTORS[0], MOCK_DOCTORS[2], MOCK_DOCTORS[3], MOCK_DOCTORS[4]],
    description: 'Клиника для всей семьи. Предоставляем полный спектр медицинских услуг для взрослых и детей.',
    photos: [
      'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=800',
      'https://images.unsplash.com/photo-1579684288361-5c1a2957a700?w=800',
      'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800',
    ],
  }
]; 