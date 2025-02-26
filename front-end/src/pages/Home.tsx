import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


export const Home = () => {

  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <>
      <Box w="100vw" h="100vh" position="relative" bg="black">
        <Button
          position="absolute"
          top="4"
          right="4"
          variant="outline"
          colorPalette="gray"
          onClick={handleLoginClick}
        >
          Logar
        </Button>

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Heading size="6xl">Bem-vindo ao Game Vault</Heading>
          <Text textStyle="lg" mt="3">
            Seu espaço para organizar e compartilhar sua jornada gamer!
          </Text>
          {/* <Text textStyle="lg" mt="3" textAlign="center">
            Adicione seus jogos, escreva descrições, deixe avaliações e marque seu progresso—zerado, jogando ou abandonado. <br />
            Chega de esquecer onde parou ou quais jogos já finalizou. Aqui, sua coleção fica do jeito que você quiser!
          </Text> */}
        </Box>
      </Box>
    </>
  );
};

export default Home;
