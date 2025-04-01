import React from 'react';
import { render, screen } from '@testing-library/react-native';
import HomeScreen from '@/app/(tabs)/profile';
import { useAuth } from '@/hooks/useAuth';

// Mock the useAuth hook
jest.mock('@/hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

describe('HomeScreen', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Mock the useAuth hook to return a test user
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        id: '1',
        email: 'test@example.com',
        avatar_url: null,
      },
    });
  });

  it('renders the header with title', () => {
    render(<HomeScreen />);
    expect(screen.getByText('Мой район')).toBeTruthy();
  });

  it('renders the news section', () => {
    render(<HomeScreen />);
    expect(screen.getByText('Новости района')).toBeTruthy();
  });

  it('renders all news items', () => {
    render(<HomeScreen />);
    
    // Check if all news titles are rendered
    expect(screen.getByText('Открытие нового парка')).toBeTruthy();
    expect(screen.getByText('Новый пункт переработки')).toBeTruthy();
    expect(screen.getByText('Фестиваль местных предпринимателей')).toBeTruthy();
  });

  it('renders news items with correct dates', () => {
    render(<HomeScreen />);
    
    // Check if all news dates are rendered
    expect(screen.getByText('25 марта 2024')).toBeTruthy();
    expect(screen.getByText('23 марта 2024')).toBeTruthy();
    expect(screen.getByText('20 марта 2024')).toBeTruthy();
  });

  it('renders user avatar placeholder when no avatar URL is provided', () => {
    render(<HomeScreen />);
    
    // The avatar placeholder should be rendered
    const avatarPlaceholder = screen.getByTestId('avatar-placeholder');
    expect(avatarPlaceholder).toBeTruthy();
  });
}); 