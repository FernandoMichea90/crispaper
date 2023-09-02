import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { TextField, Box,Button, Typography } from '@material-ui/core';
import { Icon } from '@iconify/react';

const useStyles = makeStyles((theme) => ({
    modal:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',  
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #bdbdbd',
        borderRadius:"22px",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    marginSpan:{
        margin:"20px",
        width:"120px"
    },
    marginButton:{
        margin:"20px 20px 20px 0px"
    },
    colorVerIcono:{
        color:"#1e88e5",
        cursor:"pointer",
        margin:"5px"
    },
    padding:{
        padding:"5px 0px"
    }
  
}));

const Modal_Etiqueta_Tipo = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(true); // Changed React.useState to useState
    
    const handleClose = () => {
        setOpen(false); // Changed to directly set it to false
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            className={classes.modal}
        >
            <div className={classes.paper}>
                <h2 id="simple-modal-title">Tipo de Informacion</h2>
                <Box display="flex" flexDirection="column"> {/* Changed to column */}
                    <Box display="flex">
                        <span className={classes.marginSpan}>Descripcion</span>
                        <TextField fullWidth label="Ingrese el tipo de información" placeholder='Ej: Base de Datos' />
                    </Box>
                    <Box display="flex" flexDirection="column">
                        <Box display="flex" flexDirection="row">
                            <span className={classes.marginSpan}>Icono</span>
                            <TextField fullWidth label="Ingrese icono" placeholder='Ej: material-symbols:database' />
                        </Box>
                        
                        <a className={classes.colorVerIcono} href="https://icon-sets.iconify.design/" target='_blank'>
                            <Typography align='right'>
                                    <Icon icon="octicon:question-16" />               
                                    <span className={classes.padding}> Ver iconos</span>
                            </Typography>
                            
                        </a>

                    </Box>
                    <Box display="flex" justifyContent="flex-end" >
                        <Button className={classes.marginButton} variant='contained' color='secondary'>
                            Cancelar 
                        </Button>
                        <Button className={classes.marginButton} variant='contained' color='primary' >
                            Guardar
                        </Button>
                    
                    </Box>
                </Box>
            </div>
        </Modal>
    );
};

export default Modal_Etiqueta_Tipo;
