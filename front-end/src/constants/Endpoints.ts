const baseUrl = 'http://localhost:8080';

export const Endpoints = {
  login: `${baseUrl}/auth/login`,
    signup: `${baseUrl}/user`,
    game: `${baseUrl}/game`,
    edit: (id: string) => `${baseUrl}/game/${id}`,
    delete: (id: string) => `${baseUrl}/game/${id}`,
}