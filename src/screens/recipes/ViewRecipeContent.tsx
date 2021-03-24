import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '@auth0/nextjs-auth0';

import { Recipe, RecipeRating } from 'wfd';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import RecipeHero from '~/components/Recipes/RecipeHero';
import RecipeMeta from '~/components/Recipes/RecipeMeta';
import IngredientList from '~/components/Recipes/IngredientList';
import Instructions from '~/components/Recipes/Instructions';

const useStyles = makeStyles((theme) => ({
  grid: {
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column-reverse'
    }
  }
}));

interface ViewRecipeContentProps {
  recipe: Recipe;
  authUserRating: RecipeRating;
}

const ViewRecipeContent: React.FC<ViewRecipeContentProps> = ({
  recipe,
  authUserRating
}: ViewRecipeContentProps) => {
  const classes = useStyles();

  const { user } = useUser();

  const [newRating, setNewRating] = useState(null);

  const onSubmitRating = (score: number) => {
    axios
      .post(`/api/recipes/rating/${recipe?.id}`, { score })
      .then((res) => setNewRating(res.data.data.score));
  };

  const computedUserRating = newRating || authUserRating?.score;

  return (
    <main>
      <Container maxWidth="xl">
        <RecipeHero
          image={recipe?.image}
          title={recipe?.title}
          description={recipe?.description}
          canEdit={recipe?.isAuthor}
        />
        <RecipeMeta
          readOnly={!user}
          rating={recipe?.currentRating}
          onSubmitRating={onSubmitRating}
          userRating={computedUserRating}
          author={recipe?.author}
          prepTime={recipe?.prepTime}
          cookingTime={recipe?.cookingTime}
          tags={recipe?.tags}
          difficulty={recipe?.difficulty}
        />
        <Grid container spacing={2} className={classes.grid}>
          <Grid item xs={12} lg={8}>
            <Instructions instructions={recipe?.instructions} />
          </Grid>
          <Grid item xs={12} lg={4}>
            <IngredientList ingredients={recipe?.ingredients} />
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};

export default ViewRecipeContent;
