import React from 'react';

import Typography from '@material-ui/core/Typography';

interface InstructionsProps {
  instructions: string;
}

const Instructions: React.FC<InstructionsProps> = ({
  instructions
}: InstructionsProps) => (
  <>
    <Typography variant="h6">Instructions</Typography>
    {instructions}
  </>
);

export default Instructions;
