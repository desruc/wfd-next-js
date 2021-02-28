import React from 'react';
import { useRouter } from 'next/router';

import { Recipe, User } from 'wfd';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

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
    <div>
      <UserHeader
        firstName={user?.firstName}
        lastName={user?.lastName}
        fullName={user?.fullName}
      />
      <Box marginBottom={4}>
        <Typography variant="h4">Recipes</Typography>
      </Box>
      <RecipeCardList recipes={recipes} onRecipeClick={onRecipeClick} />
    </div>
  );
};

export default UserRecipesContent;
