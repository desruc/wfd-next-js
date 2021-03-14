import React from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';

import { Recipe } from 'wfd';

import { makeStyles } from '@material-ui/core/styles';

import RecipeCard from '~/components/Recipes/RecipeCard';

const useStyles = makeStyles((theme) => ({
  list: {
    margin: '30px 0px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minMax(280px,1fr))',
    gridGap: '30px 15px',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center'
    }
  }
}));

interface NetworkRecipeCardListProps {
  url: string;
}

const NetworkRecipeCardList: React.FC<NetworkRecipeCardListProps> = ({
  url
}: NetworkRecipeCardListProps) => {
  const classes = useStyles();

  const router = useRouter();

  const { data } = useSWR(url);

  const recipes: Recipe[] = data?.data || [];

  const onRecipeClick = ({ id: recipeId }) =>
    router.push(`/recipes/${recipeId}`);

  return (
    <div className={classes.list}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} onClick={onRecipeClick} />
      ))}
    </div>
  );
};

export default NetworkRecipeCardList;
