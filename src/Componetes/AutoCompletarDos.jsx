/* eslint-disable no-use-before-define */
import React from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import  { createFilterOptions } from '@material-ui/lab/Autocomplete';
import firebase from "../firebase/firebase"












const filter = createFilterOptions();


const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));

export default function Tags(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState([]);
  const etiquetas=props.etiquetas
  const settag=props.settag
  const tag =props.tag
  const [etiqueta, setetiqueta]  =React.useState({
    descripcion:""
  });  
  
  const agregarEtiquetas=(e)=>{
          

    try{
        alert(e)
      etiqueta.descripcion=e  
      firebase.db.collection('etiquetas').add(etiqueta);
      props.llamarEtiquetasDos()
    }catch(ex){
      console.log(ex);
      
    }

        

  }




  return (
    <div className={classes.root}>
     <Autocomplete
        multiple
        value={value}
        onChange={(e,f)=>{




         f.map((valor)=>{

        
         if(valor && valor.inputValue){

       

           

                setValue([...value,{
                    descripcion:valor.inputValue
                }]) 
    

                agregarEtiquetas(valor.inputValue)
           


         }else{

      
            setValue([...value,valor]) 

         }

        })

        }}
        id="tags-standard"
        options={etiquetas}
        getOptionLabel={(option) => option.descripcion}
        filterOptions={(options, params) => {
            const filtered = filter(options, params);
    
            // Suggest the creation of a new value
            if (params.inputValue !== '') {
              filtered.push({
                inputValue: params.inputValue,
                descripcion:`"agregar ${params.inputValue}"`,
              });
            }
            
            return filtered;
          }}
        renderInput={(params) =>{

        

         return <TextField
            {...params}
            variant="standard"
            label="Etiquetas"
            placeholder="Etiquetas"
          />}
        }
      />
     
     
    </div>
  );
}


// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
