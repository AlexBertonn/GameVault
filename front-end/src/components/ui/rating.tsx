// src/components/ui/rating.tsx
import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa'; // Importando ícones de estrelas

interface RatingProps {
  name: string;
  value: number;
  onValueChange: (value: { value: number }) => void;
}

export const Rating: React.FC<RatingProps> = ({ name, value, onValueChange }) => {
  const handleClick = (newValue: number) => {
    onValueChange({ value: newValue });
  };

  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <label key={i} onClick={() => handleClick(i)} style={{ cursor: 'pointer' }}>
          {i <= value ? <FaStar /> : <FaRegStar />}
        </label>
      ))}
    </div>
  );
};
