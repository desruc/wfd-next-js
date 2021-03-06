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
  ingredients: string[];
  instructions: string;
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
