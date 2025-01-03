import { ReactNode } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  success: boolean;
  token?: null;

  user: {
    id: string;
    role: string | null | undefined;
    userName: string;
  };
};

export type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  token:null|undefined,
};

export type FormControl = {
  name: string;
  label: string;
  placeholder?: string;
  componentType: "input" | "select" | "textarea";
  type?: string;
  options?: { id: string; label: string }[];
};

export type FormData = {
  userName?: string;
  email: string;
  password: string;
  [key: string]: string | undefined | File | null;
};

export type RegisterUserPayload = {
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
  image: File | string | null;
  title: string;
  description: string;
  category: string;
  brand: string;
  price: string;
  salePrice: string;
  totalStock: string;
  averageReview: number;
  [key: string]: string | undefined | number | File | null;
};

export type Product = {
  _id?: string | undefined;
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
  isLoading: boolean;
  productList: Array<Product>;
};

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

export type HandleDelete = (productId: string) => void;

export type Response = {
  payload?: RegisterResponse;
  meta: {
    requestStatus: "fulfilled" | "pending" | "rejected";
  };
  error?: {
    message: string;
  };
};

export type HeaderMenuItem = {
  id: string;
  label: string;
  path: string;
};

export type FilterOption = {
  id: string;
  label: string;
};

export type FilterOptions = {
  category: FilterOption[];
  brand: FilterOption[];
  [key: string]: FilterOption[];
};

export type SortOption = {
  id: string;
  label: string;
};

export type CategoryOptionsMap = {
  [key: string]: string;
};

export type BrandOptionsMap = {
  [key: string]: string;
};

export type ShopState = {
  isLoading: boolean;
  productList: Array<Product>;
  productDetails: Product | null;
};

export type Filters = {
  category?: string[]; // Make sure category and brand are arrays of strings
  brand?: string[];
  [key: string]: string[] | undefined;
};

export type FilterParams = Record<string, string[] | undefined>;

export type FetchProductsParams = {
  filterParams: Record<string, string[] | undefined>;
  sortParams: string;
};

export type CartItems = {
  _id?: string;
  image: string;
  price: number;
  productId: string;
  quantity: number;
  salePrice?: number;
  title: string;
};

export type Cart = {
  
  _id?: string;
  productId: string;
  quantity: number;
  items: CartItems[];
  
};

export type CartState = {
  cartItems: Array<Cart>;
  isLoading: boolean;
};

export type CartPayload = {
  productId: string;
  quantity: number;
  userId: string;
};

export type DeleteCartPayload = {
  userId: string;
  productId: string;
};

export type CurrentItem = {
  id: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export type Address = {
  _id?: string;
  userId: string;
  address: string;
  city: string;
  pincode: string;
  notes: string;
  phone: string;
};

export type AddressState = {
  isLoading: boolean;
  addressList: Array<Address>;
};

export type InitialAddressFormData = {
  address: string;
  city: string;
  pincode: string;
  notes: string;
  phone: string;
  [key: string]: string;
};

export type AddressPayload = {
  userId?: string;
  address: string;
  city: string;
  pincode: string;
  notes: string;
  phone: string;
};

export type EditAddressPayload = {
  userId: string | null;
  addressId: string;
  formData: InitialAddressFormData;
};

export type DeleteAddressPayload = {
  userId: string;
  addressId: string;
};

export type OrderState = {
  status: string;
};

export type Order = {
  userId: string;
  cartId: string;
  cartItems: Array<Cart>;
  addressInfo: Address;
  orderStatus: string;
  paymentMethod: string;
  paymentStatus: string;
  totalAmount: number;
  orderDate: Date | string;
  orderUpdateDate: Date | string;
  paymentId: string | null;
  payerId: string | null;
  [key: string]: string | Address | number | Date | Array<Cart> | null;
};

export type InitialOrderState = {
  approvalURL: null;
  isLoading: boolean;
  orderId: null;
  orderDetails: Order | null;
  orderList: Array<Order>;
};

export type OrderPayload = {
  userId: string;
  cartId: string;
  cartItems: Array<Cart>;
  addressInfo: Address;
  orderStatus: string;
  paymentMethod: string;
  paymentStatus: string;
  totalAmount: number;
  orderDate: Date | string;
  orderUpdateDate: Date | string;
  paymentId: string | null;
  payerId: string | null;
};

export type Capture = {
  
  success: boolean;
  message: string;
  
};

export type CapturePaymentParams = {
  paymentId: string[] | string;
  payerId: string[] | string;
  orderId:  string[] |string;
};

export type AdminOrderState = {
  orderDetails: Order | null;
  orderList: Array<Order>;
  isLoading: boolean;
};

export type UpdateOrderPayload = {
  orderStatus: string;
 id: string | number | Date | Address | Cart[];
};

export type Search = {
  title: string;
  description: string;
  category: string;
  brand: string;
};

export type InitialSearchState = {
  isLoading: boolean;
  searchResults: Array<Search>;
};

export type Reviews = {
  productId: string;
  userId: string;
  userName: string;
  reviewMessage: string;
  reviewValue: number;
  [key: string]: string |number;
};

export type ReviewPayload = {
  productId: string;
  userId: string;
  userName: string;
  reviewMessage: string;
  reviewValue: number;
};

export type InitialReviewState = {
  isLoading: boolean;
  reviews: Array<Reviews>;
};

export type Image = {
  image: string;
  [key: string]: string;
};

export type FeatureImageState = {
  isLoading: boolean;
  featureImageList:Array<Image>
}


