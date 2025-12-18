const BASE_URL = 'https://inventoryapp-production-3028.up.railway.app/api/v1';

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function putAccessToken(accessToken) {
  return localStorage.setItem('accessToken', accessToken);
}

async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

async function login({ email, password }) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 200) {
    alert(responseJson.message);
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function register({ username, email, password }) {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 201) {
    alert(responseJson.message);
    return { error: true };
  }

  return { error: false };
}

async function getUserLogged() {
  const response = await fetchWithToken(`${BASE_URL}/auth/me`);
  const responseJson = await response.json();

  if (responseJson.status !== 200) {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}