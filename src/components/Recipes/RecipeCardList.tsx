import React from 'react';

import Link from 'next/link';

import { Recipe } from 'wfd';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import RecipeCard from '~/components/Recipes/RecipeCard';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
    transition: theme.transitions.create(['color'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    '&:hover': {
      textDecoration: 'underline',
      color: theme.palette.secondary.main
    }
  },
  list: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minMax(280px,1fr))',
    gridGap: '30px 15px',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center'
    }
  }
}));

interface RecipeCardListProps {
  title?: string;
  link?: string;
  recipes?: Recipe[];
  onRecipeClick?: (recipe: Recipe) => void;
}

const RecipeCardList: React.FC<RecipeCardListProps> = ({
  title,
  link,
  recipes,
  onRecipeClick
}: RecipeCardListProps) => {
  const classes = useStyles();

  return (
    <>
      {title && (
        <Box
          marginTop={2}
          marginBottom={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5">{title}</Typography>
          {link && (
            <Link href={link}>
              <a className={classes.link}>See more</a>
            </Link>
          )}
        </Box>
      )}
      <div className={classes.list}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} onClick={onRecipeClick} />
        ))}
      </div>
    </>
  );
};

RecipeCardList.defaultProps = {
  title: '',
  link: '',
  recipes: [],
  onRecipeClick: null
};

export default RecipeCardList;
