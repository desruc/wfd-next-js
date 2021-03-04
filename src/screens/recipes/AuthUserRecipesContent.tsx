import React from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';

import { Recipe } from 'wfd';

import Container from '@material-ui/core/Container';

import PageHeader from '~/components/Global/PageHeader';
import Button from '~/components/Inputs/Button';
import RecipeCardList from '~/components/Recipes/RecipeCardList';

interface AuthUserRecipesContentProps {
  recipes: Recipe[];
}

const AuthUserRecipesContent: React.FC<AuthUserRecipesContentProps> = ({
  recipes
}: AuthUserRecipesContentProps) => {
  const router = useRouter();
  const { user } = useUser();

  const onCreateRecipe = () => router.push('/recipes/create');

  const headerAction = (
    <>
      {user && (
        <Button variant="contained" color="primary" onClick={onCreateRecipe}>
          Create recipe
        </Button>
      )}
    </>
  );

  const onRecipeClick = ({ id: recipeId }) =>
    router.push(`/recipes/${recipeId}`);

  return (
    <main>
      <Container maxWidth="xl">
        <PageHeader title="Your recipes" headerAction={headerAction} />
        <RecipeCardList recipes={recipes} onRecipeClick={onRecipeClick} />
      </Container>
    </main>
  );
};

export default AuthUserRecipesContent;
