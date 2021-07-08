import React from 'react'
import {Paper as Papel,Grid,Typography,Chip,Button ,CircularProgress ,IconButton,makeStyles,Link} from "@material-ui/core"
import Basurero from '@material-ui/icons/Delete';
import Lapiz from '@material-ui/icons/Create';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
// import Corazon from '@material-ui/icons/FavoriteBorder';
import moment from 'moment' 
// import CorazonLleno from '@material-ui/icons/Favorite';
import "moment/locale/es"
import { useState } from 'react';
import Swal from "sweetalert2"
import firebase from "../firebase/firebase"
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { useContext } from 'react';
import { UsuarioContext } from '../Provedores/UsuarioContext';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {RetornarPaper,RenovarPaperMapEtiqueta} from '../Funciones/Funciones'
import {actualizarPaper,ActualizarPaperEnEtiquetas} from '../Funciones/PaperDoc'
import CorazonLleno from "../imagen/iconos/arbolLleno.png"
import Corazon from "../imagen/iconos/arbolVacio.png"


const  estilos = makeStyles((theme)=>({


    margen:{

            margin:"250px auto ",












    },
    caja:{
        position:"relative",
        width:"80vw",
        margin:"20px auto",
        display:"block",
        height:"unset",
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
        margin:"0px 3px",
        [theme.breakpoints.down("sm")]:{

                margin:"0px 4px"
        }
       
    },
    divReg:{

        margin:"45px auto",
        width:"75vw"

    },
    texto:{
        fontFamily:"nunito",
        fontWeight:"300"

    },
    centrarComponente:{
            textAlign:"end",
            marginRight:"10px",
            [theme.breakpoints.down("md")]:{

                    textAlign:"center",
            }

    }



 }))





const Paper = (props) => {
        const clases =estilos()
        const history = useHistory();
        const usuario =useContext(UsuarioContext)
        const [valor, setvalor] = useState(props.paper)
        const [paper, setpaper] = useState([])
        const [cargando, setcargando] = useState(false)
        const [cargandoCorazon, setcargandoCorazon] = useState(false)
        const buscaretiquetas=props.buscaretiquetas
        const megusta=props.megusta
        const tamaño =props.length
        const [ultimoDocumento, setultimoDocumento] = useState(0)






const buscarChips=(valor)=>{
history.push(`/tag/${valor.id}`)
      
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
                           
                            //hacer un mapeo y borrar 


                            e.etiquetas.map(valor=>{
 
                                firebase.db.collection("etiquetas").doc(valor.id).collection("paper").doc(e.id).delete().then(async() => {
                                        //  console.log("Document successfully deleted!");



                                         let soloTag=await firebase.db.collection("etiquetas").doc(valor.id).get().then((doc)=>{


                                                   return{...doc.data()}
                                         
                                         })

                                           console.log(soloTag)
                                           let nuevoObjeto={  ...soloTag,
                                                   contar:soloTag.contar-1}

                                             console.log(nuevoObjeto)      

                                           firebase.db.collection("etiquetas").doc(valor.id).set(nuevoObjeto)


                                   }).catch((error) => {
                                        console.error("Error removing document: ", error);
                                });
                               

                            })

                            var  borrarArchivo= firebase.storage.ref().child("PDF").child(e.id)    
                            var  borrarImagen= firebase.storage.ref().child("IMAGEN").child(e.id)    


                            
                                borrarArchivo.delete().then(function() {
                                        console.log("borrado")
                                // File deleted successfully
                                }).catch(function(error) {
                                        console.log(error)
                                // Uh-oh, an error occurred!
                                });          

                                borrarImagen.delete().then(function() {
                                console.log("borrado")
                        // File deleted successfully
                        }).catch(function(error) {
                                console.log(error)
                        // Uh-oh, an error occurred!
                        });          





                            props.buscaretiquetas()

              Swal.fire('Borrado!', '', 'success')
            } else if (result.isDenied) {
            
            }
          })

        
}



