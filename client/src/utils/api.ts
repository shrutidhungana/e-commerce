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
  // Add other API endpoints here as needed
};