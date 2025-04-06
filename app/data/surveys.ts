import { Survey } from '../types/survey';

export const SURVEYS: Survey[] = [
    {
        id: '1',
        title: 'Благоустройство детской площадки',
        description: 'Какие элементы вы хотели бы видеть на новой детской площадке в парке?',
        type: 'government',
        author: 'Министерство благоустройства',
        authorId: 'gov-1',
        createdAt: new Date('2024-04-01'),
        options: [
            { id: '1', text: 'Качели для малышей', votes: 45 },
            { id: '2', text: 'Спортивный комплекс', votes: 30 },
            { id: '3', text: 'Песочница с навесом', votes: 25 },
        ],
        isActive: true,
        totalVotes: 100,
        category: 'благоустройство'
    },
    {
        id: '2',
        title: 'Время работы магазинов',
        description: 'В какое время вам удобнее посещать магазины в нашем районе?',
        type: 'user',
        author: 'Анна Петрова',
        authorId: 'user-123',
        createdAt: new Date('2024-04-03'),
        options: [
            { id: '1', text: '8:00 - 20:00', votes: 150 },
            { id: '2', text: '9:00 - 21:00', votes: 200 },
            { id: '3', text: '10:00 - 22:00', votes: 175 },
            { id: '4', text: 'Круглосуточно', votes: 75 },
        ],
        isActive: true,
        totalVotes: 600,
        category: 'услуги'
    },
    {
        id: '3',
        title: 'Озеленение района',
        description: 'Какие деревья вы хотели бы видеть на улицах нашего района?',
        type: 'government',
        author: 'Отдел экологии',
        authorId: 'gov-2',
        createdAt: new Date('2024-04-05'),
        options: [
            { id: '1', text: 'Липы', votes: 80 },
            { id: '2', text: 'Клёны', votes: 65 },
            { id: '3', text: 'Берёзы', votes: 95 },
            { id: '4', text: 'Рябины', votes: 60 },
        ],
        isActive: true,
        totalVotes: 300,
        category: 'экология'
    }
];

export const SURVEY_CATEGORIES = [
    { id: 'all', name: 'Все' },
    { id: 'благоустройство', name: 'Благоустройство' },
    { id: 'экология', name: 'Экология' },
    { id: 'услуги', name: 'Услуги' },
    { id: 'транспорт', name: 'Транспорт' },
    { id: 'образование', name: 'Образование' },
    { id: 'досуг', name: 'Досуг' },
]; 