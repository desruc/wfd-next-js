import React from 'react';
import cn from 'classnames';

import Link from 'next/link';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import StarRating from '~/components/Recipes/StarRating';

import { computeTime } from '~/utils/helpers';

const useStyles = makeStyles((theme) => ({
  grid: {
    marginBottom: theme.spacing(4)
  },
  bold: {
    fontWeight: 700
  },
  text: {
    marginLeft: theme.spacing(0.5),
    fontSize: '0.75rem'
  },
  author: {
    width: 'fit-content',
    textDecoration: 'none',
    color: theme.palette.text.primary,
    transition: theme.transitions.create(['color'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    '&:hover': {
      color: theme.palette.secondary.main,
      textDecoration: 'underline'
    }
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    lineHeight: '120%'
  },
  avatar: {
    height: theme.spacing(3),
    width: theme.spacing(3),
    marginRight: theme.spacing(1)
  }
}));

interface RecipeMetaProps {
  rating?: number;
  author: {
    id: string;
    fullName: string;
  };
  prepTime?: number;
  cookingTime: number;
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

  const computedPrepTime = computeTime(prepTime);

  const computedCookingTime = computeTime(cookingTime);

  return (
    <Grid container spacing={2} className={classes.grid}>
      <Grid item xs={6} sm={3}>
        <StarRating
          rating={rating}
          showRating
          readOnly={readOnly}
          onChange={onSubmitRating}
          userRating={userRating}
        />
      </Grid>
      {author && (
        <Grid item xs={6} sm={3}>
          <Link href={`/recipes/u/${author.id}`}>
            <a
              className={cn(classes.flexCenter, classes.author)}
              title="View more by this user"
            >
              <Avatar className={classes.avatar} />
              <span className={classes.text}>{author?.fullName}</span>
            </a>
          </Link>
        </Grid>
      )}
      {prepTime && (
        <Grid item xs={6} sm={3}>
          <Typography className={classes.flexCenter}>
            <span className={classes.bold}>{computedPrepTime}</span>
            <span className={classes.text}>Prep time</span>
          </Typography>
        </Grid>
      )}
      {cookingTime && (
        <Grid item xs={6} sm={3}>
          <Typography className={classes.flexCenter}>
            <span className={classes.bold}>{computedCookingTime}</span>
            <span className={classes.text}>Cooking time</span>
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

RecipeMeta.defaultProps = {
  rating: 0,
  prepTime: 0,
  readOnly: false,
  onSubmitRating: null,
  userRating: null
};

export default RecipeMeta;
