export type SurveyType = 'user' | 'government';

export interface SurveyOption {
    id: string;
    text: string;
    votes: number;
}

export interface Survey {
    id: string;
    title: string;
    description: string;
    type: SurveyType;
    author: string;
    authorId: string;
    createdAt: Date;
    options: SurveyOption[];
    isActive: boolean;
    totalVotes: number;
    category: string;
} 