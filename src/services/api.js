import axios from 'axios';

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';
const SITE_URL =
  process.env.REACT_APP_SITE_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* =========================
   Health Check
========================= */
export const healthCheck = async () => {
  const response = await api.get('/api/healthz');
  return response.data;
};

/* =========================
   Create Paste
========================= */
export const createPaste = async (pasteData) => {
  try {
    const requestData = { ...pasteData };

    // Match backend field name
    if (requestData.expiresInMinutes) {
      requestData.ttlSeconds = requestData.expiresInMinutes * 60;
      delete requestData.expiresInMinutes;
    }

    const response = await api.post('/api/pastes', requestData);

    return {
      ...response.data,
      url: `${SITE_URL}/p/${response.data.id}`,
    };
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data?.message || 'Failed to create paste'
      );
    }
    throw new Error('Server not reachable');
  }
};

/* =========================
   Get Paste
========================= */
export const getPaste = async (id, testNowMs = null) => {
  try {
    const headers = {};
    if (testNowMs) {
      headers['x-test-now-ms'] = testNowMs;
    }

    const response = await api.get(`/api/pastes/${id}`, { headers });
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('Paste not found');
    }
    throw new Error('Failed to load paste');
  }
};

export default api;