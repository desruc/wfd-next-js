import React from 'react';
import { animated, useSpring } from 'react-spring';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { truncateString } from '~/utils/helpers';

const useStyles = makeStyles((theme) => ({
  wrap: {
    display: 'flex',
    justifyContent: 'center'
  },
  hoverBg: {
    background: theme.palette.divider,
    borderRadius: theme.shape.borderRadius,
    width: 280,
    height: 320
  },
  root: {
    width: 280,
    height: 320,
    cursor: 'pointer'
  },
  media: {
    height: 150
  },
  description: {
    fontSize: '0.875rem',
    fontWeight: 300
  }
}));

interface Recipe {
  image: string;
  title: string;
  description: string;
}

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

  const { image, title, description } = recipe;

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
            <CardContent>
              <Typography noWrap gutterBottom variant="h5" component="h2">
                {title}
              </Typography>
              <Typography className={classes.description}>
                {truncateString(description, 125)}
              </Typography>
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
