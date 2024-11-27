const API_BASE_URL = "http://localhost:5000/api"

export const apiEndpoints = {
  register: `${API_BASE_URL}/auth/register`,
  login: `${API_BASE_URL}/auth/login`,
  logout: `${API_BASE_URL}/auth/logout`,
  auth: `${API_BASE_URL}/auth/check-auth`,
  image: `${API_BASE_URL}/admin/products/upload-image`,
  addProducts: `${API_BASE_URL}/admin/products/add`,
  listProducts: `${API_BASE_URL}/admin/products/lists`,
  editProduct: `${API_BASE_URL}/admin/products/edit/:id`,
  deleteProduct: `${API_BASE_URL}/admin/products/delete/:id`,
  AdminOrdersList: `${API_BASE_URL}/admin/orders/lists`,
  AdminOrderDetails: `${API_BASE_URL}/admin/orders/details/:id`,
  UpdateAOrderStatus: `${API_BASE_URL}/admin/orders/update/:id`,
  shopProducts: `${API_BASE_URL}/shop/products/lists`,
  shopProductDetails: `${API_BASE_URL}/shop/products/lists/:id`,
  addToCart: `${API_BASE_URL}/shop/cart/add`,
  cartItems: `${API_BASE_URL}/shop/cart/lists/:userId`,
  updateCartItemQuantity: `${API_BASE_URL}/shop/cart/update-cart`,
  deleteCartItem: `${API_BASE_URL}/shop/cart/:userId/:productId`,
  addAddress: `${API_BASE_URL}/shop/address/add`,
  listAddress: `${API_BASE_URL}/shop/address/lists/:userId`,
  updateAddress: `${API_BASE_URL}/shop/address/update/:userId/:addressId`,
  removeAddress: `${API_BASE_URL}/shop/address/delete/:userId/:addressId`,
  createOrder: `${API_BASE_URL}/shop/order/create`,
  captureAPayment: `${API_BASE_URL}/shop/order/capture`,
  OrderList: `${API_BASE_URL}/shop/order/list/:userId`,
  OrderDetails: `${API_BASE_URL}/shop/order/details/:id`,
  SearchItems: `${API_BASE_URL}/shop/search/:keyword`,

  // Add other API endpoints here as needed
};