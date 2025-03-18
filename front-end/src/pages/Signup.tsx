import { Button, Box, Stack, Text, Flex, Heading } from "@chakra-ui/react";
import InputField from "../components/ui/InputField.tsx";
import InputFieldPassword from "../components/ui/InputFieldPassword.tsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Endpoints } from "@/constants/Endpoints.ts";
import { useValidation } from "@/hooks/useValidation.ts";


export const Signup = () => {

  const [error, setError] = useState<{ [key: string]: string }>({});
  const { validateFormData } = useValidation();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const form = event.currentTarget as HTMLFormElement;
    const data = {
      name: form.names.value,
      email: form.email.value,
      password: form.password.value,
     } 
     const errors = validateFormData(data);
     

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios({method: 'post', url: Endpoints.signup, data: data});
        console.log('Cadastrado:', response.data);
        navigate('/login')
      } catch (errors) {
        console.error('Erro ao cadastrar:', errors);
        setError({
          ...error,
          email: 'Erro ao cadastrar, tente novamente.'
        });
      }
     } else {
      setError(errors);
    }
  }

  //ROTAS AQUI
  const navigate = useNavigate();
  const handleCancelClick = () => {
    navigate("/login");
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
              name="names"
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
              name="email"
            />
            {error.email && (
              <Text color="red.500" fontSize="sm">
                {error.email}
              </Text>
            )}
          </Box>

          <Box textAlign="left">
            <InputFieldPassword
              label="Senha"
              id="password"
              type="password"
              name="password"
            />
            {error.password && (
              <Text color="red.500" fontSize="sm">
                {error.password}
              </Text>
            )}
          </Box>

          <Stack direction="row" justify="right" mt={4}>
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
