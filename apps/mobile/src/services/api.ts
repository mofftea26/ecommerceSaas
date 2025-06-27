const API_URL = 'https://example.com/api';

export async function fetchBranding() {
  const res = await fetch(`${API_URL}/branding`);
  return res.json();
}

export async function fetchProducts() {
  const res = await fetch(`${API_URL}/products`);
  return res.json();
}

export async function fetchProduct(id: number) {
  const res = await fetch(`${API_URL}/products/${id}`);
  return res.json();
}
