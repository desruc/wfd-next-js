export interface ApiErrors {
  [x: string]: string[];
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  rating: number;
  author: User;
  prepTime?: number;
  cookingTime?: number;
  public: boolean;
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
