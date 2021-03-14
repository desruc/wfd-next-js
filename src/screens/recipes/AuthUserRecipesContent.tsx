import React from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';

import Link from 'next/link';

import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import AddRoundedIcon from '@material-ui/icons/AddRounded';

import { Typography } from '@material-ui/core';
import PageHeader from '~/components/Global/PageHeader';
import Button from '~/components/Inputs/Button';
import PaginatedRecipeCardList from '~/components/Recipes/PaginatedRecipeCardList';

const useStyles = makeStyles((theme) => ({
  bold: {
    fontWeight: 700
  },
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    transition: theme.transitions.create(['color'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    '&:hover': {
      color: theme.palette.secondary.main,
      textDecoration: 'underline'
    }
  }
}));

const AuthUserRecipesContent: React.FC = () => {
  const classes = useStyles();

  const router = useRouter();

  const { user } = useUser();

  const onCreateRecipe = () => router.push('/recipes/create');

  const headerAction = (
    <Button onClick={onCreateRecipe} startIcon={<AddRoundedIcon />}>
      Create Recipe
    </Button>
  );

  const noDataJsx = (
    <>
      <Typography align="center" className={classes.bold}>
        You haven&apos;t shared any recipes...
      </Typography>
      <Typography align="center">
        <Link href="/recipes/create">
          <a className={classes.link}>Click here to create your first!</a>
        </Link>
      </Typography>
    </>
  );

  return (
    <main>
      <Container maxWidth="xl">
        <PageHeader
          title="Your recipes"
          headerAction={user ? headerAction : null}
        />
        <PaginatedRecipeCardList
          url="/api/recipes/me"
          noDataComponent={noDataJsx}
        />
      </Container>
    </main>
  );
};

export default AuthUserRecipesContent;
