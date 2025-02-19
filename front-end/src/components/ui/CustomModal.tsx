import { Button, Card, Input, Stack } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import InputField from './InputField.tsx'

type ModalProps = {
  title: string,
  message: string,
}

export const CustomModal = ({title, message,}: ModalProps) => {

    return (
      <Card.Root w="md">
        <Card.Header>
          <Card.Title>{title}</Card.Title>
          <Card.Description>
            {message}
          </Card.Description>
        </Card.Header>
        <Card.Body>
          <Stack gap="4" w="full">
              <InputField label="Nome" type="text" id="id" />
              <InputField label="Sobre-nome" type="text" id="id" />
          </Stack>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
          <Button variant="outline">Cancel</Button>
          <Button variant="solid">Sign in</Button>
        </Card.Footer>
      </Card.Root>
)}
export default CustomModal;