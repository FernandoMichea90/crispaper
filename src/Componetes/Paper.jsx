import React from 'react'
import {Paper as Papel,Grid,Typography,Chip,Button,IconButton,makeStyles,Link} from "@material-ui/core"
import Basurero from '@material-ui/icons/Delete';
import Lapiz from '@material-ui/icons/Create';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import Corazon from '@material-ui/icons/FavoriteBorder';
import moment from 'moment' 
import "moment/locale/es"
import { useState } from 'react';
import Swal from "sweetalert2"
import firebase from "../firebase/firebase"
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { useContext } from 'react';
import { UsuarioContext } from '../Provedores/UsuarioContext';
import { useHistory } from 'react-router-dom';


const  estilos = makeStyles((theme)=>({


    margen:{

            margin:"250px auto ",












    },
    caja:{
        position:"relative",
        width:"80vw",
        margin:"20px auto",
        display:"block",
        height:"228px",
        borderRadius:"10px",
    transition:"background-color .25s,color .25s,box-shadow .25s",
    boxShadow:"0 8px 42px -8px rgb(0 0 0 / 20%)",
    border:"1px solid #f0f0f0",
    [theme.breakpoints.down("md")]:{
        height:"unset"
    },




    "& .botoneditar":{
        background:"#1ab37c",
        color:"#ffffff",
     
        "&:hover": {
           background:"#ffffff",
           color:"#1ab37c !important",
         },


    },
    "& .botoneditar":{
        background:"#1ab37c",
        color:"#ffffff",
        marginTop:"10px",

        "&:hover": {
           background:"#ffffff",
           color:"#1ab37c !important",
         },


    }


    }

,
    titulo:{

        fontWeight:"500",
        fontFamily:"nunito"
    }
,

fecha:{
        fontWeight:"500",
        fontFamily:"nunito",
        paddingTop:"5px",
        color:"#717171"
},

contenedor:{
        margin:"18px auto"

},
resumen:{
        fontFamily:"nunito",
        margin:"15px auto"
},
diveditarborrar:{

        position:"absolute",
        top:"0",
        right:"0",
        width:"90px"
},
divFoto:{

    width:"250px",
    height:"160px",
    border:"2px dashed #21cbce",
    display:"block",
    margin:"16px auto",
    position:"relative",
    [theme.breakpoints.down("sm")]:{
        margin:"30px auto"
}
},

divImagen:{
       
        height:"160px",
        width:"260px",
        backgroundSize:"260px auto",
        backgroundRepeat:"no-repeat",
        backgroundPosition:"50%",
        borderRadius:"0",
        display:"block",
        margin:"auto",
        marginTop:"15px",
        [theme.breakpoints.down("sm")]:{
                marginTop:"30px"
        }
}
,
divTexto:{
        [theme.breakpoints.down("md")]:{

                margin:"0vw 5vw 0"
        },



        [theme.breakpoints.down("sm")]:{

                margin:"5vw 5vw 0"
        }
}
,


imgFoto:{
    color:"#21cbce",
    position:"absolute",
    margin:"auto",
    top:"0",
    bottom:"0",
    left:"0",
    right:"0",
    fontSize:"3rem"
}

,
    margenChip:{

        [theme.breakpoints.down("sm")]:{

                margin:"0px 4px"
        }
       
    }



 }))





const Paper = (props) => {
    const clases =estilos()
    const history = useHistory();
const usuario =useContext(UsuarioContext)

const [valor, setvalor] = useState(props.Paper)
const [paper, setpaper] = useState({})


const buscarChips=(valor)=>{
        history.push(`/tag/${valor}`)
      
    }      



const borrar=(e)=>{




    Swal.fire({
            title: 'Esta seguro que desea borrar el siguiente registro?',
            text:`${e.titulo}`,
            showDenyButton: true,
          
            confirmButtonText: `Borrar`,
            denyButtonText: `Cancelar`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                                    
                            firebase.db.collection("paper").doc(e.id).delete().then(() => {
                                    console.log("Document successfully deleted!");
                            }).catch((error) => {
                                    console.error("Error removing document: ", error);
                            });
              Swal.fire('Borrado!', '', 'success')
            } else if (result.isDenied) {
            
            }
          })

        
}


