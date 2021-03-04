import React from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';

import { Recipe } from 'wfd';

import Container from '@material-ui/core/Container';
import AddRoundedIcon from '@material-ui/icons/AddRounded';

import PageHeader from '~/components/Global/PageHeader';
import Button from '~/components/Inputs/Button';
import RecipeCardList from '~/components/Recipes/RecipeCardList';

interface IndexProps {
  recipes: Recipe[];
}

const BrowseContent: React.FC<IndexProps> = ({ recipes }: IndexProps) => {
  const { user } = useUser();

  const router = useRouter();

  const onRecipeClick = ({ id: recipeId }) =>
    router.push(`/recipes/${recipeId}`);

  const onCreateRecipe = () => router.push('/recipes/create');

  const headerAction = (
    <Button onClick={onCreateRecipe} startIcon={<AddRoundedIcon />}>
      Create Recipe
    </Button>
  );

  return (
    <main>
      <Container maxWidth="xl">
        <PageHeader title="Browse" headerAction={user ? headerAction : null} />
        <RecipeCardList
          title="Recent recipes"
          recipes={recipes}
          onRecipeClick={onRecipeClick}
        />
      </Container>
    </main>
  );
};

export default BrowseContent;
