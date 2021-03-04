import React, { useState } from 'react';
import axios from 'axios';

import { User } from 'wfd';

import Container from '@material-ui/core/Container';

import PageHeader from '~/components/Global/PageHeader';
import ProfileForm from '~/components/Users/ProfileForm';
import Snackbar from '~/components/Global/Snackbar';

interface ProfileContentProps {
  user: User;
}

interface UserPayload {
  firstName: string;
  lastName: string;
}

const ProfileContent: React.FC<ProfileContentProps> = ({
  user
}: ProfileContentProps) => {
  const [snackbarProps, setSnackbarProps] = useState({
    open: false,
    variant: 'success',
    content: 'Profile updated successfully'
  });

  const toggleSnackbar = () =>
    setSnackbarProps((p) => ({ ...p, open: !p.open }));

  const [saving, setSaving] = useState(false);

  const onSubmit = (data: UserPayload): void => {
    setSaving(true);
    axios.put('/api/user', data).then(() => {
      toggleSnackbar();
      setSaving(false);
    });
  };

  return (
    <main>
      <Container maxWidth="xl">
        <PageHeader title="Profile" />
        <ProfileForm
          onSubmit={onSubmit}
          firstName={user?.firstName || ''}
          lastName={user?.lastName || ''}
          saving={saving}
        />
        <Snackbar
          open={snackbarProps.open}
          variant={snackbarProps.variant}
          content={snackbarProps.content}
          handleClose={toggleSnackbar}
        />
      </Container>
    </main>
  );
};

export default ProfileContent;
