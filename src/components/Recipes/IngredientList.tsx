import React from 'react';

import Typography from '@material-ui/core/Typography';

interface IngredientListProps {
  ingredients?: string[];
}

const IngredientList: React.FC<IngredientListProps> = ({
  ingredients
}: IngredientListProps) => (
  <>
    <Typography variant="h6">Ingredients</Typography>
    <ul>
      {ingredients.map((ingredient, idx) => (
        <li key={['ingredient', idx].join('')}>{ingredient}</li>
      ))}
    </ul>
  </>
);

IngredientList.defaultProps = {
  ingredients: []
};

export default IngredientList;
