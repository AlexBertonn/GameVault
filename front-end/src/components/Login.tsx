import { Button, Card, Input, SelectOpenChangeDetails, Stack, Text } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import React, { useState } from "react";

    interface FormState {
        email: string;
        password: string;
    }

    function isEmail(value: string): boolean {
        return value.includes('@');
    }
    function hasMinLength(value: string, minLength: number): boolean {
        return value.length >= minLength;
    }


export const Login = () => {

    const [formData, setFormData] = useState<FormState>({
        email: '',
        password: '',
    });

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>){
        const {name, value}= event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));

        setError((prevErrors) => ({
            ...prevErrors,
            [name]: "", 
          }));

    }

    function handleSubmit(event: React.FormEvent){
        event.preventDefault();
        if(validateFormData()){

            console.log(formData)
        }
    }


    const [error, setError] = useState<{[key:string] : string}>({});

    function validateFormData(): boolean {
        const errorMessages: { [key: string]: string } = {};
        if (!isEmail(formData.email)) {
            errorMessages.email = 'E-mail inválido';
        }
        if (!hasMinLength(formData.password, 6)) {
            errorMessages.password = 'Senha incorretos.';
        }


        setError(errorMessages);

        return Object.keys(errorMessages).length === 0;
    }

    return(
  <Card.Root w="lg">
    <Card.Header>
      <Card.Title fontSize="md" >Acesse sua conta</Card.Title>
    </Card.Header>
    <Card.Body>
      <Stack gap="4" w="full" >
        <Field opacity={0.5} _hover={{ opacity: 1 }} label="E-mail">
          <Input 
            name='email'
            value={formData.email}
            onChange={handleInputChange}
          />
          {error.email && <Text color="red.500" fontSize='sm'>{error.email}</Text>}
        </Field>
        <Field opacity={0.5} _hover={{ opacity: 1 }} label="Senha">
          <Input 
            name='password'
            value={formData.password}
            onChange={handleInputChange}
            type="password"
          />
          {error.password && <Text color="red.500" fontSize='sm'>{error.password}</Text>}
        </Field>
      </Stack>
    </Card.Body>
    <Card.Footer justifyContent="flex-end">
      <Button variant="outline">Registrar-se</Button>
      <Button variant="solid" type="submit" onClick={handleSubmit}> Entrar</Button>
    </Card.Footer>
  </Card.Root>
  )
}
export default Login;