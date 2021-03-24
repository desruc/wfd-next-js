import React from 'react';
import cn from 'classnames';

import Link from 'next/link';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

import StarRating from '~/components/Recipes/StarRating';

import { computeTime } from '~/utils/helpers';

const useStyles = makeStyles((theme) => ({
  wrap: {
    marginBottom: theme.spacing(2)
  },
  grid: {
    marginBottom: theme.spacing(1)
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
  },
  difficultyGrid: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1)
    }
  },
  list: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    '& li': {
      display: 'inline',
      '&:not(:last-child)': {
        marginRight: theme.spacing(1)
      }
    }
  },
  chip: {
    marginTop: theme.spacing(0.5)
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
  difficulty: string;
  tags?: string[];
  onSubmitRating?: (num: number) => void;
  userRating?: number;
  readOnly?: boolean;
}

const RecipeMeta: React.FC<RecipeMetaProps> = ({
  rating,
  author,
  prepTime,
  cookingTime,
  difficulty,
  tags,
  onSubmitRating,
  userRating,
  readOnly
}: RecipeMetaProps) => {
  const classes = useStyles();

  const computedPrepTime = computeTime(prepTime);

  const computedCookingTime = computeTime(cookingTime);

  const computedDifficulty = difficulty
    ? `${difficulty[0].toUpperCase()}${difficulty.slice(1)}`
    : '';

  return (
    <div className={classes.wrap}>
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
      <Grid container>
        {difficulty && (
          <Grid item xs={12} sm={3} className={classes.difficultyGrid}>
            <Typography>
              <span className={classes.text}>Difficulty:</span>{' '}
              <Link href={`/recipes/difficulty/${difficulty}`}>
                <a className={cn(classes.text, classes.author)}>
                  {computedDifficulty}
                </a>
              </Link>
            </Typography>
          </Grid>
        )}
        {tags.length > 0 && (
          <Grid item xs={12} sm={9}>
            <ul className={classes.list}>
              {tags.map((tag, idx) => (
                <li key={['tag', idx].join('-')}>
                  <Link href={`/recipes/tag/${tag}`}>
                    <Chip className={classes.chip} label={tag} />
                  </Link>
                </li>
              ))}
            </ul>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

RecipeMeta.defaultProps = {
  rating: 0,
  prepTime: 0,
  readOnly: false,
  onSubmitRating: null,
  userRating: null,
  tags: []
};

export default RecipeMeta;
