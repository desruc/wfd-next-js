import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  section: {
    whiteSpace: 'pre-wrap'
  }
}));

interface InstructionsProps {
  instructions: string;
}

const Instructions: React.FC<InstructionsProps> = ({
  instructions
}: InstructionsProps) => {
  const classes = useStyles();

  return (
    <section className={classes.section}>
      <Typography variant="h6">Instructions</Typography>
      {instructions}
    </section>
  );
};

export default Instructions;
