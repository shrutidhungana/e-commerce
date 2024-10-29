export type User ={
  id: string;
  name: string;
  email: string;
  // Add other user properties as needed
}

export type AuthState ={
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
}

export type FormControl = {
  name: string;
  label: string;
  placeholder: string;
  componentType: "input" | "select" | "textarea"; // Union type to ensure strict matching
  type: string;
  options?: { id: string; label: string }[];
};

export type FormData = {
  userName?: string; // Optional property
  email: string; // Required property
  password: string; // Required property
  [key: string]: string | undefined; // Index signature allowing string or undefined
};


export type RegisterResponse = {
  success: boolean;
  message: string;
}
