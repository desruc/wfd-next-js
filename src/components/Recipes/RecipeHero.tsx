import React from 'react';
import { useRouter } from 'next/router';
import { animated, useSpring, config } from 'react-spring';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import EditIcon from '@material-ui/icons/Edit';

import Hero from '~/components/Global/Hero';

const useStyles = makeStyles((theme) => ({
  section: {
    marginBottom: theme.spacing(2)
  },
  editButton: {
    color: theme.palette.background.paper,
    position: 'absolute',
    top: 10,
    right: 10
  },
  flex: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    margin: '0 auto'
  }
}));

interface RecipeHeroProps {
  image?: string;
  title: string;
  description?: string;
  canEdit: boolean;
}

const RecipeHero: React.FC<RecipeHeroProps> = ({
  image,
  title,
  description,
  canEdit
}: RecipeHeroProps) => {
  const classes = useStyles();

  const router = useRouter();

  const titleProps = useSpring({
    config: config.slow,
    from: { opacity: 0, transform: 'translate3d(0, -30px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' }
  });

  const onEdit = () => router.push(`/recipes/${router.query.recipeId}/edit`);

  return (
    <section className={classes.section}>
      <Hero image={image} blend>
        {canEdit && (
          <IconButton
            onClick={onEdit}
            className={classes.editButton}
            title="Edit recipe"
          >
            <EditIcon />
          </IconButton>
        )}
        <div className={classes.flex}>
          <animated.div style={titleProps}>
            <Typography variant="h1">{title}</Typography>
            {description && <Typography variant="h5">{description}</Typography>}
          </animated.div>
        </div>
      </Hero>
    </section>
  );
};

RecipeHero.defaultProps = {
  image: '',
  description: ''
};

export default RecipeHero;
