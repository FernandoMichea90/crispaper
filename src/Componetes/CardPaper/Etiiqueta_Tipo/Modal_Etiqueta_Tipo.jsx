import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { TextField, Box,Button, Typography } from '@material-ui/core';
import { Icon } from '@iconify/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { crearTagTipoDb } from '../../../firebase/firebase_db/TagTipo';
import LoadingButton from '../../Util/LoadingButton';


const validationSchema = Yup.object().shape({
    descripcion: Yup.string()
      .required('Campo obligatorio')
      .max(255, 'Máximo 255 caracteres permitidos'),
    icono: Yup.string()
      .required('Campo obligatorio'),
  });
  
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

const Modal_Etiqueta_Tipo = (props) => {
    const classes = useStyles();
    const open = useState(props.openModalTipo);
    const [cargando,setCargando]=useState(false)
  
    const handleClose = () => {
      props.handleCloseOpenModalTipo()
    };
  
    const formik = useFormik({
      initialValues: {
        descripcion: '',
        icono: '',
      },
      validationSchema,
      onSubmit: (values) => {
        // Handle form submission here
        console.log('Form values:', values);
        guardarTipoTag(values);
      },
    });

    const guardarTipoTag = async (TagTipo) => {
      try {
        // cargando 
        setCargando(true)
        const response = await crearTagTipoDb(TagTipo);
        if (response.status === 1) {
          setCargando(false);
          handleClose()
          // Éxito: El tipo de etiqueta se guardó con éxito
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: response.message,
          });
        } else {
          setCargando(false);
          handleClose()
          // Error al guardar el tipo de etiqueta
          Swal.fire({
            icon: "error",
            title: "Error",
            text: response.message,
          });
        }
      } catch (error) {
        setCargando(false);
        handleClose()
        // Error en la función
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al procesar la solicitud.",
        });
      }
    };
    
  
    return (
      <Modal
        open={props.openModalTipo}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <div className={classes.paper}>
          <h2 id="simple-modal-title">Tipo de Informacion</h2>
          <form onSubmit={formik.handleSubmit}>
            <Box display="flex" flexDirection="column">
              <Box display="flex">
                <span className={classes.marginSpan}>Descripcion</span>
                <TextField
                  fullWidth
                  label="Ingrese el tipo de información"
                  placeholder="Ej: Base de Datos"
                  name="descripcion"
                  value={formik.values.descripcion}
                  onChange={formik.handleChange}
                  error={formik.touched.descripcion && Boolean(formik.errors.descripcion)}
                  helperText={formik.touched.descripcion && formik.errors.descripcion}
                />
              </Box>
              <Box display="flex" flexDirection="column">
                <Box display="flex" flexDirection="row">
                  <span className={classes.marginSpan}>Icono</span>
                  <TextField
                    fullWidth
                    label="Ingrese icono"
                    placeholder="Ej: material-symbols:database"
                    name="icono"
                    value={formik.values.icono}
                    onChange={formik.handleChange}
                    error={formik.touched.icono && Boolean(formik.errors.icono)}
                    helperText={formik.touched.icono && formik.errors.icono}
                  />
                </Box>
  
                <a className={classes.colorVerIcono} href="https://icon-sets.iconify.design/" target="_blank">
                  <Typography align="right">
                    <Icon icon="octicon:question-16" />
                    <span className={classes.padding}> Ver iconos</span>
                  </Typography>
                </a>
              </Box>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  className={classes.marginButton}
                  variant="contained"
                  color="secondary"
                  onClick={handleClose}
                >
                  Cancelar
                </Button>
                <LoadingButton 
                  isLoading={cargando}
                  className={classes.marginButton}
                  submit={true}
                  ></LoadingButton>
              </Box>
            </Box>
          </form>
        </div>
      </Modal>
    );
  };
  
export default Modal_Etiqueta_Tipo;
