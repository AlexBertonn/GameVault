import { Box, Heading } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import NewGameCard from "../components/ui/modals/NewGameCard";
import EditGameCard from "../components/ui/modals/EditGameCard";
import { useAuth } from "@/context/auth";
import { fetchGamesByUser } from "@/api/games";
import { IGame } from "@/types/games";
import GameCard from "@/components/ui/modals/GameCard";
import { Endpoints } from "@/constants/Endpoints";

export const Games = () => {
  const { logout, userId } = useAuth();

  const [games, setGames] = useState([]);

  const [isNewGameOpen, setIsNewGameOpen] = useState(false);
  const [isEditGameOpen, setIsEditGameOpen] = useState(false);
  const [ slectedGame, setSelectedGame ] = useState<IGame | null>(null);

  const handleEditGame = (game: IGame) => {
    setSelectedGame(game);  
    setIsEditGameOpen(true);
  }

  const handleDeleteGame = async (id: string) => {
    try {
      const response = await fetch(`${Endpoints.game}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if(response.ok) {
        console.log("Jogo deletado com sucesso!");}
      } catch (error) {
        console.log("Erro ao deletar jogo", error);}}



  const gameData = {
    image: "",
    name: "",
    description: "",
    rating: 0,
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
      <Box w="100%" h="100%" position="relative" bg="black">
        {isNewGameOpen && 
          <Box bg={"rgba(0, 0, 0, 0.87)"} position="fixed" w="100vw" h="100vh" zIndex="9999">
            <NewGameCard
            isNewGameOpen={isNewGameOpen}
            setIsNewGameOpen={setIsNewGameOpen}
            gameData={gameData}
            userId={userId}
            />
          </Box>
        }

        { games.length === 0 ? 
        
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >

          <Heading size="4xl" color="rgba(49, 49, 49, 0.67)">
            Nenhum jogo cadastrado!
          </Heading>

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
          <Button
            position="absolute"
            top="4"
            left="4"
            variant="outline"
            colorPalette="gray"
            onClick={() => {
              console.log(isNewGameOpen), setIsNewGameOpen(true);
            }}
          >
            + Novo Jogo
          </Button>
        </Box>
 :
        
        <Box
          display="flex"
          gap="10"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"		
          padding="100px"	
          >
          {games.map((game: IGame) => {
            return (
            <GameCard
            key={game.id}
            id={game.id}
            image={game.image}
            name={game.name}
            description={game.description}
            rating={game.rating}
            onClick={() => handleEditGame(game)}
            deleteGame={() => handleDeleteGame(game.id)}
            />
          )}
          )}
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
          <Button
            position="absolute"
            top="4"
            left="4"
            variant="outline"
            colorPalette="gray"
            onClick={() => {
              console.log(isNewGameOpen), setIsNewGameOpen(true);
            }}
          >
            + Novo Jogo
          </Button>
        </Box>
        }
        {isEditGameOpen && slectedGame && (
          <Box > 
            <EditGameCard
              isEditGameOpen={isEditGameOpen}
              setIsEditGameOpen={setIsEditGameOpen}
              gameData={slectedGame}
              userId={userId}
            />  
          </Box>
        )}
      </Box>
  );
};

export default Games;