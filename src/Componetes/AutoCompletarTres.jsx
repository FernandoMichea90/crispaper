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





const crearEtiqueta=async(valor)=>{

  const id=await Firebase.db.collection("etiquetas").add({descripcion:valor,contar:0}).then((docRef) => {
    //console.log("Document written with ID: ", docRef.id);

    return docRef.id
})
return id
}

export default function Tags(props) {
  const classes = useStyles();
  const etiquetas=props.etiquetas
  const settag=props.settag
  const tag=props.tag
  const removerEtiqueta=props.removerEtiqueta
 //const [prueba1,setprueba1] =useState(["hola","chao"])
 const [prueba2,setprueba2] =useState(props.tag)
 const [prueba1,setprueba1] =useState([])
 const [tagdos, settagdos] = useState(props.tag)


 
   const recorrertag=()=>{
    

    
      let resultado=etiquetas.filter(({id:id1})=>tag.some(({id:id2})=>id2===id1))
      

    console.log(resultado)
    settagdos(resultado)
   }


   useEffect(() => {
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
         return  <TextField {...params}   variant="outlined" label="Etiquetas" placeholder="Etiquetas" />
        }}
      />
      </Grid>
      <Grid xs={2}>

      <IconButton color="primary"  onClick={()=>{
          Swal.fire({
     
            title: 'Ingrese nueva etiqueta',
            input:"text",
            showCancelButton:true,
            confirmButtonColor: '#21cbce',
            cancelButtonColor: '#d33',
            confirmButtonText:"Ingresar",
           preConfirm:(valor)=>{
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

             }

}             

          })
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
