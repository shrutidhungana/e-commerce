export interface User {
  id: string;
  name: string;
  email: string;
  // Add other user properties as needed
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
}
