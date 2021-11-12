import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

const BlueSwitch = withStyles({
    switchBase: {
      color: blue[300],
      '&$checked': {
        color: blue[500],
      },
      '&$checked + $track': {
        backgroundColor: blue[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SimpleAccordion(props) {
  const classes = useStyles();
 


  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Mostrar</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <FormGroup row>
      <FormControlLabel
        control={
          <BlueSwitch
            checked={props.state.region}
            onChange={props.handleChange}
            name="region"
            color="primary"
          />
        }
        label="Region"
      />
      <FormControlLabel
        control={
          <BlueSwitch
            checked={props.state.topicoambiental}
            onChange={props.handleChange}
            name="topicoambiental"
            color="primary"
          />
        }
        label="Topico ambiental"
      /><FormControlLabel
      control={
        <BlueSwitch
          checked={props.state.tipoinformacion}
          onChange={props.handleChange}
          name="tipoinformacion"
          color="primary"
        />
      }
      label="Tipo de informacion"
    /><FormControlLabel
    control={
      <BlueSwitch
        checked={props.state.quality}
        onChange={props.handleChange}
        name="quality"
        color="primary"
      />
    }
    label="Quality"
  /><FormControlLabel
  control={
    <BlueSwitch
      checked={props.state.descripcion}
      onChange={props.handleChange}
      name="descripcion"
      color="primary"
    />
  }
  label="Descripcion"
/>
     
    </FormGroup>
        </AccordionDetails>
      </Accordion>
  
    </div>
  );
}
