import React from 'react';

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
    <>
      <Typography variant="h2" align="center">
        {computedName}
      </Typography>
      {!firstName && <Typography>This user hasn't supplied a name</Typography>}
    </>
  );
};

UserHeader.defaultProps = {
  firstName: '',
  lastName: ''
};

export default UserHeader;