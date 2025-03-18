import {  Input, InputProps,  } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"

type ModalProps = {
  label: string,
  id: string,
} & InputProps;

export const InputField = ({label, id, ...props}: ModalProps) => {

    return (
      
            <Field label={label}>  
              <Input id={id} name={id} {...props} />
            </Field>
)}
export default InputField;