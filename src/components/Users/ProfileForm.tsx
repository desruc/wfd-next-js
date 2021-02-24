import React from 'react';

import { ApiErrors } from 'wfd';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { useValidatedForm } from '~/validation';
import { updateProfile } from '~/validation/users';

import TextInput from '~/components/Inputs/TextInput';
import Button from '~/components/Inputs/Button';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(4)
  },
  checkboxContainer: {
    textAlign: 'center'
  },
  submitContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(4)
  }
}));

interface ProfileFormProps {
  firstName?: string;
  lastName?: string;
  saving?: boolean;
  apiErrors?: ApiErrors | null;
  onSubmit: (data: { firstName: string; lastName: string }) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  firstName,
  lastName,
  saving,
  apiErrors,
  onSubmit
}: ProfileFormProps) => {
  const classes = useStyles();

  const { register, handleSubmit, errors } = useValidatedForm(updateProfile);

  const computedErrors = errors || apiErrors;

  return (
    <Paper key={firstName} className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextInput
            inputRef={register}
            id="first-name-input"
            label="First name"
            name="firstName"
            defaultValue={firstName}
            errors={computedErrors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput
            inputRef={register}
            id="last-name-input"
            label="Last name"
            name="lastName"
            defaultValue={lastName}
            errors={computedErrors}
          />
        </Grid>
      </Grid>
      <div className={classes.submitContainer}>
        <Button
          onClick={handleSubmit(onSubmit)}
          loading={saving}
          disabled={saving}
        >
          Submit
        </Button>
      </div>
    </Paper>
  );
};

ProfileForm.defaultProps = {
  firstName: null,
  lastName: null,
  saving: false,
  apiErrors: null
};

export default ProfileForm;
