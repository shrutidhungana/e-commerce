export interface FormControl {
  name: string;
  label: string;
  placeholder: string;
  componentType: "input" | "select" | "textarea"; // Union type to ensure strict matching
  type: string;
  options?: { id: string; label: string }[];
}

export interface FormData {
  userName?: string; // Optional property
  email: string; // Required property
  password: string; // Required property
  [key: string]: string | undefined; // Index signature allowing string or undefined
}