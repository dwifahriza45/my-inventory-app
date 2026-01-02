
import type { Login, Register } from "../components/model/handler";
const BASE_URL = 'https://inventoryapp-production-3028.up.railway.app/api/v1';

export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
}

export const putAccessToken = (accessToken: string) => {
  return localStorage.setItem('accessToken', accessToken);
}

export const removeAccessToken = () => {
  localStorage.removeItem('accessToken');
}

export const fetchWithToken = async (url: string, options : RequestInit = {}) => {
  const token = getAccessToken();

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
}

// Fungsi Login
export const login = async ({ email, password }: Login) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    return {
      code: data.code,
      status: data.status,
      message: data.message,
      error: data.error,
      data: data.data,
    }
  } catch (err) {
    return {
      code: 500,
      status: "NOK",
      message: 'Network error. Please try again.',
      error: true
    };
  }
}

// Fungsi Register
export const register = async ({ username, email, password }: Register) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    return {
      code: data.code,
      status: data.status,
      message: data.message,
      error: data.error,
      valid: data.valid || {}
    };
  } catch (err) {
    return {
      code: 500,
      status: "NOK",
      message: 'Network error. Please try again.',
      error: true
    };
  }
}

// Fungsi ambil data user (opsional)
export const getUserProfile = async () => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/auth/me`);
    const data = await response.json();

    return {
      code: data.code,
      status: data.status,
      message: data.message,
      error: data.error,
      data: data.data
    };
  } catch (err) {
    return {
      code: 500,
      status: "NOK",
      message: 'Network error. Please try again.',
      error: true
    };
  }
}