
import { v4 as uuidv4 } from 'uuid';

export type SocialProvider = 'google' | 'facebook' | 'github';

// Mock authentication functions for demonstration purposes
// In a real application, these would connect to actual OAuth providers

export const loginWithSocialProvider = async (provider: SocialProvider): Promise<any> => {
  console.log(`Authenticating with ${provider}...`);
  
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock successful authentication
      const mockUser = {
        id: uuidv4(),
        name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        email: `user@${provider}.com`,
        avatar: `https://source.unsplash.com/random/100x100?face`,
        provider: provider,
      };
      
      resolve(mockUser);
    }, 1000);
  });
};

// Helper to get provider colors
export const getProviderColor = (provider: SocialProvider): string => {
  switch (provider) {
    case 'google':
      return 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-300';
    case 'facebook':
      return 'bg-[#1877F2] hover:bg-[#166FE5] text-white';
    case 'github':
      return 'bg-[#24292e] hover:bg-[#2c3440] text-white';
    default:
      return 'bg-primary hover:bg-primary/90 text-primary-foreground';
  }
};
