import { Box, Heading } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewGameCard from "../components/ui/modals/NewGameCard";
import EditGameCard from "../components/ui/modals/EditGameCard";
import { useAuth } from "@/context/auth";
import { fetchGamesByUser } from "@/api/games";
import { IGame } from "@/types/games";

export const Games = () => {

  const { logout, userId } = useAuth();

  const [games, setGames] = useState([]);

  const [isNewGameOpen, setIsNewGameOpen] = useState(false);
  const [isEditGameOpen, setIsEditGameOpen] = useState(false);
  const navigate = useNavigate();

  const gameData = {
    title: "",
    description: "",
    rating: 0,
  };

  const handleEditClick = () => {
    setIsEditGameOpen(true);
  };

  useEffect(() => {
    const fetchGames = async () => {
      if (userId) {
        const response = await fetchGamesByUser(userId);
        setGames(response);
      }
    }
    fetchGames();
  }, [])

  return (
    <>
      <Box w="100vw" h="100vh" position="relative" bg="black">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Heading size="6xl">Você está na tela de jogos!!</Heading>
        </Box>

        <Button onClick={logout}>Deslogar</Button>

        <div>
          <Button onClick={() => setIsNewGameOpen(true)}>Adicionar Novo Jogo</Button>
          <NewGameCard isNewGameOpen={isNewGameOpen} setIsNewGameOpen={setIsNewGameOpen} gameData={gameData} />
        </div>
        <div>
          <Button onClick={handleEditClick}>Editar</Button>
          <EditGameCard isOpen={isEditGameOpen} setIsOpen={setIsEditGameOpen} />
        </div>

        {
          games.map((game: IGame) => (
            <Box key={game.id}>
              <img src={game.image} alt={game.name} />
              <Heading>{game.name}</Heading>
              <p>{game.description}</p>
              <p>{game.rating}</p>
            </Box>
          ))
        }

      </Box>
    </>
  );
};

export default Games;