const megustatres=async(valor)=>{


        //setcargando(true)
        if(usuario==null) {
                return history.push("/login")
        }

        // prueba de las funciones 
        //const valorRenovado=  await RetornarPaper(valor.id)
        //valor=valorRenovado

        if(valor.haVotado==undefined){                    
                var antiguoHaVotado=[]
        }else{
                var antiguoHaVotado=valor.haVotado
        }

                        
        // nuevo paper 

        let newPaper={}

     if(antiguoHaVotado.includes(usuario.uid)){ 
      
                antiguoHaVotado=antiguoHaVotado.filter(function(obj){
                        return obj!==usuario.uid
                })

                let megusta=valor.likes-1 
               
                 newPaper={
                        ...valor,
                         likes:megusta,
                        haVotado:antiguoHaVotado
                }


                listaPaperdos(newPaper,megusta,antiguoHaVotado)
                //await firebase.db.collection("paper").doc(valor.id).update(nuevoPaper)
                //RenovarPaperMapEtiqueta(nuevoPaper)
                // 
              

     }else{ 
        // alert("no incluido")
     const nuevoHaVotado = [...antiguoHaVotado, usuario.uid];
     console.log(nuevoHaVotado)
     let megusta=valor.likes+1   
     

     // crear variable de paper 

     newPaper={
        ...valor,
         likes:megusta,
        haVotado:nuevoHaVotado
}

listaPaperdos(newPaper,megusta,nuevoHaVotado)
//await firebase.db.collection("paper").doc(valor.id).update(nuevoPaper)

//RenovarPaperMapEtiqueta(nuevoPaper)



        //        let arreglo=paper 
        //        setpaper([])

        // const nuevoPaper=arreglo.map(papel=>{
        //    if(valor.id==papel.id){



                 
        //         return{
        //                 ...papel,
        //                 likes:1
        //         }

        //    }

        //    return papel

        // })

        // setpaper(nuevoPaper)

}

actualizarPaper(newPaper)
ActualizarPaperEnEtiquetas(newPaper)
buscaretiquetas()
props.setChangeLike({
        cambio:true,
        idEtiqueta:props.id,
        paper:newPaper
    })





}

const megustacuatro=async(valor)=>{ 
        //setcargando(true)
        if(usuario==null) {
                return history.push("/login")
        }
        // prueba de las funciones 
        //const valorRenovado=  await RetornarPaper(valor.id)
        //valor=valorRenovado
        if(valor.haVotado==undefined){                    
                var antiguoHaVotado=[]
        }else{
                var antiguoHaVotado=valor.haVotado
        }                      
        // nuevo paper 
        let newPaper={}
        if(antiguoHaVotado.includes(usuario.uid)){ 
                antiguoHaVotado=antiguoHaVotado.filter(function(obj){
                        return obj!==usuario.uid
                })
                let megusta=valor.likes-1 
                 newPaper={
                        ...valor,
                         likes:megusta,
                        haVotado:antiguoHaVotado
                }
        listaPaperdos(newPaper,megusta,antiguoHaVotado)
                //await firebase.db.collection("paper").doc(valor.id).update(nuevoPaper)
                //RenovarPaperMapEtiqueta(nuevoPaper)
                // 
              
        console.log(newPaper)
     }else{ 
        // alert("no incluido")
     const nuevoHaVotado = [...antiguoHaVotado, usuario.uid];
     console.log(nuevoHaVotado)
     let megusta=valor.likes+1   
     

     // crear variable de paper 

     newPaper={
        ...valor,
         likes:megusta,
        haVotado:nuevoHaVotado
}

console.log(newPaper)
//listaPaperdos(newPaper,megusta,nuevoHaVotado)
//await firebase.db.collection("paper").doc(valor.id).update(nuevoPaper)

//RenovarPaperMapEtiqueta(nuevoPaper)



        //        let arreglo=paper 
        //        setpaper([])

        // const nuevoPaper=arreglo.map(papel=>{
        //    if(valor.id==papel.id){



                 
        //         return{
        //                 ...papel,
        //                 likes:1
        //         }

        //    }

        //    return papel

        // })

        // setpaper(nuevoPaper)

}

// actualizarPaper(newPaper)
// ActualizarPaperEnEtiquetas(newPaper)
// buscaretiquetas()
// props.setChangeLike({
//         cambio:true,
//         idEtiqueta:props.id,
//         paper:newPaper
//     })


             




}



