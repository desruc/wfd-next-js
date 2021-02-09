import React, { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';

import IconButton from '@material-ui/core/IconButton';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const UserMenu: React.FC = () => {
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
      label: 'Sign up',
      link: '/api/auth/login',
      isAuthenticated: false
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
        <AccountCircleRoundedIcon />
      </IconButton>
      <Menu open={menuOpen} onClose={closeMenu} anchorEl={anchorEl}>
        {menuItems
          .filter((i) => i.isAuthenticated === isAuthenticated)
          .map((item) => (
            <MenuItem key={item.label}>
              <a href={item.link}>{item.label}</a>
            </MenuItem>
          ))}
      </Menu>
    </>
  );
};

export default UserMenu;
