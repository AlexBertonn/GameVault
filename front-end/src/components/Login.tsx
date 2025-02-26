import { Button, Stack, Text, Flex, Box, Heading } from "@chakra-ui/react";
import InputField from "./ui/InputField.tsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth.tsx";

export const Login = () => {
  const { login } = useAuth();

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const fromData = new FormData(event.target as HTMLFormElement);
    const email = fromData.get("email") as string;
    const password = fromData.get("password") as string;  

    try	{
      await login({email, password});
      navigate("/games");
    } catch(error:any) {
        if (error.response.status === 401 || error.response.status === 404) {
          setError("Credenciais inválidas. Verifique seu e-mail e senha e tente novamente." );
        } else {
          setError("Erro ao fazer login. Tente novamente mais tarde.");
        }
      }
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
              name="email"
            />
          </Box>

          <Box textAlign="left">
            <InputField
              label="Senha"
              id="password"
              type="password"
              name="password"
            />
          </Box>

          {error && (
            <Text color="red.500" fontSize="sm" mt={2}>
              {error}
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
