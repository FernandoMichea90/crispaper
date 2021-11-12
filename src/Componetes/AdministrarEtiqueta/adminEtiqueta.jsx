import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export default function ContinuousSlider(props) {
  const classes = useStyles();


  const handleChange = (event, newValue) => {
  props.settransparencia(newValue);
  };

  return (
    <div className={classes.root}>
  
      <Grid container spacing={2}>
       
        <Grid item xs>
          <Slider value={props.transparencia} onChange={handleChange} aria-labelledby="continuous-slider" />
        </Grid>
        
      </Grid>
    
    </div>
  );
}
