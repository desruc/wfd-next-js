import React from 'react';

import { makeStyles, fade } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  wrap: {
    position: 'relative',
    height: 500,
    overflow: 'hidden',
    width: '100%'
  },
  inner: (props: { color: string; image: string; blend: boolean }) => ({
    position: 'absolute',
    height: 500,
    width: '100%',
    top: 0,
    zIndex: 0,
    '&:before': {
      content: "''",
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1,
      mixBlendMode: 'overlay',
      background: props.blend
        ? `linear-gradient(to top, rgba(0,0,0,0) 0%, ${
            props.color || theme.palette.secondary
          } 100%)`
        : 'rgba(0,0,0,0.4)'
    },
    '&:after': {
      content: "''",
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      backfaceVisibility: 'hidden',
      background: props.blend
        ? `linear-gradient(to bottom, ${fade(
            theme.palette.background.default,
            0.4
          )} 0%, ${theme.palette.background.default} 100%),
      linear-gradient(135deg, ${fade(
        theme.palette.background.default,
        0.4
      )} 40%, ${
            theme.palette.background.default
          } 100%), linear-gradient(-135deg, ${fade(
            theme.palette.background.default,
            0.4
          )} 40%, ${theme.palette.background.default} 100%)`
        : 'rgba(0,0,0,0.3)'
    }
  }),
  image: {
    height: 500,
    width: '100%',
    position: 'absolute',
    top: 0,
    objectFit: 'cover',
    objectPosition: 'center center'
  },
  children: {
    position: 'relative',
    zIndex: 1,
    height: '100%',
    width: '100%'
  }
}));

interface HeroProps {
  image?: string;
  color?: string;
  children?: React.ReactNode;
  blend?: boolean;
}

const Hero: React.FC<HeroProps> = ({
  image,
  color,
  children,
  blend
}: HeroProps) => {
  const classes = useStyles({ color, image, blend });

  const computedImage = image || '/images/recipe-placeholder.png';

  return (
    <div className={classes.wrap}>
      <div className={classes.inner}>
        <img
          className={classes.image}
          src={computedImage}
          alt="Hero background"
        />
        <div className={classes.children}>{children}</div>
      </div>
    </div>
  );
};

Hero.defaultProps = {
  image: '',
  color: '',
  children: null,
  blend: false
};

export default Hero;
