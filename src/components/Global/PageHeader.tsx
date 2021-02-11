import React, { ReactElement } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import UserMenu from '~/components/Global/UserMenu';

const useStyles = makeStyles({
  title: {
    flex: 1
  }
});

interface PageHeaderProps {
  title: string;
  headerAction?: ReactElement;
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
      <Box>
        {HeaderAction}
        <UserMenu />
      </Box>
    </Box>
  );
};

PageHeader.defaultProps = {
  headerAction: null
};

export default PageHeader;
