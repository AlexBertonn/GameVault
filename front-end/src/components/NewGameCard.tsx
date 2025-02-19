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
type NewGameProps = {
  isNewGameOpen: boolean,
  setIsNewGameOpen: (value: boolean) => void;
}

export const NewGameCard = ({isNewGameOpen, setIsNewGameOpen} : NewGameProps) => {
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
    console.log("Novo card criado:", { ...formData, rating: data.rating });
    handleClose();
  });

  const handleClose = () => setIsNewGameOpen(false);

  if(!isNewGameOpen) return null;

  return (
    <CustomModal
      title="Adicinar Jogo"
      message="Compartilhe sua experiência e não deixe de avaliar o game. "
      onSubmit={onSubmit}
      onClose={handleClose}
      footerButtons={
        <>
          <Button variant="outline" onClick={handleClose} >Cancelar</Button>
          <Button variant="solid" onClick={onSubmit}>
            Adicionar Jogo
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

export default NewGameCard;
