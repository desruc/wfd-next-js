import React from 'react';

import { makeStyles, fade } from '@material-ui/core/styles';

interface UseStyleProps {
  color: string;
  image: string;
  blend: boolean;
  height: number;
}

const useStyles = makeStyles((theme) => ({
  wrap: (props: UseStyleProps) => ({
    position: 'relative',
    height: props.height,
    overflow: 'hidden',
    width: '100%'
  }),
  inner: (props: UseStyleProps) => ({
    position: 'absolute',
    height: props.height,
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
        : 'rgba(0,0,0,0.2)'
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
        : 'rgba(0,0,0,0.2)'
    }
  }),
  image: (props: UseStyleProps) => ({
    height: props.height,
    width: '100%',
    position: 'absolute',
    top: 0,
    objectFit: 'cover',
    objectPosition: 'center center'
  }),
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
  height?: number;
}

const Hero: React.FC<HeroProps> = ({
  image,
  color,
  children,
  blend,
  height
}: HeroProps) => {
  const classes = useStyles({ color, image, blend, height });

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
  blend: false,
  height: 500
};

export default Hero;
