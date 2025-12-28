// src/utils/data.ts

const BASE_URL = 'https://inventory-api-production-your-link.up.railway.app'; // Ganti dengan URL asli teman kamu jika berbeda

export const login = async (payload: any) => {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        return await response.json();
    } catch (error) {
        return { error: true, message: "Network Error: Failed to connect to server" };
    }
};

export const register = async (payload: any) => {
    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        return await response.json();
    } catch (error) {
        return { error: true, message: "Network Error: Failed to connect to server" };
    }
};