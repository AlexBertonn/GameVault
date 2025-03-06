import { Button, Card, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";



interface GameCardProps {
  id: string;
  name: string;
  description: string;
  rating: number;
  image: string;
  onClick: () => void;
}

const GameCard = ({id, name, description, rating, image, onClick}: GameCardProps) => {
  return (
    <Card.Root maxW="sm"  overflow="hidden" id={id}>
      <Image src={image} alt={name} w='300px' h='300px' />
      <Card.Body gap="2">
        <Card.Title>{name}</Card.Title>
        <Card.Description>
          {description}
        </Card.Description>
        <div>
          <label>Avaliação</label>
          <p>{rating}</p>
        </div>
      </Card.Body>
      <Card.Footer gap="2">
        <Button variant="solid" onClick={onClick}>Edit</Button>
      </Card.Footer>
    </Card.Root>
  )
}
export default GameCard
