import React from 'react';

import Link from 'next/link';

import { Recipe } from 'wfd';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Hero from '~/components/Global/Hero';

import { truncateString } from '~/utils/helpers';

const useStyles = makeStyles((theme) => ({
  wrap: {
    padding: `${theme.spacing(6)}px ${theme.spacing(18)}px`,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2)
    },
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center'
    }
  },
  card: {
    width: 320,
    minHeight: 320,
    cursor: 'pointer'
  },
  description: {
    fontSize: '0.875rem',
    fontWeight: 300
  }
}));

interface HomeHeroProps {
  recipe: Recipe;
}

const HomeHero: React.FC<HomeHeroProps> = ({ recipe }: HomeHeroProps) => {
  const classes = useStyles();

  const { title, description, id } = recipe || {};

  const recipeLink = `/recipes/${id}`;

  return (
    <Hero image={recipe?.image}>
      <div className={classes.wrap}>
        <Link href={recipeLink}>
          <Card className={classes.card} title="Go to recipe">
            <CardContent>
              {title && (
                <Typography noWrap gutterBottom variant="h5" component="h2">
                  {title}
                </Typography>
              )}
              {description && (
                <Typography className={classes.description}>
                  {truncateString(description, 125)}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Link>
      </div>
    </Hero>
  );
};

export default HomeHero;
