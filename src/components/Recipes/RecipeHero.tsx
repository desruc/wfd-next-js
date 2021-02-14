import React from 'react';
import { animated, useSpring, config } from 'react-spring';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Hero from '~/components/Global/Hero';

const useStyles = makeStyles({
  flex: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    margin: '0 auto'
  }
});

interface RecipeHeroProps {
  image?: string;
  title: string;
  description?: string;
}

const RecipeHero: React.FC<RecipeHeroProps> = ({
  image,
  title,
  description
}: RecipeHeroProps) => {
  const classes = useStyles();

  const titleProps = useSpring({
    config: config.slow,
    from: { opacity: 0, transform: 'translate3d(0, -30px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' }
  });

  return (
    <Hero image={image}>
      <div className={classes.flex}>
        <animated.div style={titleProps}>
          <Typography variant="h1">{title}</Typography>
          {description && <Typography variant="h5">{description}</Typography>}
        </animated.div>
      </div>
    </Hero>
  );
};

RecipeHero.defaultProps = {
  image: '/images/recipe-placeholder.png',
  description: ''
};

export default RecipeHero;
