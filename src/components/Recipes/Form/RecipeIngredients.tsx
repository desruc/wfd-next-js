import React, { useState } from 'react';
import cn from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';

import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import RemoveCircleOutlinedIcon from '@material-ui/icons/RemoveCircleOutlined';

import { randomId } from '~/utils/helpers';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4)
  },
  labelRoot: {
    transform: 'none',
    fontSize: 14,
    fontWeight: 600,
    color: theme.palette.common.white
  },
  list: {
    listStyle: 'none',
    padding: `${theme.spacing(1)}px 0px`,
    margin: `${theme.spacing(2)}px 0px 0px`,
    [theme.breakpoints.up('lg')]: {
      height: 302,
      overflowY: 'auto'
    },
    '& .MuiSvgIcon-root': {
      fontSize: '1.25rem'
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#f7f7f7 !important'
    },
    '&::-webkit-scrollbar': {
      width: 5
    },
    '&::-webkit-scrollbar-thumb': {
      height: 174,
      borderRadius: 15,
      backgroundColor: '#a5a5a5'
    }
  },
  listItem: {
    padding: `${theme.spacing(1.5)}px ${theme.spacing(2)}px`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.grey[300],
    '&:not(:last-child)': {
      marginBottom: theme.spacing(1)
    }
  },
  inputListItem: {
    padding: `${theme.spacing(1.125)}px ${theme.spacing(2)}px !important`
  },
  inputWrap: {
    display: 'flex',
    '& .MuiIconButton-root': {
      marginLeft: theme.spacing(1.5)
    }
  },
  input: {
    fontSize: '0.875rem',
    padding: '0px 0px 5px'
  },
  addItem: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.secondary,
    userSelect: 'none',
    cursor: 'pointer',
    marginTop: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.grey[400]
    },
    '& .MuiSvgIcon-root': {
      marginRight: theme.spacing(1.5)
    },
    '& .MuiTypography-root': {
      fontSize: '0.875rem'
    }
  }
}));

interface RecipeIngredientsProps {
  showLabel?: boolean;
  ingredients: string[];
  onAdd: () => void;
  onChange: (e: React.FormEvent<HTMLInputElement>, idx: number) => void;
  onRemove: (idx: number) => void;
}

const RecipeIngredients: React.FC<RecipeIngredientsProps> = ({
  showLabel,
  ingredients,
  onAdd,
  onChange,
  onRemove
}: RecipeIngredientsProps) => {
  const classes = useStyles();

  const [editIdx, setEditIdx] = useState(0);

  const handleChange = (e: React.FormEvent<HTMLInputElement>, idx: number) => {
    setEditIdx(idx);
    onChange(e, idx);
  };

  const handleAdd = () => {
    setEditIdx(ingredients.length);
    onAdd();
  };

  const hasValues = ingredients.length > 0;

  const addMessage = `Add ${hasValues ? 'another' : 'an'} item`;

  return (
    <Paper className={classes.paper}>
      {showLabel && (
        <InputLabel shrink className={classes.labelRoot}>
          Ingredients
        </InputLabel>
      )}
      <ul className={classes.list}>
        {ingredients.map((value, index) => (
          <li
            key={randomId()}
            className={cn(classes.listItem, classes.inputListItem)}
          >
            <div className={classes.inputWrap}>
              <Input
                fullWidth
                classes={{ input: classes.input }}
                value={value}
                onChange={(e) => handleChange(e, index)}
                autoFocus={editIdx === index}
              />
              <IconButton
                onClick={() => onRemove(index)}
                size="small"
                title="Remove list item"
                aria-label="Remove list item"
              >
                <RemoveCircleOutlinedIcon />
              </IconButton>
            </div>
          </li>
        ))}
      </ul>
      <div
        className={cn(classes.listItem, classes.addItem)}
        title="Add list item"
        aria-label="Add list item"
        role="button"
        onClick={handleAdd}
        tabIndex={0}
        onKeyDown={handleAdd}
      >
        <AddCircleOutlinedIcon />
        <Typography>{addMessage}</Typography>
      </div>
    </Paper>
  );
};

RecipeIngredients.defaultProps = {
  showLabel: false
};

export default RecipeIngredients;
