import CustomModal from "./ui/CustomModal";
import InputField from "./ui/InputField";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Rating } from "@/components/ui/rating";
import { Field } from "@/components/ui/field";
import { Button } from "@chakra-ui/react";

const formSchema = z.object({
  rating: z.number({ required_error: "Rating is required" }).min(1).max(5),
});

type FormValues = z.infer<typeof formSchema>;
type EditGameProps = {
    isOpen: boolean,
    setIsOpen: (value: boolean) => void;
  }

export const EditGameCard = ({isOpen, setIsOpen} : EditGameProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rating: 0, 
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (value: number) => {
    setFormData((prev) => ({
      ...prev,
      rating: value,
    }));
  };

  const onSubmit = handleSubmit((data) => {
    console.log("Card editado com Sucesso", { ...formData, rating: data.rating });
    handleClose();
  });

  const handleClose = () => setIsOpen(false);

  if(!isOpen) return null;

  return (
    <CustomModal
      title="Editar" //Depois tem que passar aqui concatenado o nome do jogo puxando da API, exemplo ${gameData.title} sei la kkk.
      message="Altere os dados do card."
      onSubmit={onSubmit}
      onClose={handleClose}
      footerButtons={
        <>
          <Button variant="outline" onClick={handleClose}>Cancelar</Button>
          <Button variant="solid" onClick={onSubmit}>
            Editar
          </Button>
        </>
      }
      
    >
      <InputField
        label="Nome do Jogo"
        id="game-title"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
      />
      <InputField
        label="Descrição"
        id="game-description"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
      />
      
      
      <Field label="Avaliação" invalid={!!errors.rating} errorText={errors.rating?.message}>
        <Controller
          control={control}
          name="rating"
          render={({ field }) => (
            <Rating
              name={field.name}
              value={formData.rating}  
              onValueChange={({ value }) => {
                field.onChange(value);
                handleRatingChange(value); 
              }}
            />
          )}
        />
      </Field>
    </CustomModal>
  );
};

export default EditGameCard;
