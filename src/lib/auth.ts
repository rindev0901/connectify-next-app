
import { supabase } from "@/integrations/supabase/client";
import { Provider } from "@supabase/supabase-js";

export type SocialProvider = 'google' | 'facebook' | 'github';

// Convert our SocialProvider type to Supabase Provider type
const mapToSupabaseProvider = (provider: SocialProvider): Provider => {
  switch (provider) {
    case 'google':
      return 'google';
    case 'facebook':
      return 'facebook';
    case 'github':
      return 'github';
    default:
      return 'google';
  }
};

export const loginWithSocialProvider = async (provider: SocialProvider) => {
  console.log(`Authenticating with ${provider} using Supabase...`);
  
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: mapToSupabaseProvider(provider),
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`Error signing in with ${provider}:`, error);
    throw error;
  }
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
