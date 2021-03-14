import React, { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.background.paper
  },
  listItem: {
    padding: 0
  },
  paper: {
    background: theme.palette.background.default
  },
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    '&:hover': {
      color: theme.palette.secondary.light
    }
  }
}));

const UserMenu: React.FC = () => {
  const classes = useStyles();

  const { user, isLoading } = useUser();

  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = (e) => setAnchorEl(e.target);
  const closeMenu = () => setAnchorEl(null);

  const menuItems = [
    {
      label: 'Log in',
      link: '/api/auth/login',
      isAuthenticated: false
    },
    {
      label: 'Profile',
      link: '/account-settings',
      isAuthenticated: true
    },
    {
      label: 'Log out',
      link: '/api/auth/logout',
      isAuthenticated: true
    }
  ];

  const menuOpen = Boolean(anchorEl);

  const isAuthenticated = Boolean(user);

  return (
    <>
      <IconButton onClick={openMenu} disabled={isLoading}>
        <AccountCircleRoundedIcon className={classes.icon} />
      </IconButton>
      <Menu
        open={menuOpen}
        onClose={closeMenu}
        anchorEl={anchorEl}
        classes={{ paper: classes.paper }}
      >
        {menuItems
          .filter((i) => i.isAuthenticated === isAuthenticated)
          .map((item) => (
            <MenuItem key={item.label} className={classes.listItem}>
              <a href={item.link} className={classes.link}>
                {item.label}
              </a>
            </MenuItem>
          ))}
      </Menu>
    </>
  );
};

export default UserMenu;
