import React, { useState } from 'react';
import axios from 'axios';

import { User } from 'wfd';

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
    <div>
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
    </div>
  );
};

export default ProfileContent;
