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
  shopProducts: `${API_BASE_URL}/shop/products/lists`,
  shopProductDetails: `${API_BASE_URL}/shop/products/lists/:id`,
  addToCart: `${API_BASE_URL}/shop/cart/add`,
  cartItems: `${API_BASE_URL}/shop/cart/lists/:userId`,
  updateCartItemQuantity: `${API_BASE_URL}/shop/cart/update-cart`,
  deleteCartItem: `${API_BASE_URL}/shop/cart/:userId/:productId`,
  addAddress: `${API_BASE_URL}/shop/address/add`,
  listAddress: `${API_BASE_URL}/shop/address/lists/:userId`,
  editAddress: `${API_BASE_URL}/shop/address/update/:userId/:addressId`,
  deleteAddress: `${API_BASE_URL}/shop/address/delete/:userId/:addressId`,
  // Add other API endpoints here as needed
};