export interface IGame {
  id: string;
  name: string;
  description: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  image: string;
  userId: string;
  isCompleted: boolean;
}
