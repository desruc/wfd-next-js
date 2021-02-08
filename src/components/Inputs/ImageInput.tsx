import React, { useState, useEffect } from 'react';
import cn from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import PhotoCameraRoundedIcon from '@material-ui/icons/PhotoCameraRounded';

import TextInput from '~/components/Inputs/TextInput';
import Button from '~/components/Inputs/Button';

import usePrevious from '~/hooks/usePrevious';

const useStyles = makeStyles((theme) => ({
  hiddenImg: {
    display: 'none'
  },
  image: {
    height: 240,
    maxWidth: 480,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid transparent',
    cursor: 'pointer',
    margin: '0 auto'
  },
  inner: {
    opacity: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.shape.borderRadius,
    height: '100%',
    transition: theme.transitions.create('opacity', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    '&:hover': {
      opacity: 1
    },
    '& .MuiSvgIcon-root': {
      color: theme.palette.common.white
    }
  },
  visible: {
    opacity: 1
  },
  popover: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    '& .MuiFormControl-root': {
      minHeight: '0px !important'
    },
    '& .MuiButtonBase-root': {
      marginLeft: theme.spacing(1)
    }
  }
}));

interface ImageInputProps {
  src: string;
  onSave: (x: string) => void;
}

const ImageInput: React.FC<ImageInputProps> = ({
  src,
  onSave
}: ImageInputProps) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const openPopover = (e) => setAnchorEl(e.target);
  const closePopover = () => setAnchorEl(null);

  const [url, setUrl] = useState('');
  const prevSrc = usePrevious(src);
  const onUrlChange = (e) => setUrl(e.target.value);

  const [validSrc, setValidSrc] = useState(true);

  const onImageError = () => {
    setValidSrc(false);
    if (prevSrc && prevSrc.trim().length > 0) {
      onSave('');
    }
  };

  useEffect(() => {
    setValidSrc(true);
  }, [src]);

  const handleSave = () => {
    onSave(url);
    setUrl('');
    closePopover();
  };

  const computedValid = validSrc && src;
  const computedSrc = computedValid ? src : '/images/recipe-placeholder.png';

  const popoverOpen = Boolean(anchorEl);

  const innerClass = cn({
    [classes.inner]: true,
    [classes.visible]: popoverOpen
  });

  return (
    <>
      <img
        className={classes.hiddenImg}
        onError={onImageError}
        src={src}
        alt=""
      />
      <div
        className={classes.image}
        style={{ backgroundImage: `url(${computedSrc})` }}
        role="presentation"
      >
        <div className={innerClass}>
          <IconButton
            onClick={openPopover}
            title={src ? 'Change image' : 'Add image'}
          >
            <PhotoCameraRoundedIcon />
          </IconButton>
        </div>
      </div>
      <Popover
        open={popoverOpen}
        onClose={closePopover}
        anchorEl={anchorEl}
        PaperProps={{
          className: classes.popover
        }}
      >
        <TextInput
          id="image-url-input"
          label="Image Url"
          value={url}
          onChange={onUrlChange}
        />
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </Popover>
    </>
  );
};

export default ImageInput;
