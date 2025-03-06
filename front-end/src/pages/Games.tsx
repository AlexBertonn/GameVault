import { Box, Heading } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewGameCard from "../components/ui/modals/NewGameCard";
import EditGameCard from "../components/ui/modals/EditGameCard";
import { useAuth } from "@/context/auth";
import { fetchGamesByUser } from "@/api/games";
import { IGame } from "@/types/games";
import GameCard from "@/components/ui/modals/GameCard";

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
    };
    fetchGames();
  }, []);

  return (
    <>
      <Box w="100vw" h="100vh" position="relative" bg="black">
        <Button
          position="absolute"
          top="4"
          right="4"
          variant="outline"
          colorPalette="gray"
          onClick={logout}
        >
          Deslogar
        </Button>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <div>
            <Button
              position="absolute"
              top="4"
              left="4"
              variant="outline"
              colorPalette="gray"
              onClick={() => setIsNewGameOpen(true)}
            >
              + Novo Jogo
            </Button>
            <NewGameCard
              isNewGameOpen={isNewGameOpen}
              setIsNewGameOpen={setIsNewGameOpen}
              gameData={gameData}
            />
          </div>
          <Heading size="4xl" color='rgba(49, 49, 49, 0.67)' >Nenhum jogo cadastrado!</Heading>
        </Box>

         {/* <div>
          <EditGameCard isOpen={isEditGameOpen} setIsOpen={setIsEditGameOpen} />
        </div>  */}

        <Box
          display="flex"
          gap='10'
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          {games.map((game: IGame) => (
            <GameCard
              key={game.id}
              id={game.id}
              image={game.image}
              name={game.name}
              description={game.description}
              rating={game.rating}
              onClick={handleEditClick}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Games;
