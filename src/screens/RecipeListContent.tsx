import React from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';

import Container from '@material-ui/core/Container';

import AddRoundedIcon from '@material-ui/icons/AddRounded';

import PageHeader from '~/components/Global/PageHeader';
import Button from '~/components/Inputs/Button';
import PaginatedRecipeCardList from '~/components/Recipes/PaginatedRecipeCardList';

interface RecipeListContentProps {
  pageTitle: string;
  recipeUrl: string;
}

const RecipeListContent: React.FC<RecipeListContentProps> = ({
  pageTitle,
  recipeUrl
}: RecipeListContentProps) => {
  const { user } = useUser();

  const router = useRouter();

  const onCreateRecipe = () => router.push('/recipes/create');

  const headerAction = (
    <Button onClick={onCreateRecipe} startIcon={<AddRoundedIcon />}>
      Create Recipe
    </Button>
  );

  return (
    <main>
      <Container maxWidth="xl">
        <PageHeader
          title={pageTitle}
          headerAction={user ? headerAction : null}
        />
        <PaginatedRecipeCardList url={recipeUrl} />
      </Container>
    </main>
  );
};

export default RecipeListContent;
