import React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import UserHeader from '~/components/Users/UserHeader';
import RecipeCardList from '~/components/Recipes/RecipeCardList';

const UserRecipesContent: React.FC = () => {
  const router = useRouter();

  const { data: userRecipes } = useSWR(`/api/recipes/u/${router.query.userId}`);

  const { data } = useSWR(`/api/user/${router.query.userId}`);

  const onRecipeClick = ({ id: recipeId }) =>
    router.push(`/recipes/${recipeId}`);

  return (
    <div>
      <UserHeader
        firstName={data?.data?.firstName}
        lastName={data?.data?.lastName}
        fullName={data?.data?.fullName}
      />
      <Box marginBottom={4}>
        <Typography variant="h4">Recipes</Typography>
      </Box>
      <RecipeCardList
        recipes={userRecipes?.data}
        onRecipeClick={onRecipeClick}
      />
    </div>
  );
};

export default UserRecipesContent;
