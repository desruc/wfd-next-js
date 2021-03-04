import React from 'react';
import { useRouter } from 'next/router';

import { Recipe } from 'wfd';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';

import RecipeCardList from '~/components/Recipes/RecipeCardList';
import HomeHero from '~/components/Home/HomeHero';

const useStyles = makeStyles((theme) => ({
  cardList: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(2)
  }
}));

interface IndexProps {
  recipes: Recipe[];
}

const IndexContent: React.FC<IndexProps> = ({ recipes }: IndexProps) => {
  const classes = useStyles();

  const router = useRouter();

  const onRecipeClick = ({ id: recipeId }) =>
    router.push(`/recipes/${recipeId}`);

  const featuredRecipe = recipes ? recipes[0] : null;

  return (
    <main>
      <HomeHero recipe={featuredRecipe} />
      <Container maxWidth="xl">
        <section className={classes.cardList}>
          <RecipeCardList
            title="Recent Recipes"
            link="/browse"
            recipes={recipes}
            onRecipeClick={onRecipeClick}
          />
        </section>
        <Divider />
        <section className={classes.cardList}>
          <RecipeCardList
            title="Popular Recipes"
            link="/browse"
            recipes={recipes}
            onRecipeClick={onRecipeClick}
          />
        </section>
      </Container>
    </main>
  );
};

export default IndexContent;
