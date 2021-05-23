/* eslint-disable no-use-before-define */
import React ,{useEffect}from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import firebase from "../firebase/firebase"
const filter = createFilterOptions();

export default function FreeSoloCreateOption(props) {
  const [value, setValue] = React.useState(null);
  const [etiqueta, setetiqueta] = React.useState({
    descripcion:""
  });  

const agregarTag=props.settag
const removerEtiqueta=props.removerEtiqueta

    const agregarEtiquetas=(e)=>{
          

      try{

        etiqueta.descripcion=e  
        firebase.db.collection('etiquetas').add(etiqueta);
        props.llamarEtiquetasDos()
      }catch(ex){
        console.log(ex);
        
      }

          

    }



    useEffect(() => {
      
    }, [value])


    

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
            
        if (typeof newValue === 'string') {
          alert("paso por aca")
          setValue({
            title: newValue,
          });
         
        

        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            title: newValue.inputValue,
          });

          
            //agrega etiqueta en la base de datos 
          agregarEtiquetas(newValue.inputValue)

          setValue("")
        } else {
        
          try {



            agregarTag([...props.tag,{
              id:newValue.id,
              descripcion:newValue.descripcion
            }])

            removerEtiqueta(newValue)
            setValue("")   



          } catch (error) {
            
          }
          //agregar el tag                    

          //setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        // Suggest the creation of a new value
        if (params.inputValue !== '') {
          filtered.push({
            inputValue: params.inputValue,
            descripcion: `Agregar "${params.inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={props.etiquetas}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
        
          return option.inputValue;
        }
        // Regular option
       
        return option.descripcion;
      }}
      renderOption={(option) => option.descripcion}
      style={{ width: 300 }}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label="Etiquetas" variant="outlined" />
      )}
    />
  );
}

