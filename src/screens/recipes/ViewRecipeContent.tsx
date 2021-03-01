import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '@auth0/nextjs-auth0';

import { Recipe, RecipeRating } from 'wfd';

import RecipeHero from '~/components/Recipes/RecipeHero';
import RecipeMeta from '~/components/Recipes/RecipeMeta';

interface ViewRecipeContentProps {
  recipe: Recipe;
  authUserRating: RecipeRating;
}

const ViewRecipeContent: React.FC<ViewRecipeContentProps> = ({
  recipe,
  authUserRating
}: ViewRecipeContentProps) => {
  const { user } = useUser();

  const [newRating, setNewRating] = useState(null);

  const onSubmitRating = (score: number) => {
    axios
      .post(`/api/recipes/rating/${recipe?.id}`, { score })
      .then((res) => setNewRating(res.data.data.score));
  };

  const computedUserRating = newRating || authUserRating?.score;

  return (
    <div>
      <RecipeHero
        image={recipe?.image}
        title={recipe?.title}
        description={recipe?.description}
        canEdit={recipe?.isAuthor}
      />
      <RecipeMeta
        readOnly={!user}
        rating={recipe?.rating}
        onSubmitRating={onSubmitRating}
        userRating={computedUserRating}
        author={recipe?.author}
        prepTime={recipe?.prepTime}
        cookingTime={recipe?.cookingTime}
      />
    </div>
  );
};

export default ViewRecipeContent;
