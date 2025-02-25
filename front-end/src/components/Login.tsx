import { Button, Stack, Text, Flex, Box, Heading } from "@chakra-ui/react";
import InputField from "./ui/InputField.tsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isEmail } from "../validation/user-validation.ts";
import axios from "axios";
import { useAuth } from "@/context/auth.tsx";

interface FormState {
  email: string;
  password: string;
}

export const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState<FormState>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    login(formData).then(
      () => {
        navigate("/games");
      },
      (error) => {
        if (error.response.status === 401) {
          setError({ ...error, auth: "E-mail ou senha incorretos." });
        }
        if (error.response.status === 404) {
          setError({ ...error, auth: "Usuário não cadastrado." });
        }
        setIsLoading(false);
      }
    )
  }

  const navigate = useNavigate();
  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <Flex minH="100vh" align="center" justify="center">
      <Box p={8} boxShadow="sm" borderRadius="md" w="md" bg="#141414">
        <Heading size="lg" textAlign="left" mb={6}>
          Login
        </Heading>
        <Stack as="form" onSubmit={handleSubmit}>
          <Box textAlign="left">
            <InputField
              label="E-mail"
              id="email"
              type="email"
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
          </Box>

          {error.auth && (
            <Text color="red.500" fontSize="sm" mt={2}>
              {error.auth}
            </Text>
          )}

          <Stack direction="row" justify="space-between" mt={4}>
            <Button variant="outline" onClick={handleSignupClick}>
              Registrar-se
            </Button>
            <Button
              variant="solid"
              type="submit"
              loading={isLoading}
              loadingText="Entrando..."
            >
              Entrar
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Login;
