import React, { useState, useEffect } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import { listarTagTiposDb } from '../../../firebase/firebase_db/TagTipo';
import Swal from 'sweetalert2';
import { Icon } from '@iconify/react';
import { Box, makeStyles } from '@material-ui/core';
import "./Etiqueta_Tipo.css"
import IconOpenModal from './IconOpenModal';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: theme.spacing(1), // Ajusta el margen según sea necesario
  },
}));

const EditChip = (props) => {
  const classes = useStyles();
  if (!props.option) {
    return null; // O puedes manejar el caso de error de otra manera
  }

  return (
    <Chip
      variant="outlined"
      label={props.option.descripcion}
      icon={
        <Icon
          style={{ margin: "12px" }}
          icon={props.option.icono}
        />
      }
      {...props}
    />
  );
};



const Etiqueta_Tipo = (props) => {
  // inicializar estilos 
  const classes = useStyles();
  // etiquetas tipo 
  const [etiquetas, setEtiquetas] = useState([]);
  // tag useState 
  const [tag, setTag] = useState([]);

  // funcion para buscar las etiquetas 
  const obtenerTagTipo = async () => {
    const response = await listarTagTiposDb()
    return response;
  }


  useEffect(() => {
    obtenerTagTipo()
      .then((response) => {
        setEtiquetas(response.data);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al procesar la solicitud.",
        });
      });
  }, []);




  return (
    <Box display="flex" flexDirection="row" >
      <Box flexGrow={1} >
        <Autocomplete
          multiple
          id="tags-filled"
          options={etiquetas}
          value={tag}
          onChange={(event, newValue) => {
            if (newValue) {
              // Verifica si newValue y newValue[0].title están definidos antes de agregarlo a 'tag'
              setTag([newValue[newValue.length - 1]]);
            }
          }}
          getOptionLabel={option => option.descripcion}
          renderTags={(value, getTagProps) => {
            return value.map((option, index) => (
              <EditChip option={option} {...getTagProps({ index })} />
            ));
          }}
          renderOption={(option) => {
            return (<span className={classes.container}>  <Icon className={classes.icon} icon={option.icono} /> {option.descripcion} </span>)
          }

          }
          renderInput={(params) => (
            <>
              <TextField {...params} variant="outlined" label="Tipo" placeholder="Tipo" />
            </>

          )}
        />
      </Box>
      <IconOpenModal handleOpenModalTipo={props.handleOpenModalTipo} />
    </Box >
  )
}

export default Etiqueta_Tipo