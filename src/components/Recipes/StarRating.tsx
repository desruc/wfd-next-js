import React, { useState } from 'react';
import cn from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import Typography from '@material-ui/core/Typography';

import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';

const useStyles = makeStyles((theme) => ({
  starContainer: {
    display: 'flex',
    alignItems: 'center',
    height: 24,
    color: yellow[600]
  },
  rating: {
    fontSize: 10,
    fontWeight: 300,
    color: theme.palette.text.primary
  },
  pointer: {
    cursor: 'pointer'
  },
  userRating: {
    marginLeft: 5,
    color: theme.palette.text.primary,
    fontSize: 10,
    fontWeight: 300
  },
  small: {
    height: 18,
    width: 18
  }
}));

interface StarRatingProps {
  rating?: number;
  userRating?: number;
  onChange?: (stars: number) => void;
  showRating?: boolean;
  readOnly?: boolean;
  small?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  userRating,
  onChange,
  showRating,
  readOnly,
  small
}: StarRatingProps) => {
  const classes = useStyles();

  const [hoverIdx, setHoverIdx] = useState(null);

  const onMouseOver = (idx: number) => {
    if (!readOnly) setHoverIdx(idx);
  };

  const onMouseLeave = () => {
    if (!readOnly) setHoverIdx(null);
  };

  const handleClick = (stars: number) => {
    if (onChange && !readOnly) onChange(stars);
  };

  const iconClass = cn({
    [classes.pointer]: !readOnly,
    [classes.small]: small
  });

  const computedRating = Math.round(rating);

  return (
    <div>
      <div className={classes.starContainer}>
        {[...new Array(5)].map((val, idx) => {
          if (
            typeof hoverIdx === 'number'
              ? hoverIdx >= idx
              : computedRating > idx
          ) {
            return (
              <StarRoundedIcon
                key={`star-${idx + 1}`}
                onMouseEnter={() => onMouseOver(idx)}
                onMouseLeave={onMouseLeave}
                className={iconClass}
                onClick={() => handleClick(idx + 1)}
                titleAccess={
                  readOnly ? `${computedRating} stars` : `${idx + 1} stars`
                }
              />
            );
          }
          return (
            <StarBorderRoundedIcon
              key={`star-${idx + 1}`}
              onMouseEnter={() => onMouseOver(idx)}
              onMouseLeave={onMouseLeave}
              className={iconClass}
              onClick={() => handleClick(idx + 1)}
              titleAccess={
                readOnly ? `${computedRating} stars` : `${idx + 1} stars`
              }
            />
          );
        })}
        {rating > 0 && showRating && (
          <Typography className={classes.rating}>{`(${rating})`}</Typography>
        )}
      </div>
      {userRating && (
        <Typography className={classes.userRating}>
          {`You gave it ${userRating} stars`}
        </Typography>
      )}
    </div>
  );
};

StarRating.defaultProps = {
  rating: 0,
  userRating: null,
  onChange: null,
  showRating: false,
  readOnly: false,
  small: false
};

export default StarRating;
