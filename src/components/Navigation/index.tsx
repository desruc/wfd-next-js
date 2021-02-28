import React, { useState } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { useUser } from '@auth0/nextjs-auth0';

import Link from 'next/link';

import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import RestaurantRoundedIcon from '@material-ui/icons/RestaurantRounded';
import FaceIcon from '@material-ui/icons/Face';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import UserMenu from '~/components/Navigation/UserMenu';
import AuthMenu from '~/components/Navigation/AuthMenu';

const menuRoutes = [
  {
    key: 'recipes',
    label: 'Browse',
    to: '/',
    icon: RestaurantRoundedIcon,
    desktop: true,
    children: []
  },
  {
    key: 'your-recipes',
    label: 'Your recipes',
    to: '/recipes/me',
    icon: FaceIcon,
    desktop: false,
    children: []
  },
  {
    key: 'create-recipe',
    label: 'Create recipe',
    to: '/recipes/create',
    icon: AddCircleOutlineIcon,
    desktop: false,
    children: []
  }
];

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    backgroundColor: theme.palette.background.default,
    boxShadow: `inset 0 -1px 0 0 ${theme.palette.divider}`
  },
  title: {
    padding: '0rem 0.5rem'
  },
  icon: {
    transition: 'all 0.2s ease-in-out',
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1)
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerPaper: {
    backgroundColor: theme.palette.background.default
  },
  listItem: {
    cursor: 'pointer',
    width: 'auto',
    borderRadius: theme.shape.borderRadius,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1.25),
    transition: 'all 0.2s ease-in-out',
    minHeight: 45,
    '&:hover': {
      backgroundColor: theme.palette.primary.main
    }
  },
  listItemText: {
    fontSize: 14
  },
  activePath: {
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.primary.main
  },
  activeIcon: {
    color: theme.palette.secondary.main
  },
  desktopLinkWrap: {
    padding: '0rem 1rem'
  },
  desktopLink: {
    lineHeight: 1.2,
    fontWeight: 600,
    fontSize: 16,
    textDecoration: 'none',
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.primary.light
    }
  }
}));

const Navigation: React.FC = () => {
  const { user } = useUser();

  const classes = useStyles();

  const { pathname } = useRouter();

  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Box flex={1} display="flex" alignItems="center">
            <Hidden smUp>
              <IconButton
                color="inherit"
                aria-label={open ? 'collapse menu' : 'expand menu'}
                onClick={toggleDrawer}
                edge="start"
                className={classes.icon}
              >
                {open ? <ChevronLeftIcon /> : <MenuIcon />}
              </IconButton>
            </Hidden>
            <Typography color="textPrimary" className={classes.title}>
              wfd
            </Typography>
            <Hidden xsDown>
              {menuRoutes
                .filter(({ desktop }) => desktop)
                .map(({ key, label, to }) => (
                  <div key={key} className={classes.desktopLinkWrap}>
                    <Link href={to}>
                      <a className={classes.desktopLink}>{label}</a>
                    </Link>
                  </div>
                ))}
              {user && <UserMenu />}
            </Hidden>
          </Box>
          <AuthMenu />
        </Toolbar>
      </AppBar>
      <Hidden smUp>
        <Drawer
          id="mobile-drawer"
          variant="temporary"
          open={open}
          onClose={handleDrawerClose}
          ModalProps={{ keepMounted: true }}
          className={classes.drawer}
          anchor="left"
          classes={{ paper: classes.drawerPaper }}
        >
          <List>
            {menuRoutes.map(({ key, label, to, icon: Icon, children }) => {
              const active =
                to === pathname ||
                (children && children.some((p) => pathname.includes(p)));

              const listItemClass = cn({
                [classes.listItem]: true,
                [classes.activePath]: active
              });

              const listItemTextClass = cn({
                [classes.listItemText]: true,
                [classes.hide]: !open
              });

              const iconClass = cn({
                [classes.icon]: true,
                [classes.activeIcon]: active
              });

              return (
                <Link key={key} href={to}>
                  <ListItem className={listItemClass}>
                    <ListItemIcon>
                      <Icon className={iconClass} />
                    </ListItemIcon>
                    <ListItemText
                      primary={label}
                      className={listItemTextClass}
                      classes={{ primary: classes.listItemText }}
                    />
                  </ListItem>
                </Link>
              );
            })}
          </List>
        </Drawer>
      </Hidden>
    </>
  );
};

export default Navigation;
