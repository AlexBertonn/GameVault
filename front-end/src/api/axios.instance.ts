/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:8080';

// Interface opcional para respostas padronizadas da API (se necessário)
interface ApiResponse<T = any> {
  data: T;
  message?: string;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token automaticamente nas requisições
api.interceptors.request.use(
  (config: any): any => {
    const token = localStorage.getItem('token'); // Obtém o token do localStorage
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

// Interceptor para verificar a validade do token na resposta
api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>): AxiosResponse<ApiResponse> => {
    return response;
  },
  async (error: AxiosError): Promise<AxiosError> => {
    if (error.response && error.response.status === 401) {
      console.warn('Token inválido ou expirado. Redirecionando para login...');
      localStorage.removeItem('token'); // Remove o token inválido
      window.location.href = '/login'; // Redireciona para login
    }
    return Promise.reject(error);
  }
);

export default api;
