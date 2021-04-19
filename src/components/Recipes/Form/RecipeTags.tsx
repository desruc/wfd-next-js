import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';

import TextInput from '~/components/Inputs/TextInput';
import Button from '~/components/Inputs/Button';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4)
  },
  flex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    marginLeft: theme.spacing(1.25)
  },
  list: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    '& li': {
      display: 'inline',
      '&:not(:last-child)': {
        marginRight: theme.spacing(1)
      }
    }
  },
  chip: {
    marginTop: theme.spacing(0.5)
  }
}));

interface RecipeTagsProps {
  tags: string[];
  onSubmit: (tag: string) => void;
  onRemove: (tag: string) => void;
}

const RecipeTags: React.FC<RecipeTagsProps> = ({
  tags,
  onSubmit,
  onRemove
}: RecipeTagsProps) => {
  const classes = useStyles();

  const [newTag, setNewTag] = useState('');

  const handleSubmit = () => {
    onSubmit(newTag.replace(',', '').trim());
    setNewTag('');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { value } = e.currentTarget;
    setNewTag(value);
  };

  const handleKeyPress: React.KeyboardEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => {
    const { key } = e;
    if ([',', 'Enter'].some((k) => k === key)) {
      handleSubmit();
    }
  };

  return (
    <Paper className={classes.paper}>
      <div className={classes.flex}>
        <TextInput
          id="new-recipe-tag"
          label="Tags"
          value={newTag}
          onChange={handleChange}
          onKeyUp={handleKeyPress}
          placeholder="Add a tag..."
        />
        <Button
          className={classes.btn}
          onClick={handleSubmit}
          disabled={!newTag}
          color="secondary"
        >
          Add
        </Button>
      </div>
      <ul className={classes.list}>
        {tags.map((tag, idx) => (
          <li key={['tag', idx].join('-')}>
            <Chip
              className={classes.chip}
              label={tag}
              onDelete={() => onRemove(tag)}
            />
          </li>
        ))}
      </ul>
    </Paper>
  );
};

export default RecipeTags;
