import React from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

interface UserHeaderProps {
  firstName?: string;
  lastName?: string;
  fullName: string;
}

const UserHeader: React.FC<UserHeaderProps> = ({
  firstName,
  lastName,
  fullName
}: UserHeaderProps) => {
  const computedName = firstName && !lastName ? firstName : fullName;

  return (
    <Box marginTop={6}>
      <Typography variant="h2" align="center">
        {computedName}
      </Typography>
      {!firstName && (
        <Typography>This user hasn`&apos;`t supplied a name</Typography>
      )}
    </Box>
  );
};

UserHeader.defaultProps = {
  firstName: '',
  lastName: ''
};

export default UserHeader;
