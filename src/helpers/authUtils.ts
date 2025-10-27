// Utility functions for authentication

export const hasAuthTokens = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  
  // Both tokens are required for refresh to work
  return !!(accessToken && refreshToken);
};

export const clearAuthTokens = (): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export const getAuthTokens = (): { accessToken: string | null; refreshToken: string | null } => {
  if (typeof window === 'undefined') {
    return { accessToken: null, refreshToken: null };
  }
  
  return {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
  };
};
