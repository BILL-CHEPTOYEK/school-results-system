// src/services/api.js

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000';

export function getToken() {
    const token = localStorage.getItem('token');
    return token;
}

export async function apiFetch(path, options = {}) {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    // Only add Authorization header if we have a valid token
    if (token && token.trim() !== '' && token !== 'null' && token !== 'undefined') {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers,
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw data;
    }
    return data;
}

export default {
    get: (path, options) => apiFetch(path, { ...options, method: 'GET' }),
    post: (path, body, options) => apiFetch(path, { ...options, method: 'POST', body: JSON.stringify(body) }),
    put: (path, body, options) => apiFetch(path, { ...options, method: 'PUT', body: JSON.stringify(body) }),
    patch: (path, body, options) => apiFetch(path, { ...options, method: 'PATCH', body: JSON.stringify(body) }),
    delete: (path, options) => apiFetch(path, { ...options, method: 'DELETE' }),
};
