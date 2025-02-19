import { Button, Stack, Text, Flex, Box, Heading } from "@chakra-ui/react";
import Inputs from "./ui/InputField.tsx";  // Importe o seu componente 'Inputs'
import { useState } from "react";

interface FormState {
  email: string;
  password: string;
}

// Funções de validação
function isEmail(value: string): boolean {
  return value.includes("@");
}
function hasMinLength(value: string, minLength: number): boolean {
  return value.length >= minLength;
}

export const Login = () => {
  const [formData, setFormData] = useState<FormState>({
    email: "",
    password: "",
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
    if (!isEmail(formData.email)) {
      errorMessages.email = "E-mail inválido";
    }
    if (!hasMinLength(formData.password, 6)) {
      errorMessages.password = "Senha incorreta.";
    }

    setError(errorMessages);
    return Object.keys(errorMessages).length === 0;
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (validateFormData()) {
      console.log("Login bem-sucedido:", formData);
    }
  }

  return (
    <Flex minH="100vh" align="center" justify="center">
      <Box  p={8} boxShadow="sm" borderRadius="md" w="md" bg="#141414">
        <Heading size="lg" textAlign="left" mb={6}>
          Login
        </Heading>
        <Stack as="form" onSubmit={handleSubmit}>
          <Box textAlign="left">
            <Inputs
              label="E-mail"
              id="email"
              type="email"
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

          <Stack direction="row" justify="space-between" mt={4}>
            <Button variant="outline">Registrar-se</Button>
            <Button variant="solid"  type="submit">
              Entrar
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Login;
