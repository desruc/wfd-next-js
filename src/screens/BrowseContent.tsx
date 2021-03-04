import React from 'react';
import { useRouter } from 'next/router';

import { Recipe } from 'wfd';

import Container from '@material-ui/core/Container';

import PageHeader from '~/components/Global/PageHeader';
import RecipeCardList from '~/components/Recipes/RecipeCardList';

interface IndexProps {
  recipes: Recipe[];
}

const BrowseContent: React.FC<IndexProps> = ({ recipes }: IndexProps) => {
  const router = useRouter();

  const onRecipeClick = ({ id: recipeId }) =>
    router.push(`/recipes/${recipeId}`);

  return (
    <main>
      <Container maxWidth="xl">
        <PageHeader title="Browse" />
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
