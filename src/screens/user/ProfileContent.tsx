import React, { useState } from 'react';
import axios from 'axios';

import { User } from 'wfd';

import Container from '@material-ui/core/Container';

import PageHeader from '~/components/Global/PageHeader';
import ProfileForm from '~/components/Users/ProfileForm';

import useSnackbar from '~/hooks/useSnackbar';

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
  const { openSnackbar } = useSnackbar();

  const [saving, setSaving] = useState(false);

  const onSubmit = (data: UserPayload): void => {
    setSaving(true);
    axios.put('/api/user', data).then(() => {
      openSnackbar('Profile updated successfully');
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
      </Container>
    </main>
  );
};

export default ProfileContent;
