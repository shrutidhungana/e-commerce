import { ReactNode } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  success: boolean; // This property is required

  user: {
    // Change this to an object
    role: string | null; // Assuming role is a string
  };
};

export type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
};

export type FormControl = {
  name: string;
  label: string;
  placeholder?: string;
  componentType: "input" | "select" | "textarea"; // Union type to ensure strict matching
  type?: string;
  options?: { id: string; label: string }[];
};

export type FormData = {
  userName?: string; // Optional property
  email: string; // Required property
  password: string; // Required property
  [key: string]: string | undefined |File|null; // Index signature allowing string or undefined
};

export type RegisterUserPayload = {
  // Define the shape of your form data here
  userName?: string;
  email: string;
  password: string;
};
export type RegisterResponse = {
  success: boolean;
  message: string;
};

export type LoginResponse = {
  success: boolean;
  message: string;
};

export type SidebarMenuItem = {
  id: string;
  label: string;
  path: string;
  icon: ReactNode;
};


export type AddProductFormElement = {
  name: string;
  label: string;
  placeholder?: string;
  componentType: "input" | "select" | "textarea"; 
  type?: string; 
  options?: { id: string; label: string }[]; 
};

export type InitialProductFormData = {
  image: File | string| null;
  title: string;
  description: string;
  category: string;
  brand: string;
  price: string;
  salePrice: string;
  totalStock: string;
  averageReview: number;
  [key: string]: string | undefined| number| File| null ;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  category: string;
  brand: string;
  price: string;
  salePrice: string;
  totalStock: string;
  averageReview: number;
  image: File | string | null;
};


export type ProductState = {
  isLoading: boolean,
  productList: Array<Product>,
}

export type NewProductPayload = {
  title: string;
  description: string;
  category: string;
  brand: string;
  price: string;
  salePrice: string;
  totalStock: string;
  averageReview: number;
  image: File | string | null;
};

export type EditProductPayload = {
  id: string;
  formData: InitialProductFormData;
};
