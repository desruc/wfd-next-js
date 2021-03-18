export interface ApiErrors {
  [x: string]: string[];
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  author: User;
  prepTime?: number;
  cookingTime?: number;
  public: boolean;
  isAuthor?: boolean;
  currentRating: number;
  createdAt: string;
  ingredients: { qty: string; name: string }[];
  instructions: string;
  originalUrl?: string;
  tags: string[];
  difficulty: 'easy' | 'moderate' | 'hard';
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
}

export interface RecipeRating {
  score: number;
}
