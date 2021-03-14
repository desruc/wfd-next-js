import React from 'react';
import { useRouter } from 'next/router';

import { Recipe, User } from 'wfd';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import UserHeader from '~/components/Users/UserHeader';
import RecipeCardList from '~/components/Recipes/RecipeCardList';

const useStyles = makeStyles({
  bold: {
    fontWeight: 700
  }
});

interface UserRecipesContentProps {
  recipes: Recipe[];
  user: User;
}

const UserRecipesContent: React.FC<UserRecipesContentProps> = ({
  recipes,
  user
}: UserRecipesContentProps) => {
  const classes = useStyles();

  const router = useRouter();

  const onRecipeClick = ({ id: recipeId }) =>
    router.push(`/recipes/${recipeId}`);

  return (
    <main>
      <Container maxWidth="xl">
        <UserHeader
          firstName={user?.firstName}
          lastName={user?.lastName}
          fullName={user?.fullName}
        />
        {!recipes.length ? (
          <Typography align="center" className={classes.bold}>
            This user has not shared any recipes...
          </Typography>
        ) : (
          <RecipeCardList
            title="Recipes"
            recipes={recipes}
            onRecipeClick={onRecipeClick}
          />
        )}
      </Container>
    </main>
  );
};

export default UserRecipesContent;
