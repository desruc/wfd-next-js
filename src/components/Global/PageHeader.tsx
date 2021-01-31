import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  title: {
    flex: 1
  }
});

interface PageHeaderProps {
  title: string;
  headerAction?: React.FC;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  headerAction: HeaderAction
}: PageHeaderProps) => {
  const classes = useStyles();

  return (
    <Box marginBottom={4} display="flex" alignItems="center">
      <Typography variant="h1" color="textPrimary" className={classes.title}>
        {title}
      </Typography>
      {HeaderAction && <Box>{HeaderAction}</Box>}
    </Box>
  );
};

PageHeader.defaultProps = {
  headerAction: null
};

export default PageHeader;
