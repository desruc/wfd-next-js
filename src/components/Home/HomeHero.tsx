import React from 'react';
import Link from 'next/link';
import { animated, useSpring } from 'react-spring';
import { format as formatDate } from 'date-fns';

import { Recipe } from 'wfd';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';

import Hero from '~/components/Global/Hero';
import StarRating from '~/components/Recipes/StarRating';

import { truncateString, computeTime } from '~/utils/helpers';

const useStyles = makeStyles((theme) => ({
  section: {
    marginBottom: theme.spacing(7)
  },
  container: {
    height: '100%'
  },
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
  animatedWrap: {
    [theme.breakpoints.up('sm')]: {
      width: '60%'
    },
    [theme.breakpoints.up('lg')]: {
      width: '40%'
    }
  },
  card: {
    cursor: 'pointer'
  },
  cardContent: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    minHeight: 250,
    marginBottom: theme.spacing(2)
  },
  description: {
    fontSize: '1.25rem',
    fontWeight: 300
  },
  avatar: {
    marginRight: theme.spacing(1)
  },
  author: {
    fontWeight: 600,
    width: 'fit-content',
    transition: 'all 0.1s ease-in-out',
    '&:hover': {
      color: theme.palette.secondary.main
    }
  },
  noRating: {
    fontSize: '0.75rem',
    fontWeight: 300,
    height: 24,
    display: 'flex',
    alignItems: 'center'
  },
  authorWrap: {
    paddingRight: theme.spacing(2)
  },
  metaText: {
    fontSize: '0.875rem',
    fontWeight: 300,
    marginLeft: theme.spacing(0.5)
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center'
  }
}));

interface HomeHeroProps {
  recipe: Recipe;
}

const HomeHero: React.FC<HomeHeroProps> = ({ recipe }: HomeHeroProps) => {
  const classes = useStyles();

  const [props, setProps] = useSpring(() => ({
    config: { mass: 1, tension: 350, friction: 25 },
    transform: 'translate3d(0px, 0px, 0px)'
  }));

  const onMouseEnter = () =>
    setProps({ transform: 'translate3d(3px, -3px, 3px)' });

  const onMouseLeave = () =>
    setProps({ transform: 'translate3d(0px, 0px, 0px)' });

  const {
    title,
    description,
    id,
    currentRating,
    cookingTime,
    author,
    createdAt
  } = recipe || {};

  const recipeLink = `/recipes/${id}`;

  return (
    <section className={classes.section}>
      <Hero image={recipe?.image} height={800}>
        <Container maxWidth="xl" className={classes.container}>
          <div className={classes.wrap}>
            <animated.div
              className={classes.animatedWrap}
              style={props}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              <Link href={recipeLink}>
                <Card className={classes.card} elevation={8}>
                  <CardContent className={classes.cardContent}>
                    <div className={classes.content}>
                      {title && (
                        <Typography gutterBottom variant="h2" component="h2">
                          {truncateString(title, 35)}
                        </Typography>
                      )}
                      {description && (
                        <Typography className={classes.description}>
                          {truncateString(description, 220)}
                        </Typography>
                      )}
                    </div>
                    <Grid container>
                      <Grid item xs={6}>
                        <div className={classes.authorWrap}>
                          <Typography noWrap className={classes.author}>
                            <Link href={`/recipes/u/${author?.id}`}>
                              <span
                                className={classes.author}
                                title="More recipes by author"
                              >
                                {author?.fullName}
                              </span>
                            </Link>
                          </Typography>
                          {createdAt && (
                            <Typography className={classes.metaText}>
                              {formatDate(new Date(createdAt), 'LLL do yyyy')}
                            </Typography>
                          )}
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        {currentRating ? (
                          <StarRating
                            readOnly
                            rating={currentRating}
                            showRating
                          />
                        ) : (
                          <Typography className={classes.noRating}>
                            No rating yet
                          </Typography>
                        )}
                        <div className={classes.flexCenter}>
                          <QueryBuilderIcon />
                          <Typography className={classes.metaText}>
                            {computeTime(cookingTime)}
                          </Typography>
                        </div>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Link>
            </animated.div>
          </div>
        </Container>
      </Hero>
    </section>
  );
};

export default HomeHero;
