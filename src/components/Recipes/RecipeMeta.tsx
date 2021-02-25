import React from 'react';

import Link from 'next/link';

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
  author: {
    id: string;
    fullName: string;
  };
  prepTime?: string;
  cookingTime?: string;
  onSubmitRating?: (num: number) => void;
  userRating?: number;
  readOnly?: boolean;
}

const RecipeMeta: React.FC<RecipeMetaProps> = ({
  rating,
  author,
  prepTime,
  cookingTime,
  onSubmitRating,
  userRating,
  readOnly
}: RecipeMetaProps) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} sm={3}>
        <StarRating
          rating={rating}
          readOnly={readOnly}
          onChange={onSubmitRating}
          userRating={userRating}
        />
      </Grid>
      {author && (
        <Grid item xs={6} sm={3}>
          <Typography className={classes.flexCenter}>
            <Link href={`/recipes/u/${author.id}`}>
              <Avatar className={classes.avatar} />
            </Link>
            <Link href={`/recipes/u/${author.id}`}>
              <span className={classes.text}>{author?.fullName}</span>
            </Link>
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
  prepTime: '',
  cookingTime: '',
  readOnly: false,
  onSubmitRating: null,
  userRating: null
};

export default RecipeMeta;
