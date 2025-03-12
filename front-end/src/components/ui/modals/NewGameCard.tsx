import { Button, Card, Stack, Box, Input } from "@chakra-ui/react";
import { NumberInputField, NumberInputRoot } from "@/components/ui/number-input";
import { Endpoints } from "@/constants/Endpoints.ts";

type NewGameProps = {
  isNewGameOpen: boolean;
  setIsNewGameOpen: (value: boolean) => void;
  gameData: { name: string; description: string; rating: number; image: string };
  userId: string | null;
};

export const NewGameCard = ({
  isNewGameOpen,
  setIsNewGameOpen,
  gameData,
  userId,
}: NewGameProps) => {

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.currentTarget as HTMLFormElement;
    const data = {
      name: form.names.value,
      description: form.description.value,
      rating: Number(form.rating.value),
      userId: userId,
    };

    try{
      const response = await fetch(Endpoints.game, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      });
      console.log('Cadastrado:', data);

      handleClose();
      if (!response.ok) {
        console.error("Erro ao criar card:", response.statusText);
        return;
      }
    } catch (error) {
      console.error("Erro ao criar card:", error);
    }
  };

  const handleClose = () => setIsNewGameOpen(false);

  if (!isNewGameOpen) return null;

  return (
    <Card.Root w="md" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 9999 }}>
      <Card.Header>
        <Card.Title>Adicionar Novo Jogo</Card.Title>
        <Card.Description>
          Compartilhe sua experiência e não deixe de avaliar o game.
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <Stack gap="4" w="full">
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Box gap='1' display='flex' flexDirection='column'>
              <label> Imagem URL</label>
                <Input
                  id="image"
                  name="image"
                  defaultValue={gameData.image}
                />
              </Box>
            <Box gap='1' display='flex' flexDirection='column'>
              <label> Nome do jogo</label>
                <Input
                  id="name"
                  name="names"
                  defaultValue={gameData.name}
                />
              </Box>
              <Box gap='1' display='flex' flexDirection='column'>
                  <label> Descrição</label>
                  <Input
                    id="description"
                    name="description"
                    defaultValue={gameData.description}
                    />
              </Box>
                <NumberInputRoot
                  name="rating"
                  defaultValue={gameData.rating}
                  width="200px"
                  min={1}
                  max={5}
                >
                  <NumberInputField />
                </NumberInputRoot>
              

            <Box display='flex' justifyContent="flex-end" gap={2}>
              <Button variant="outline" onClick={handleClose}>Cancelar</Button>
              <Button variant="solid" type="submit">Salvar</Button>
            </Box>
          </form>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};

export default NewGameCard;
