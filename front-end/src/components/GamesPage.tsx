import { Box, Heading } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NewGameCard from "./NewGameCard";
import EditGameCard from "./EditGameCard";
import { useAuth } from "@/context/auth";

export const GamesPage = () => {

  const { logout } = useAuth();

  const [isNewGameOpen, setIsNewGameOpen] = useState(false);
  const [isEditGameOpen, setIsEditGameOpen] = useState(false);
  const navigate = useNavigate();

  const handleEditClick = () => {
    setIsEditGameOpen(true);
  };

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
          <NewGameCard isNewGameOpen={isNewGameOpen} setIsNewGameOpen={setIsNewGameOpen} />
        </div>
        <div>
          <Button onClick={handleEditClick}>Editar</Button>
          <EditGameCard isOpen={isEditGameOpen} setIsOpen={setIsEditGameOpen} />
        </div>

      </Box>
    </>
  );
};

export default GamesPage;
