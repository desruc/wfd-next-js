import React from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';

import Container from '@material-ui/core/Container';

import AddRoundedIcon from '@material-ui/icons/AddRounded';

import PageHeader from '~/components/Global/PageHeader';
import Button from '~/components/Inputs/Button';
import PaginatedRecipeCardList from '~/components/Recipes/PaginatedRecipeCardList';

const BrowseContent: React.FC = () => {
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
        <PageHeader title="Browse" headerAction={user ? headerAction : null} />
        <PaginatedRecipeCardList url="/api/recipes/public" />
      </Container>
    </main>
  );
};

BrowseContent.defaultProps = {
  totalRecipes: 0
};

export default BrowseContent;
