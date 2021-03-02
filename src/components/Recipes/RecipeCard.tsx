import React from 'react';
import { animated, useSpring } from 'react-spring';

import { Recipe } from 'wfd';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';

import StarRating from '~/components/Recipes/StarRating';

import { truncateString, computeTime } from '~/utils/helpers';

const useStyles = makeStyles((theme) => ({
  wrap: {
    display: 'flex',
    justifyContent: 'center'
  },
  hoverBg: {
    background: theme.palette.divider,
    borderRadius: theme.shape.borderRadius,
    width: 280
  },
  root: {
    width: 280,
    cursor: 'pointer'
  },
  media: {
    height: 150
  },
  contentWrap: {
    paddingBottom: `${theme.spacing(2)}px !important`
  },
  content: {
    height: 157,
    marginBottom: theme.spacing(2)
  },
  description: {
    fontSize: '0.875rem',
    fontWeight: 300
  },
  noRating: {
    fontSize: '0.75rem',
    fontWeight: 300,
    height: 24,
    display: 'flex',
    alignItems: 'center'
  },
  metaWrap: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(0.5)
  },
  meta: {
    fontSize: '0.875rem',
    fontWeight: 300,
    marginLeft: theme.spacing(0.5)
  }
}));

interface RecipeCardProps {
  recipe: Recipe;
  onClick?: (recipe: Recipe) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onClick
}: RecipeCardProps) => {
  const classes = useStyles();

  const [props, setProps] = useSpring(() => ({
    config: { mass: 1, tension: 350, friction: 25 },
    transform: 'translate3d(0px, 0px, 0px)'
  }));

  const onMouseEnter = () =>
    setProps({ transform: 'translate3d(10px, -10px, 10px)' });
  const onMouseLeave = () =>
    setProps({ transform: 'translate3d(0px, 0px, 0px)' });

  const handleClick = () => {
    if (onClick) onClick(recipe);
  };

  const { image, title, description, rating, cookingTime } = recipe;

  const computedImage = image || '/images/recipe-placeholder.png';

  return (
    <div className={classes.wrap}>
      <div
        className={classes.hoverBg}
        onClick={handleClick}
        role="presentation"
      >
        <animated.div
          style={props}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <Card className={classes.root} elevation={3}>
            <CardMedia className={classes.media} image={computedImage} />
            <CardContent className={classes.contentWrap}>
              <div className={classes.content}>
                <Typography gutterBottom variant="h5" component="h2">
                  {truncateString(title, 35)}
                </Typography>
                <Typography className={classes.description}>
                  {truncateString(description, 125)}
                </Typography>
              </div>
              <div>
                {rating ? (
                  <StarRating readOnly small rating={rating} />
                ) : (
                  <Typography className={classes.noRating}>
                    No rating yet
                  </Typography>
                )}
                <div className={classes.metaWrap}>
                  <QueryBuilderIcon />
                  <Typography className={classes.meta}>
                    {computeTime(cookingTime)}
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </animated.div>
      </div>
    </div>
  );
};

RecipeCard.defaultProps = {
  onClick: null
};

export default RecipeCard;
