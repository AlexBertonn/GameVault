import { Button, Stack, Text, Flex, Box, Heading, CloseButton} from "@chakra-ui/react";
import InputField from "../components/ui/InputField.tsx";
import InputFieldPassword from "../components/ui/InputFieldPassword.tsx";
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

    const form = event.currentTarget as HTMLFormElement;
    const data = {
      email: form.email.value,
      password: form.password.value,
    };
    try	{
      await login(data);
      navigate("/games");
    } catch(error:any) {
        if (error.response.status === 401 || error.response.status === 404) {
          setError("Credenciais inválidas. Verifique seu e-mail e senha e tente novamente." );
        } else {
          setError("Erro ao fazer login. Tente novamente mais tarde.");
        }
      } finally {
        setIsLoading(false);
      }
  }
  const navigate = useNavigate();
  const handleSignupClick = () => {
    navigate("/signup");
  };
  const handleClose = () => { 
    navigate("/");
  }

  return (
    <Flex minH="100vh" align="center" justify="center">
      <Box boxShadow="sm" borderRadius="md" w="md" bg="#141414">
        <Flex justifyContent={"right"} mr={2} mt={2} colorPalette={"gray"}>
          <CloseButton variant="ghost" size='sm' onClick={handleClose} />
        </Flex>
      <Box  p={8} pt={1}>
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
            <InputFieldPassword
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

          <Stack direction="row" mt={4} justifyContent="right">
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
      </Box></Box>
    </Flex>
  );
};

export default Login;
