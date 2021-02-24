import React, { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';

import PageHeader from '~/components/Global/PageHeader';
import ProfileForm from '~/components/Users/ProfileForm';
import Snackbar from '~/components/Global/Snackbar';

interface UserPayload {
  firstName: string;
  lastName: string;
}

const ProfileContent: React.FC = () => {
  const { data: userResponse } = useSWR('/api/user');

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
        firstName={userResponse?.data?.firstName}
        lastName={userResponse?.data?.lastName}
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
