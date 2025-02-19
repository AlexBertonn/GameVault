import { Button, Box, Stack, Text, Flex, Heading } from "@chakra-ui/react";
import Inputs from "./ui/InputField.tsx"; // Importe o seu componente 'Inputs'
import { useState } from "react";

interface FormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Funções de validação
function isEmail(value: string): boolean {
  return value.includes("@");
}
function isNotEmpty(value: string): boolean {
  return value.trim() !== "";
}
function hasMinLength(value: string, minLength: number): boolean {
  return value.length >= minLength;
}
function isEqualToOtherValue(value: string, otherValue: string): boolean {
  return value === otherValue;
}

export const Signup = () => {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<{ [key: string]: string }>({});

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setError((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  }

  function validateFormData(): boolean {
    const errorMessages: { [key: string]: string } = {};

    if (!isNotEmpty(formData.name)) {
      errorMessages.name = "Nome é obrigatório";
    }
    if (!isEmail(formData.email)) {
      errorMessages.email = "E-mail inválido";
    }
    if (!hasMinLength(formData.password, 6)) {
      errorMessages.password = "A senha deve ter pelo menos 6 caracteres";
    }
    if (!isEqualToOtherValue(formData.password, formData.confirmPassword)) {
      errorMessages.confirmPassword = "As senhas não coincidem";
    }

    setError(errorMessages);

    return Object.keys(errorMessages).length === 0;
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (validateFormData()) {
      console.log("Cadastro bem-sucedido:", formData);
    }
  }

  return (
    <Flex minH="100vh" align="center" justify="center">
      <Box p={8} boxShadow="sm" borderRadius="md" w="md" bg="#141414">
        <Heading size="lg" textAlign="left" mb={6}>
          Registre-se
        </Heading>
        <Text fontSize="md" mb={4} textAlign="left">
          Preencha os campos abaixo para criar sua conta.
        </Text>
        <Stack as="form" onSubmit={handleSubmit} >
          <Box textAlign="left">
            <Inputs
              label="Nome"
              id="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
            />
            {error.name && <Text color="red.500" fontSize="sm">{error.name}</Text>}
          </Box>

          <Box textAlign="left">
            <Inputs
              label="E-mail"
              id="email"
              type="text"
              value={formData.email}
              onChange={handleInputChange}
            />
            {error.email && <Text color="red.500" fontSize="sm">{error.email}</Text>}
          </Box>

          <Box textAlign="left">
            <Inputs
              label="Senha"
              id="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {error.password && <Text color="red.500" fontSize="sm">{error.password}</Text>}
          </Box>

          <Box textAlign="left">
            <Inputs
              label="Confirme sua senha"
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            {error.confirmPassword && (
              <Text color="red.500" fontSize="sm">{error.confirmPassword}</Text>
            )}
          </Box>

          <Stack direction="row" justify="space-between" mt={4}>
            <Button variant="outline" colorScheme="teal" onClick={() => console.log('Cancelar')}>
              Cancelar
            </Button>
            <Button variant="solid" colorScheme="blue" type="submit">
              Registrar
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Signup;
