import { PersonProfile, OrganizationProfile } from '../types/profile';

export const USERS: (PersonProfile | OrganizationProfile)[] = [
  {
    id: 'admin1',
    type: 'organization',
    name: 'Администрация района',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    bio: 'Официальный аккаунт администрации района. Здесь вы найдете важную информацию о жизни района, новости и анонсы мероприятий.',
    location: 'Москва, Россия',
    joinDate: '2024-01-01',
    website: 'www.admin.ru',
    email: 'admin@admin.ru',
    phone: '+7 (999) 123-45-67',
    workingHours: 'Пн-Пт: 9:00-18:00',
    category: 'Государственное учреждение',
    services: [
      'Прием обращений граждан',
      'Выдача справок',
      'Согласование документов',
      'Организация мероприятий'
    ],
    projects: [
      'Благоустройство парка',
      'Ремонт детских площадок',
      'Озеленение района'
    ],
    stats: {
      posts: 145,
      followers: 3250,
      following: 84
    }
  },
  {
    id: 'ivan1',
    type: 'person',
    name: 'Иван Петров',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
    bio: 'Активный житель района, люблю наш город и стремлюсь сделать его лучше',
    location: 'Москва, Россия',
    joinDate: '2024-01-15',
    email: 'ivan@example.com',
    profession: 'Архитектор',
    interests: [
      'Урбанистика',
      'Экология',
      'Спорт',
      'Общественная деятельность'
    ],
    achievements: [
      'Организатор субботников',
      'Победитель конкурса "Лучший двор"',
      'Волонтер года 2023'
    ],
    volunteering: [
      'Помощь в организации районных мероприятий',
      'Участие в экологических акциях',
      'Поддержка пожилых жителей района'
    ],
    stats: {
      posts: 45,
      followers: 250,
      following: 184
    }
  },
  {
    id: 'anna1',
    type: 'person',
    name: 'Анна Михайлова',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    bio: 'Учитель начальных классов, организатор детских мероприятий',
    location: 'Москва, Россия',
    joinDate: '2024-02-01',
    email: 'anna@example.com',
    profession: 'Учитель',
    interests: [
      'Образование',
      'Детское развитие',
      'Творчество',
      'Организация мероприятий'
    ],
    achievements: [
      'Учитель года 2023',
      'Организатор детского фестиваля',
      'Автор образовательных программ'
    ],
    volunteering: [
      'Проведение бесплатных мастер-классов',
      'Помощь в организации школьных праздников',
      'Участие в образовательных проектах'
    ],
    stats: {
      posts: 67,
      followers: 420,
      following: 156
    }
  }
];

export const USERS_BY_ID = USERS.reduce((acc, user) => {
  acc[user.id] = user;
  return acc;
}, {} as Record<string, PersonProfile | OrganizationProfile>); 