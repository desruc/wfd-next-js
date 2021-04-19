import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  bold: {
    fontWeight: 600
  }
});

interface IngredientListProps {
  ingredients?: { qty: string; name: string }[];
}

const IngredientList: React.FC<IngredientListProps> = ({
  ingredients
}: IngredientListProps) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h6">Ingredients</Typography>
      <ul>
        {ingredients.map(({ qty, name }, idx) => (
          <li key={['ingredient', idx].join('')}>
            <span className={classes.bold}>{name}</span>
            {qty && <span> ({qty})</span>}
          </li>
        ))}
      </ul>
    </>
  );
};

IngredientList.defaultProps = {
  ingredients: []
};

export default IngredientList;
