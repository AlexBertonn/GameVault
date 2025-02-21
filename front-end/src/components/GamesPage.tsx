import { Box, Heading } from "@chakra-ui/react";

export const GamesPage = () => {
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
      </Box>
    </>
  );
};

export default GamesPage;
