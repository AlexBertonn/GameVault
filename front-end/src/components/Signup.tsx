import { Button, Box, Stack, Text, Flex, Heading } from "@chakra-ui/react";
import InputField from "./ui/InputField.tsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  isEmail,
  isNotEmpty,
  hasMinLength,
  isEqualToOtherValue,
} from "../validation/user-validation.ts";
import { Endpoints } from "@/constants/Endpoints.ts";

interface FormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
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

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (validateFormData()) {
      try {
        const response = await axios.post(Endpoints.login, {
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
        console.log('Cadastrado:', response.data);
        navigate('/login')
      } catch (errors) {
        console.error('Erro ao cadastrar:', errors);
        setError({
          ...error,
          email: 'Erro ao cadastrar, teste novamente.'
        })
      }
    }
  }

  //ROTAS AQUI
  const navigate = useNavigate();
  const handleCancelClick = () => {
    navigate("/");
  };

  return (
    <Flex minH="100vh" align="center" justify="center">
      <Box p={8} boxShadow="sm" borderRadius="md" w="md" bg="#141414">
        <Heading size="lg" textAlign="left" mb={6}>
          Registre-se
        </Heading>
        <Text fontSize="md" mb={4} textAlign="left">
          Preencha os campos abaixo para criar sua conta.
        </Text>
        <Stack as="form" onSubmit={handleSubmit}>
          <Box textAlign="left">
            <InputField
              label="Nome"
              id="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
            />
            {error.name && (
              <Text color="red.500" fontSize="sm">
                {error.name}
              </Text>
            )}
          </Box>

          <Box textAlign="left">
            <InputField
              label="E-mail"
              id="email"
              type="text"
              value={formData.email}
              onChange={handleInputChange}
            />
            {error.email && (
              <Text color="red.500" fontSize="sm">
                {error.email}
              </Text>
            )}
          </Box>

          <Box textAlign="left">
            <InputField
              label="Senha"
              id="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {error.password && (
              <Text color="red.500" fontSize="sm">
                {error.password}
              </Text>
            )}
          </Box>

          <Box textAlign="left">
            <InputField
              label="Confirme sua senha"
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            {error.confirmPassword && (
              <Text color="red.500" fontSize="sm">
                {error.confirmPassword}
              </Text>
            )}
          </Box>

          <Stack direction="row" justify="space-between" mt={4}>
            <Button
              variant="outline"
              colorScheme="teal"
              onClick={handleCancelClick}
            >
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
