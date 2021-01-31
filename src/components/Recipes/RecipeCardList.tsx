import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import RecipeCard from '~/components/Recipes/RecipeCard';

const useStyles = makeStyles((theme) => ({
  list: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minMax(280px,1fr))',
    gridGap: '30px 15px',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center'
    }
  }
}));

interface Recipe {
  uuid: string;
  image: string;
  title: string;
  description: string;
}

interface RecipeCardListProps {
  recipes?: Recipe[];
  onRecipeClick?: () => void;
}

const RecipeCardList: React.FC<RecipeCardListProps> = ({
  recipes,
  onRecipeClick
}: RecipeCardListProps) => {
  const classes = useStyles();

  return (
    <div className={classes.list}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.uuid} recipe={recipe} onClick={onRecipeClick} />
      ))}
    </div>
  );
};

RecipeCardList.defaultProps = {
  recipes: [],
  onRecipeClick: null
};

export default RecipeCardList;
