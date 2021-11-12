import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: '100%',
    margin:'5px 0px'
  },
});

function valuetext(value) {
  
  return `${value}°C`;
}

export default function DiscreteSlider(props) {
  const classes = useStyles();
 // al cambiar el state 
 const handleChange=(evento,newvalue)=> {

    props.setpaper({...props.paper,likes:newvalue})
 }
  return (
    <div className={classes.root}>
      <Typography id="discrete-slider" gutterBottom>
        Quality
      </Typography>
      <Slider
        defaultValue={3}
        value={props.quality}
        getAriaValueText={valuetext}
        onChange={handleChange}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={0.5}
        marks
        min={0}
        max={10}
        valueLabelDisplay="on"
      />
     
    </div>
  );
}
