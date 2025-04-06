export interface BaseProfile {
  id: string;
  name: string;
  avatar: string;
  type: 'organization' | 'person';
  bio?: string;
  location?: string;
  joinDate: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
}

export interface PersonProfile extends BaseProfile {
  type: 'person';
  email: string;
  interests?: string[];
  profession?: string;
  achievements?: string[];
  volunteering?: string[];
}

export interface OrganizationProfile extends BaseProfile {
  type: 'organization';
  email: string;
  phone: string;
  website: string;
  workingHours: string;
  category: string;
  services?: string[];
  projects?: string[];
} 