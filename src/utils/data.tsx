import type { Login, LoginResponse, Register } from "../model/handler";
const BASE_URL = 'https://inventoryapp-production-3028.up.railway.app/api/v1';

// Fungsi Login
async function login({ email, password }: Login): Promise<LoginResponse> {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const responseJson = await response.json();

    if (responseJson.status !== 200) {
      return { status: responseJson.status, error: responseJson.error || responseJson.message };
    }

    return { status: responseJson.status, message: responseJson.message, data: responseJson.data };
  } catch (error) {
    const err = error as Error;
    return { status: 500, error: err.message || 'Terjadi kesalahan jaringan' };
  }
}

// Fungsi Register
async function register({ username, email, password }: Register) {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (response.status !== 201) {
      return { success: false, message: data.error || 'Registration failed' };
    }

    return { success: true, message: data.message || 'Registration successful' };
  } catch (err) {
    return { success: false, message: 'Network error. Please try again.' };
  }
}

// Fungsi Token
function getAccessToken() {
  return localStorage.getItem('userToken');
}

function putAccessToken(accessToken: string) {
  return localStorage.setItem('userToken', accessToken);
}

function removeAccessToken() {
  localStorage.removeItem('userToken');
}

// Fetch dengan token
async function fetchWithToken(url: string, options: RequestInit = {}) {
  const token = getAccessToken();

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    // Token invalid atau expired
    removeAccessToken();
    window.location.href = '/'; // redirect ke login
    return null;
  }

  return res;
}

// Fungsi ambil data user (opsional)
async function getUserProfile() {
  try {
    const res = await fetchWithToken('/me');
    if (!res) return null; // token invalid → sudah redirect
    if (!res.ok) throw new Error('Gagal mengambil profil user');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export {
  login,
  fetchWithToken,
  getUserProfile,
  putAccessToken,
  register,
  removeAccessToken
}
