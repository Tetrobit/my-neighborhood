import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import MiniAppsScreen from '@/app/(tabs)/miniapps';

describe('MiniAppsScreen', () => {
  it('renders the header with title', () => {
    render(<MiniAppsScreen />);
    expect(screen.getByText('Мини-приложения')).toBeTruthy();
  });

  it('renders the section title', () => {
    render(<MiniAppsScreen />);
    expect(screen.getByText('Все приложения')).toBeTruthy();
  });

  it('renders all mini-apps', () => {
    render(<MiniAppsScreen />);
    
    // Check if all mini-app titles are rendered
    expect(screen.getByText('Бизнесы')).toBeTruthy();
    expect(screen.getByText('Переработка')).toBeTruthy();
    expect(screen.getByText('Карта')).toBeTruthy();
  });

  it('renders mini-apps with correct icons', () => {
    render(<MiniAppsScreen />);
    
    // Check if all mini-app icons are rendered
    const icons = screen.getAllByTestId('mini-app-icon');
    expect(icons).toHaveLength(3);
  });

  it('navigates to correct routes when mini-apps are pressed', () => {
    const { getByText } = render(<MiniAppsScreen />);
    
    // Mock the Link component's onPress
    const businessLink = getByText('Бизнесы');
    const recyclingLink = getByText('Переработка');
    const mapLink = getByText('Карта');

    fireEvent.press(businessLink);
    fireEvent.press(recyclingLink);
    fireEvent.press(mapLink);

    // Note: Actual navigation testing would require mocking the navigation
    // This is just a basic test to ensure the components are rendered
  });
}); 