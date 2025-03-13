// src/utils/auth.js
export const getAuthToken = () => {
    let token = localStorage.getItem('token') || localStorage.getItem('accessToken');
    
    // Clean up token if it has quotes
    if (token && (token.startsWith('"') || token.startsWith("'"))) {
      token = token.replace(/^["']|["']$/g, '');
    }
    
    return token;
  };
  
  export const getAuthHeader = () => {
    const token = getAuthToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  };
  
  export const isAuthenticated = () => {
    return !!getAuthToken();
  };
  