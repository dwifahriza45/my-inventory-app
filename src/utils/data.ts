// src/utils/data.ts
const BASE_URL = 'https://inventoryapp-production-3028.up.railway.app/api/v1';

export const login = async ({email, password} : {email: string, password: string}) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const responseJson = await response.json();
        return responseJson;
    } catch (error) {
        return { error: true, message: "Network Error: Failed to connect to server" };
    }
};

export const register = async ({ name, email, password }: { name: string, email: string, password: string }) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // Kirim 'username' agar tidak Error 400 (Validation Failed)
            body: JSON.stringify({ username: name, email, password }) 
        });
        const responseJson = await response.json();
        return responseJson;
    } catch (error) {
        return { error: true, message: "Network Error: Failed to connect to server" };
    }
};