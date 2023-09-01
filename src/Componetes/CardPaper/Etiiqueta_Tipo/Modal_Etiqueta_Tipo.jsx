import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { TextField, Box,Button } from '@material-ui/core';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
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
    }
  
}));

const Modal_Etiqueta_Tipo = () => {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle); // Changed React.useState to useState
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
        >
            <div style={modalStyle} className={classes.paper}>
                <h2 id="simple-modal-title">Tipo de Informacion</h2>
                <Box display="flex" flexDirection="column"> {/* Changed to column */}
                    <Box display="flex">
                        <span className={classes.marginSpan}>Descripcion</span>
                        <TextField fullWidth label="Ingrese el tipo de información" />
                    </Box>
                    <Box display="flex" flexDirection="column">
                        <Box display="flex" flexDirection="row">
                            <span className={classes.marginSpan}>Icono</span>
                            <TextField fullWidth label="Ingrese icono" />
                        </Box>
                        <a hrer="#">
                            Ver iconos
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
