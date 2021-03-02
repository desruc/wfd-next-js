import React from 'react';
import { useRouter } from 'next/router';

import { Recipe, User } from 'wfd';

import UserHeader from '~/components/Users/UserHeader';
import RecipeCardList from '~/components/Recipes/RecipeCardList';

interface UserRecipesContentProps {
  recipes: Recipe[];
  user: User;
}

const UserRecipesContent: React.FC<UserRecipesContentProps> = ({
  recipes,
  user
}: UserRecipesContentProps) => {
  const router = useRouter();

  const onRecipeClick = ({ id: recipeId }) =>
    router.push(`/recipes/${recipeId}`);

  return (
    <main>
      <UserHeader
        firstName={user?.firstName}
        lastName={user?.lastName}
        fullName={user?.fullName}
      />
      <RecipeCardList
        title="Recipes"
        recipes={recipes}
        onRecipeClick={onRecipeClick}
      />
    </main>
  );
};

export default UserRecipesContent;
