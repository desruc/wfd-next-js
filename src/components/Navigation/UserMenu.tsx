import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import Button from '~/components/Inputs/Button';

const useStyles = makeStyles((theme) => ({
  wrap: {
    borderLeft: `1px solid ${theme.palette.divider}`,
    paddingLeft: theme.spacing(1)
  },
  button: {
    color: theme.palette.background.paper,
    lineHeight: 1.2,
    fontWeight: 600,
    fontSize: 16
  },
  paper: {
    background: theme.palette.background.default
  },
  menuItem: {
    '&:hover': {
      color: theme.palette.secondary.light
    }
  }
}));

const UserMenu: React.FC = () => {
  const classes = useStyles();

  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = (e: React.MouseEvent) => setAnchorEl(e.target);

  const closeMenu = () => setAnchorEl(null);

  const onCreateRecipe = () => {
    closeMenu();
    router.push('/recipes/create');
  };

  const onYourRecipes = () => {
    closeMenu();
    router.push('/recipes/me');
  };

  const isOpen = Boolean(anchorEl);

  return (
    <div className={classes.wrap}>
      <Button
        color="inherit"
        variant="text"
        className={classes.button}
        aria-controls="user-menu"
        aria-haspopup="true"
        onClick={openMenu}
      >
        You
        <ArrowDropDownIcon />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={closeMenu}
        classes={{ paper: classes.paper }}
      >
        <MenuItem
          className={classes.menuItem}
          onClick={onYourRecipes}
          title="View your recipes"
        >
          Your recipes
        </MenuItem>
        <MenuItem
          className={classes.menuItem}
          onClick={onCreateRecipe}
          title="Create a new recipe"
        >
          Create recipe
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
