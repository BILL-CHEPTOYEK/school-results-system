// src/services/api.js


let API_BASE = import.meta.env.VITE_API_BASE || window.location.origin;

export function setApiBase(url) {
    API_BASE = url;
}

export function getToken() {
    return localStorage.getItem('token');
}


export async function apiFetch(path, options = {}) {
    const token = getToken();
    // Always use public backend for tenant endpoints
    const isTenantEndpoint = path.startsWith('/api/tenants/');
    const base = isTenantEndpoint ? (import.meta.env.VITE_API_BASE || 'http://localhost:8000') : API_BASE;
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };
    // For tenant endpoints, do not send Authorization header
    if (isTenantEndpoint) {
        delete headers['Authorization'];
    }
    const response = await fetch(`${base}${path}`, {
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
