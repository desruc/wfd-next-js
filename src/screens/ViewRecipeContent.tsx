import React, { useState } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useUser } from '@auth0/nextjs-auth0';

import RecipeHero from '~/components/Recipes/RecipeHero';
import RecipeMeta from '~/components/Recipes/RecipeMeta';

const ViewRecipeContent: React.FC = () => {
  const {
    query: { recipeId }
  } = useRouter();

  const { data: recipeResponse } = useSWR(`/api/recipes/${recipeId}`);

  const { data: ratingResponse } = useSWR(`/api/recipes/rating/${recipeId}`);

  const { user } = useUser();

  const [newRating, setNewRating] = useState(null);

  const onSubmitRating = (score: number) => {
    axios
      .post(`/api/recipes/rating/${recipeId}`, { score })
      .then((res) => setNewRating(res.data.data.score));
  };

  const recipe = recipeResponse?.data;

  const userRating = ratingResponse?.data?.score;

  const computedUserRating = newRating || userRating;

  return (
    <div>
      <RecipeHero
        image={recipe?.image}
        title={recipe?.title}
        description={recipe?.description}
      />
      <RecipeMeta
        readOnly={!user}
        rating={recipe?.rating}
        onSubmitRating={onSubmitRating}
        userRating={computedUserRating}
      />
    </div>
  );
};

export default ViewRecipeContent;