const megusta=async(valor)=>{

               
      console.log(valor)


        if(usuario==null) {
                return history.push("/login")
        }


        
          
         

        if(valor.haVotado==undefined){                    
                var antiguoHaVotado=[]
         }else{
                var antiguoHaVotado=valor.haVotado
         }

         console.log(antiguoHaVotado)
         console.log(usuario.uid)
         console.log(antiguoHaVotado.includes(usuario.uid))
     if(antiguoHaVotado.includes(usuario.uid)){ 

                antiguoHaVotado=antiguoHaVotado.filter(function(obj){
                        return obj!==usuario.uid
                })


                console.log(antiguoHaVotado)

                valor.likes=valor.likes-1
                await firebase.db.collection("paper").doc(valor.id).update({
                        ...valor,
                        likes:valor.likes,
                        haVotado:antiguoHaVotado
                })
                
                setpaper({...valor,likes:valor.likes})
              

     }else{ 
        
     const nuevoHaVotado = [...antiguoHaVotado, usuario.uid];
     console.log(nuevoHaVotado)
     valor.likes=valor.likes+1   
await firebase.db.collection("paper").doc(valor.id).update({
        ...valor,
         likes:valor.likes,
        haVotado:nuevoHaVotado
})

     setpaper({...valor,likes:valor.likes})
      }
}


    return (
        <div>
            




            <Papel className={clases.caja} elevation={3}>


<Grid container  className={clases.contenedor}>

        <Grid xs={12} sm={12} md={4}>
                <div>

                     {valor.imagen==null?


                    <div className={clases.divFoto}>
                    < AddAPhotoIcon className={clases.imgFoto}></AddAPhotoIcon>  

                    </div> 
                        
                      
                      
                      
                      :         
                   <div  className={clases.divImagen} style={{
                  backgroundImage:`url(${valor.imagen})`,
                   
                }} >

                        
                        </div>

                     }   
                </div>
        </Grid>


        <Grid xs={12} sm={12} md={5}>
        <div className={clases.divTexto}>             


        <Typography variant="h5" className={clases.titulo} >
                        {valor.titulo}             
        </Typography>

        <Typography className={clases.fecha} variant="subtitle2">
                        {moment(new Date(valor.subida.seconds*1000)).format("D MMM YYYY")}    
        </Typography>


        <Typography variant="body2" className={clases.resumen}>
                {valor.resumen}
        </Typography>

        <Typography variant="subtitle1">

                {valor.etiquetas.map((valor)=>(
                
                <Chip variant="outlined" className={clases.margenChip} onClick={()=>buscarChips(valor)} color="primary" size="small" label={valor} />
                     
                                ))}


        </Typography>


        </div>        
        </Grid>






        <Grid xs={12} sm={12} md={3}>

        <Typography variant="subtitle1" align="center">

                        <Button
                         onClick={()=>megusta(valor)}
                        style={{color:"#ff0000",
                        marginTop:"40px"
                }}
                        startIcon={<Corazon></Corazon>}
                        >

                                {valor.likes}
                        </Button>

        </Typography>


        <Typography variant="subtitle1" align="center">
        <a href={valor.pdf}  style={{textDecoration:"none"}} target="_blank">                                               
        <Button  className="botoneditar" variant="contained"
        
        startIcon={<InsertDriveFileIcon />}
        
        >

                pdf 
        </Button>

        </a>     

        </Typography>

          
        {usuario==null?


                                                      
<div></div>
:


usuario.administrador?

<div className={clases.diveditarborrar}>          

<Grid container>
        
         <Grid xs={6}>
        
                <Typography variant="subtitle1" align="center">
                        <Link to={`/editarpaper/${valor.id}`}>
                                <IconButton  variant="outlined" color="primary">
                                <Lapiz></Lapiz>
                                </IconButton>
                        </Link>

                </Typography>
        </Grid>
        <Grid  xs={6}>
                <Typography variant="subtitle1" align="center">

                <IconButton  variant="contained"  color="primary"  onClick={()=>borrar(valor)}>
                        <Basurero></Basurero>    
                </IconButton>

                </Typography>
        </Grid>
</Grid>
</div>                              

:
<div></div>

}  



        </Grid>



</Grid>






</Papel>


        </div>
    )
}

export default Paper
