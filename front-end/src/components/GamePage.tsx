import { useState } from "react";
import { Button } from "@chakra-ui/react";
import NewGameCard from "./NewGameCard";
import EditGameCard from "./EditGameCard";

export const GamePage = () => {
  const [isNewGameOpen, setIsNewGameOpen] = useState(false); // Estado do modal
  const [isEditGameOpen, setIsEditGameOpen] = useState(false); // Estado do modal

  const handleEditClick = () => {
    setIsEditGameOpen(true);  // Abre o modal de editar
  };

  return (
    
    <>
        <div>
            {/* Testando botão adicionar */}
            <Button onClick={() => setIsNewGameOpen(true)}>Adicionar Novo Jogo</Button>
            <NewGameCard isNewGameOpen={isNewGameOpen} setIsNewGameOpen={setIsNewGameOpen} />
        </div>
        <div>
            {/* Testando botão editar */}
            <Button onClick={handleEditClick}>Editar</Button>
            <EditGameCard isOpen={isEditGameOpen} setIsOpen={setIsEditGameOpen} />
        </div>
        
  </>
  );
};

export default GamePage;
