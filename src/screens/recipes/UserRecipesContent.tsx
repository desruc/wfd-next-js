import React from 'react';

import { User } from 'wfd';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import UserHeader from '~/components/Users/UserHeader';
import PaginatedRecipeCardList from '~/components/Recipes/PaginatedRecipeCardList';

const useStyles = makeStyles({
  bold: {
    fontWeight: 700
  }
});

interface UserRecipesContentProps {
  user: User;
}

const UserRecipesContent: React.FC<UserRecipesContentProps> = ({
  user
}: UserRecipesContentProps) => {
  const classes = useStyles();

  const noDataJsx = (
    <Typography align="center" className={classes.bold}>
      This user has not shared any recipes...
    </Typography>
  );

  return (
    <main>
      <Container maxWidth="xl">
        <UserHeader
          firstName={user?.firstName}
          lastName={user?.lastName}
          fullName={user?.fullName}
        />
        <PaginatedRecipeCardList
          url={`/api/recipes/u/${user?.id}`}
          noDataComponent={noDataJsx}
        />
      </Container>
    </main>
  );
};

export default UserRecipesContent;
