import React from 'react';

import Typography from '@material-ui/core/Typography';

interface IngredientListProps {
  ingredients: string[];
}

const IngredientList: React.FC<IngredientListProps> = ({
  ingredients
}: IngredientListProps) => (
  <>
    <Typography variant="h6">Ingredients</Typography>
    <ul>
      {ingredients.map((ingredient) => (
        <li>{ingredient}</li>
      ))}
    </ul>
  </>
);

export default IngredientList;
