import React,{useEffect,useState} from 'react'
import {Grid,makeStyles, Typography, Button,IconButton} from "@material-ui/core"
import Paper from '@material-ui/core/Paper';
import firebase from '../firebase/firebase'
import moment from 'moment' 
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import {Chip} from '@material-ui/core'
import "moment/locale/es"
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import Corazon from '@material-ui/icons/FavoriteBorder';
import Basurero from '@material-ui/icons/Delete';
import Lapiz from '@material-ui/icons/Create';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import {UsuarioContext} from "../Provedores/UsuarioContext"
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

 const  estilos = makeStyles((theme)=>({


    margen:{

            margin:"250px auto ",



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
    border:"1px solid #f0f0f0"
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
        position:"relative"
    },
    
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



 }))




const Buscarpaper = (props) => {
        const history = useHistory();

    const clases =estilos()

    const usuario =useContext(UsuarioContext)

    const [listapaper,setlistapaper]=useState([])
    const [paper, setpaper] = useState({})
    




 const listadepaper=(recientes)=>{


        

        try {
           
        if(!recientes){

          firebase.db.collection("paper").onSnapshot(manejarSnapshot)

        }else{
                firebase.db.collection("paper").orderBy("subida","desc").onSnapshot(manejarSnapshot)
                setlistapaper([])
        }

        } catch (error) {
                console.log(error)
        }
 }

 function manejarSnapshot(snapshot){
        const  lista =snapshot.docs.map(doc=>{
            return{
                id:doc.id,
                ...doc.data()
            }
        })
        setlistapaper(lista)    
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


 useEffect(() => {






   

 }, [props.recientes])



 
  const buscarChips=(valor)=>{
        history.push(`/tag/${valor}`)
      
  }      



const megusta=(valor)=>{

  
     var antiguoHaVotado=valor.haVotado
  

     if(antiguoHaVotado.includes(usuario.uid)){ 

        antiguoHaVotado=antiguoHaVotado.filter(function(obj){
                return obj!==usuario.uid
        })
        valor.likes=valor.likes-1
        firebase.db.collection("paper").doc(valor.id).update({
                ...valor,
                 likes:valor.likes,
                haVotado:antiguoHaVotado
        })
        
         setpaper({...valor,likes:valor.likes})
              

     }else{ 
     
     const nuevoHaVotado = [...antiguoHaVotado, usuario.uid];
     valor.likes=valor.likes+1   
firebase.db.collection("paper").doc(valor.id).update({
        ...valor,
         likes:valor.likes,
        haVotado:nuevoHaVotado
})

     setpaper({...valor,likes:valor.likes})
      }
}

    return (
        <div  className={clases.margen}>

                <Grid container>
                    <Grid  xs={12}>





                            {listapaper.map((valor)=>(






                                        <Paper className={clases.caja} elevation={3}>


                                        <Grid container  className={clases.contenedor}>

                                                <Grid xs={4}>
                                                        <div >

                                                             {valor.imagen==null?

                                                              <div className={clases.divFoto}>
                                                                        < AddAPhotoIcon className={clases.imgFoto}></AddAPhotoIcon>  
                                                                      
                                                              </div> :         
                                                           <div   style={{
                                                          backgroundImage:`url(${valor.imagen})`,
                                                           height:"160px",
                                                           width:"260px",
                                                           backgroundSize:"260px auto",
                                                           backgroundRepeat:"no-repeat",
                                                           backgroundPosition:"50%",
                                                           borderRadius:"0",
                                                           display:"block",
                                                           margin:"auto",
                                                           marginTop:"15px",
                                
                                                       
                                                        
                                                        }} >

                                                                
                                                                </div>

                                                             }   
                                                        </div>
                                                </Grid>


                                                <Grid xs={4}>


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
                                                //      <Link style={{textDecoration:"none"}} to={`/etiquetas/${valor}`}>   
                                                        <Chip variant="outlined"  onClick={()=>buscarChips(valor)} color="primary" size="small" label={valor} />
                                                //    </Link>
                                                                        ))}


                                                </Typography>



                                                </Grid>
                                        
                                                <Grid xs={4}>

                                                <Typography variant="subtitle1" align="center">

                                                                <Button onClick={()=>megusta(valor)}
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

                                                </Grid>



                                        </Grid>

                                        




                                        </Paper>


                            ))}
                     </Grid>             


                </Grid>


        </div>
    )
}

export default Buscarpaper
