import { Button, Card, Input, SelectOpenChangeDetails, Stack, Text } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import React, { useState } from "react";

    interface FormState {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
    }

    function isEmail(value: string): boolean {
        return value.includes('@');
    }
    function isNotEmpty(value: string): boolean {
        return value.trim() !== '';
    }
    function hasMinLength(value: string, minLength: number): boolean {
        return value.length >= minLength;
    }
    function isEqualToOtherValue(value: string, otherValue: string): boolean {
        return value === otherValue;
    }

export const Signup = () => {

    const [formData, setFormData] = useState<FormState>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
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

        if (!isNotEmpty(formData.name)) {
            errorMessages.name = 'Nome é obrigatório';
        }
        if (!isEmail(formData.email)) {
            errorMessages.email = 'E-mail inválido';
        }
        if (!hasMinLength(formData.password, 6)) {
            errorMessages.password = 'A senha deve ter pelo menos 6 caracteres';
        }
        if (!isEqualToOtherValue(formData.password, formData.confirmPassword)) {
            errorMessages.confirmPassword = 'As senhas não coincidem';
        }

        setError(errorMessages);

        return Object.keys(errorMessages).length === 0;
    }

    return(
  <Card.Root w="lg">
    <Card.Header>
      <Card.Title>Registre-se</Card.Title>
      <Card.Description>
        Preencha os campos abaixo para criar sua conta.
      </Card.Description>
    </Card.Header>
    <Card.Body>
      <Stack gap="4" w="full" >
        <Field label="Nome">
          <Input 
            name='name'
            value={formData.name}
            onChange={handleInputChange}
          />
        {error.name && <Text color="red.500" fontSize='sm'>{error.name}</Text>}
        </Field>
        <Field label="E-mail">
          <Input 
            name='email'
            value={formData.email}
            onChange={handleInputChange}
          />
          {error.email && <Text color="red.500" fontSize='sm'>{error.email}</Text>}
        </Field>
        <Field label="Senha">
          <Input 
            name='password'
            value={formData.password}
            onChange={handleInputChange}
            type="password"
          />
          {error.password && <Text color="red.500" fontSize='sm'>{error.password}</Text>}
        </Field>
        <Field label="Confirme sua senha">
          <Input 
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleInputChange}
            type="password"
          />
          {error.confirmPassword && <Text color="red.500" fontSize='sm'>{error.confirmPassword}</Text>}
        </Field>
      </Stack>
    </Card.Body>
    <Card.Footer justifyContent="flex-end">
      <Button variant="outline">Cancelar</Button>
      <Button variant="solid" type="submit" onClick={handleSubmit}>Registrar</Button>
    </Card.Footer>
  </Card.Root>
  )
}
export default Signup;