const listaPaperdos=(valor,megusta,nuevosvotos)=>
{
        const nuevoPaper=paper.map(papel=>{
                if(valor.id==papel.id){
                     return {
                         ...valor,
                         likes:megusta,
                         haVotado:nuevosvotos       
                     }
                }
                return papel
             })
             setpaper(nuevoPaper)
}



const funcionCorazon=(valor)=>{
       
        let votos_usuarios=[]

        if(valor.haVotado==undefined){
                console.log("paso por aca dodo")
                return false
        }else{

        votos_usuarios=valor.haVotado
        if(votos_usuarios.length==0){
                console.log("paso por aca dodo")
                return false
        }else{
                console.log(usuario)
                if(usuario!=undefined){
                if(votos_usuarios.includes(usuario.uid)){
                        return true
                }else{
                        return false
                }}

        }
}

       

 }




useEffect(async() => {




        setvalor(props.paper)
// if(props.changeLike.cambio){
//         console.log(props.changeLike.idEtiqueta)
//         console.log(props.id)
//         if(props.changeLike.idEtiqueta!=props.id){
              
//                 cargarListaDos()
//         }else{
//                 cargarListaDos()
//         }
        

// }else{

// // iniciar carga 
// setcargando(true)
//  //tomar todas las etiquetas

//             const etiquetas = props.etiquetas
//             console.log(etiquetas)
// // buscar los paper guardados en cada etiquetas 
//         //crear variable para guardar 
//          let listadepaper=[]

//         //lista de paper con las etiquetas
//         listadepaper =  await firebase.db.collection("etiquetas").doc(etiquetas.id).collection("paper").get()
        

//             var consulta =listadepaper.docs.map(doc=>{
//                     return{
//                             id:doc.id,
//                             ...doc.data()
//                     }
//             })    


//         //mostrar el resultado 

//         console.log(consulta)

//         //Guardar la consulta
//         setpaper(consulta)
         
//         // terminar de cargar

//         setcargando(false)
//         }



}, [props])



    return (
        <div>
                
            

                                        <Papel key={valor.id} className={clases.caja} elevation={3}>

                                        <Grid container  className={clases.contenedor}>
                                                <Grid xs={12} sm={12} md={4}>
                                                                                <div>

                                                                                {valor.imagen!==undefined &&
                                                                                valor.imagen==null?


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
                                            
                                                <Grid xs={12} sm={12} md={6}>
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
                
                <Chip variant="outlined" className={clases.margenChip} onClick={()=>buscarChips(valor)} color="primary" size="small" label={valor.descripcion} />
                     
                                ))}


        </Typography>


        </div>        
        </Grid>

                                                
        <Grid xs={12} sm={12} md={2}>

        <Typography variant="subtitle1" className={clases.centrarComponente}>

           {cargandoCorazon?

                <div>
                <div className={clases.divCircular} >
                        <CircularProgress className={clases.circular}></CircularProgress>
                </div>
                </div>

                :

                <Button
                onClick={()=>megusta(valor)}
               style={{color:"#35b37c",
               marginTop:"40px"
       }}
       startIcon={
                                                                
        funcionCorazon(valor)?
        // <CorazonLleno></CorazonLleno>
        <img height="40" src={CorazonLleno}></img>

        :
        <img  height="40"  src={Corazon}></img>

        //  <Corazon></Corazon>
        
       }
               >

                       {valor.likes}
               </Button>




           }                     



                 
        </Typography>


        <Typography variant="subtitle1" className={clases.centrarComponente}   >
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
                        <Link href={`/editarpaper/${valor.id}`}>
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

                               

                                        
{/*                                         
                                                                { tamaño==2&&

                                                                <Typography align="center">
                                                                <Button 
                                                                        endIcon={<ExpandMoreIcon></ExpandMoreIcon>}
                                                                        variant ="contained"
                                                                        color="primary"

                                                                onClick={()=>{
                                                                        
                                                                }} >
                                                                ver mas
                                                                        </Button> 
                                                                </Typography>   }                     

                                      } */}

                      
             

                
            

        </div>
    )
}

export default Paper
