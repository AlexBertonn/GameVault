import { Button, Card, Stack } from "@chakra-ui/react";
import { ReactNode } from "react";

type ModalProps = {
  title: string;
  message: string;
  children: ReactNode; 
  onSubmit: () => void; 
  footerButtons?: ReactNode;
  onClose: () => void;
};

export const CustomModal = ({ title, message, children, onSubmit, onClose, footerButtons }: ModalProps) => {

  const handleSubmit = () => {
    onSubmit();
  }

  return (
    <Card.Root w="md">
      <Card.Header>
        <Card.Title>{title}</Card.Title>
        <Card.Description>{message}</Card.Description>
      </Card.Header>
      <Card.Body>
        <Stack gap="4" w="full">
          {children} 
        </Stack>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        {footerButtons || (
            <>
              <Button variant="outline" onClick={onClose}/>
              <Button variant="solid" onClick={handleSubmit} />
            </>
          )}
      </Card.Footer>
    </Card.Root>
  );
};

export default CustomModal;
