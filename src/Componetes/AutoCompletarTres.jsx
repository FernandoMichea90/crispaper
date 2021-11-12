/* eslint-disable no-use-before-define */
import React,{useState} from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useEffect } from 'react';
import { Grid ,IconButton} from '@material-ui/core';
import PostAddIcon from '@material-ui/icons/PostAdd';
import LabelIcon from '@material-ui/icons/Label';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Swal from "sweetalert2" 
import Firebase from "../firebase/firebase"
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin:"10px 0px"
  },
}));





export default function Tags(props) {
  const classes = useStyles();
  const etiquetas=props.etiquetas
  const settag=props.settag
  const tag=props.tag
 const [tagdos, settagdos] = useState(props.tag)


 
   const recorrertag=()=>{
   
  let resultado=etiquetas.filter(({id:id1})=>tag.some(({id:id2})=>id2===id1))
    settagdos(resultado)
   }


const crearEtiqueta=async(valor)=>{

  const id=await Firebase.db.collection(props.firebase).add({descripcion:valor,contar:0}).then((docRef) => {
    //console.log("Document written with ID: ", docRef.id);
    return docRef.id
})
console.log('creando')
props.llamarEtiquetasDos()
return id
}


   useEffect(() => {
     console.log('cambio')
    recorrertag()
   }, [props])

  return (
    <div className={classes.root}>
     <Grid container>
        <Grid xs={10}>

        
      <Autocomplete
        multiple
     
        id="tags-filled"
        options={etiquetas}
        value={tagdos}
        
        onChange={(event, newValue) => { 
                settag(newValue)
        }}
        getOptionLabel={option=>option.descripcion}
        renderTags={(value, getTagProps) =>{
          return value.map((option, index) => {
               return <Chip variant="outlined" label={option.descripcion } {...getTagProps({ index })} />
          })
        }}
        renderInput={(params) => {
         return  <TextField {...params}   variant="outlined" label={props.label} placeholder={props.label} />
        }}
      />
      </Grid>
      <Grid xs={2}>

      <IconButton color="primary"  onClick={async()=>{
         const {value:valor} =await Swal.fire({
     
            title: `Ingrese ${props.descripcion}`,
            input:"text",
            showCancelButton:true,
            confirmButtonColor: '#21cbce',
          
            cancelButtonColor: '#d33',
            confirmButtonText:"Ingresar",
            inputValidator: (value) => {
              if (!value) {
                return 'El campo no puede estar vacio!'
              }
            }
          })
          if(valor){ 

          var coincide=false 
          etiquetas.map((etiquet)=>{

            if(etiquet.descripcion==valor){
              coincide=true
              
            }
          })

         if(coincide){
          Swal.fire({
            icon:"info",
            title:"Ese registro ya esta disponible"
          })
         }else{
          const id = crearEtiqueta(valor)
          Swal.fire({
            icon:"success",
            title:"Nuevo Registro Creado"    

          })

         }}
      }}>
          {/* <PostAddIcon /> */}
          {/* <LabelIcon></LabelIcon> */}
          <AddCircleOutlineIcon></AddCircleOutlineIcon>
        </IconButton>
      </Grid>

</Grid>
    </div>
  );
}
