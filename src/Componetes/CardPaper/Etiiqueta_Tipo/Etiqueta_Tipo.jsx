import React, { useState, useEffect } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';



    var data = [{
        title : "Base de Datos",
        icono : "mdi:database"
    },
    {
        title : "Pagina Web",
        icono : "mdi:database"
    },
    {
        title : "Email",
        icono : "mdi:database"
    },
    {
        title : "Prueba",
        icono : "mdi:database"
    }



]


    const EditChip=(props,index)=>(
        <Chip variant="outlined" label={props.option.title} {...props} />
    )



    const Etiqueta_Tipo = () => {

    // etiquetas tipo 
    const [etiquetas,setEtiquetas]=useState(data);
    // tag useState 
    const [tag,setTag]=useState([]);



    useEffect(() => {

    }, [])
    return (
        <Autocomplete
      multiple
      id="tags-filled"
      options={etiquetas}
      value={tag}
      onChange={(event, newValue) => {
        if (newValue) {
          // Verifica si newValue y newValue[0].title están definidos antes de agregarlo a 'tag'
          setTag([...newValue]);
        }
      }}
      getOptionLabel={option => option.title}
      renderTags={(value, getTagProps) => {
        return value.map((option, index) => (
          <EditChip option={option} {...getTagProps({ index })} />
        ));
      }}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label="Tipo" placeholder="Tipo" />
      )}
    />
    )
}

export default Etiqueta_Tipo