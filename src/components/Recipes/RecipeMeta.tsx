import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import StarRating from '~/components/Recipes/StarRating';

const useStyles = makeStyles((theme) => ({
  bold: {
    fontWeight: 700
  },
  text: {
    marginLeft: theme.spacing(0.5),
    fontSize: '0.75rem'
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    height: theme.spacing(3),
    width: theme.spacing(3)
  }
}));

interface RecipeMetaProps {
  rating?: number;
  user?: {
    firstName: string;
    lastName: string;
  };
  prepTime?: string;
  cookingTime?: string;
}

const RecipeMeta: React.FC<RecipeMetaProps> = ({
  rating,
  user,
  prepTime,
  cookingTime
}: RecipeMetaProps) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} sm={3}>
        <StarRating rating={rating} />
      </Grid>
      {user && (
        <Grid item xs={6} sm={3}>
          <Typography className={classes.flexCenter}>
            <Avatar className={classes.avatar} />
            <span className={classes.text}>
              {`${user?.firstName} ${user?.lastName}`}
            </span>
          </Typography>
        </Grid>
      )}
      {prepTime && (
        <Grid item xs={6} sm={3}>
          <Typography className={classes.flexCenter}>
            <span className={classes.bold}>{prepTime}</span>
            <span className={classes.text}>Prep time</span>
          </Typography>
        </Grid>
      )}
      {cookingTime && (
        <Grid item xs={6} sm={3}>
          <Typography className={classes.flexCenter}>
            <span className={classes.bold}>{cookingTime}</span>
            <span className={classes.text}>Cooking time</span>
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

RecipeMeta.defaultProps = {
  rating: 0,
  user: null,
  prepTime: '',
  cookingTime: ''
};

export default RecipeMeta;
