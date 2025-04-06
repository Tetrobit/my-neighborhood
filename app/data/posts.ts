export interface User {
  id: string;
  name: string;
  avatar: string;
  type: 'person' | 'organization';
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  createdAt: string;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  image?: string;
  createdAt: string;
  likes: number;
  isLiked?: boolean;
  comments: Comment[];
}

export const USERS: User[] = [
  {
    id: 'admin1',
    name: 'Администрация района',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    type: 'organization'
  },
  {
    id: 'anna1',
    name: 'Анна Михайлова',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    type: 'person'
  },
  {
    id: 'ivan1',
    name: 'Иван Петров',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
    type: 'person'
  }
];

export const POSTS: Post[] = [
  {
    id: '1',
    author: USERS[0],
    content: 'В эту субботу состоится торжественное открытие обновленного городского парка. Приглашаем всех жителей района на праздничное мероприятие!',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=800',
    createdAt: '2024-03-25T10:00:00',
    likes: 45,
    comments: [
      {
        id: '1',
        user: USERS[1],
        text: 'Обязательно придем всей семьей!',
        createdAt: '2024-03-25T10:30:00'
      }
    ]
  },
  {
    id: '2',
    author: USERS[1],
    content: 'Делюсь фотографиями с субботника в нашем дворе. Вместе мы сделали наш район чище! 🌿',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800',
    createdAt: '2024-03-24T15:30:00',
    likes: 23,
    comments: []
  },
  {
    id: '3',
    author: USERS[2],
    content: 'Открыл новую пекарню в нашем районе! Заходите на чашечку кофе и свежую выпечку ☕️🥐',
    image: 'https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=800',
    createdAt: '2024-03-23T09:00:00',
    likes: 56,
    comments: [
      {
        id: '2',
        user: USERS[1],
        text: 'Поздравляю с открытием! Обязательно зайду попробовать.',
        createdAt: '2024-03-23T09:15:00'
      }
    ]
  }
]; 