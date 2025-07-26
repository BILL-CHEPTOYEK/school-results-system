// src/services/api.js

const API_BASE = import.meta.env.VITE_API_BASE || window.location.origin;

export function getToken() {
    return localStorage.getItem('token');
}

export async function apiFetch(path, options = {}) {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };
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
    delete: (path, options) => apiFetch(path, { ...options, method: 'DELETE' }),
};
