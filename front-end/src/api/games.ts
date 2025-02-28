import api from './axios.instance';

export const fetchGames = async () => {
  try {
    const response = await api.get('/game');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar jogo:', error);
  }
};

export const fetchGamesByUser = async (userId: string) => {
  try {
    const response = await api.get(`/game/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar jogo:', error);
  }
};
