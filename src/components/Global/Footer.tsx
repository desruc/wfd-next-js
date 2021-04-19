import React from 'react';
import Link from 'next/link';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: theme.spacing(8),
    padding: `${theme.spacing(4)}px 0px`,
    backgroundColor: 'transparent',
    color: `${theme.palette.text.primary} !important`,
    textAlign: 'right'
  },
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    fontWeight: 700,
    transition: theme.transitions.create(['color'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    '&:hover': {
      color: theme.palette.secondary.main,
      textDecoration: 'underline'
    }
  }
}));

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="xl">
        <Typography>
          Developed by{' '}
          <Link href="https://www.jmscmrn.com">
            <a className={classes.link}>James Cameron</a>
          </Link>
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
