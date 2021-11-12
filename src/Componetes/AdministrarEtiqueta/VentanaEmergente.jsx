import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Cargando from '../Cargando';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: '100px',
  },
  ventana:{
    width:'500px'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

 const  VentanaEmergente=(props)=>{

 

  return (
    <div>
      <Dialog  aria-labelledby="customized-dialog-title" open={props.open}>
        <DialogContent style={{margin:'0px 50px'}} dividers>
            <Cargando></Cargando>
         
          <Typography align="center" variant='h4' style={{margin:'50px 0px'}}>
           Editando Etiqueta
          </Typography>
        </DialogContent>
      
      </Dialog>
    </div>
  );
}
export default VentanaEmergente