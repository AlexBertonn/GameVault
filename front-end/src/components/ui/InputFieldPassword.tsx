import {  InputProps  } from "@chakra-ui/react"
import { PasswordInput } from "./password-input";
import { Field } from "@/components/ui/field"

type InputTest = {
  label: string,
  id: string,
} & InputProps;

export const InputFieldPassword = ({label, id, ...props}: InputTest) => {

    return (
      
            <Field label={label}>
              <PasswordInput  id={id} name={id} {...props} />
            </Field>
)}
export default InputFieldPassword;