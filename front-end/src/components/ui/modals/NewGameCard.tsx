import CustomModal from "../CustomModal";
import InputField from "../InputField";
import { Button } from "@chakra-ui/react";

type NewGameProps = {
  isNewGameOpen: boolean;
  setIsNewGameOpen: (value: boolean) => void;
  gameData: { title: string; description: string; rating: number }; 
};

export const NewGameCard = ({ isNewGameOpen, setIsNewGameOpen, gameData }: NewGameProps) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.currentTarget as HTMLFormElement;
    const data = {
      title: form.titles.value,
      description: form.description.value,
      rating: Number(form.rating.value), 
    };

    console.log("Card criado com sucesso:", data);
    handleClose();
  };

  const handleClose = () => setIsNewGameOpen(false);

  if (!isNewGameOpen) return null;

  return (
    <CustomModal
      title="Nome do Jogo"
      message="Compartilhe sua experiência e não deixe de avaliar o game.."
      onSubmit={() => handleSubmit}
      onClose={handleClose}
      footerButtons={
        <>
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="solid" onClick={handleSubmit}>
            Editar
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <InputField
          label="Nome do Jogo"
          id="game-title"
          name="titles"
          defaultValue={gameData.title} 
        />
        <InputField
          label="Descrição"
          id="game-description"
          name="description"
          defaultValue={gameData.description} 
        />

        <div>
          <label>Avaliação</label>
          <input
            type="number"
            name="rating"
            defaultValue={gameData.rating}
            min={1}
            max={5}
          />
        </div>
      </form>
    </CustomModal>
  );
};

export default NewGameCard;
