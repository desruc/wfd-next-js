import React, { ReactElement } from 'react';

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
  headerAction?: ReactElement;
  marginTop?: number;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  headerAction: HeaderAction,
  marginTop
}: PageHeaderProps) => {
  const classes = useStyles();

  return (
    <Box
      marginBottom={4}
      marginTop={marginTop}
      display="flex"
      alignItems="center"
    >
      <Typography variant="h1" className={classes.title}>
        {title}
      </Typography>
      <Box>{HeaderAction}</Box>
    </Box>
  );
};

PageHeader.defaultProps = {
  headerAction: null,
  marginTop: 6
};

export default PageHeader;
