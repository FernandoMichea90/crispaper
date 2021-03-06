import React from 'react'
import {Paper as Papel,Grid,Typography,Chip,Button ,CircularProgress ,IconButton,makeStyles,Link} from "@material-ui/core"
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
import { useEffect } from 'react';

import {RetornarPaper,RenovarPaperMapEtiqueta} from '../Funciones/Funciones'

import {actualizarPaper,ActualizarPaperEnEtiquetas} from '../Funciones/PaperDoc'


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
       
    },
    divReg:{

        margin:"45px auto",
        width:"75vw"

    },
    texto:{
        fontFamily:"nunito",
        fontWeight:"300"

    },



 }))





const Paper = (props) => {
        const clases =estilos()
        const history = useHistory();
        const usuario =useContext(UsuarioContext)
        const [valor, setvalor] = useState({})
        const [paper, setpaper] = useState([])
        const [cargando, setcargando] = useState(false)
        const [cargandoCorazon, setcargandoCorazon] = useState(false)
        const buscaretiquetas=props.buscaretiquetas




const buscarChips=(valor)=>{
history.push(`/tag/${valor.descripcion}`)
      
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



 const megustados=(valor)=>{

        if(valor.haVotado==undefined){                    
                var antiguoHaVotado=[]
        }else{
                var antiguoHaVotado=valor.haVotado
        }

                        
     if(antiguoHaVotado.includes(usuario.uid)){ 

                antiguoHaVotado=antiguoHaVotado.filter(function(obj){
                        return obj!==usuario.uid
                })

                        
                valor.likes=valor.likes-1

                let nuevoPaper={
                        ...valor,
                         likes:valor.likes,
                        haVotado:antiguoHaVotado
                }
                
               
              listarPaper(paper,nuevoPaper)

     }else{ 
        
     const nuevoHaVotado = [...antiguoHaVotado, usuario.uid]
     valor.likes=valor.likes+1   


     // crear variable de paper 

     let nuevoPaper={
        ...valor,
         likes:valor.likes,
        haVotado:nuevoHaVotado
}


listarPaper(paper,nuevoPaper)

//      setpaper({...valor,likes:valor.likes})
      }

        

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

const listarPaper=(lista,objeto)=>{

 lista.map(objetoAntiguo=>{

        if(objeto.id==objetoAntiguo.id){
                console.log(objeto)
               objetoAntiguo.likes=5 
               console.log(objetoAntiguo)
                             }else{
                                    
                             }
              }
        )

console.log(lista)        
setpaper(test=>lista)

}

const megusta=async(valor)=>{
        setcargando(true)
        if(usuario==null) {
                return history.push("/login")
        }



        // prueba de las funciones 

        const valorRenovado=  await RetornarPaper(valor.id)

        valor=valorRenovado

        if(valor.haVotado==undefined){                    
                var antiguoHaVotado=[]
        }else{
                var antiguoHaVotado=valor.haVotado
        }

                        console.log(antiguoHaVotado)               
                         console.log(antiguoHaVotado.includes(usuario.uid))
     if(antiguoHaVotado.includes(usuario.uid)){ 

                antiguoHaVotado=antiguoHaVotado.filter(function(obj){
                        return obj!==usuario.uid
                })

                        console.log(usuario.uid)
                        console.log(antiguoHaVotado)
                valor.likes=valor.likes-1

                let nuevoPaper={
                        ...valor,
                         likes:valor.likes,
                        haVotado:antiguoHaVotado
                }
                
                await firebase.db.collection("paper").doc(valor.id).update(nuevoPaper)
                RenovarPaperMapEtiqueta(nuevoPaper)
                // 
              

     }else{ 
        
     const nuevoHaVotado = [...antiguoHaVotado, usuario.uid];
     console.log(nuevoHaVotado)
     valor.likes=valor.likes+1   


     // crear variable de paper 

     let nuevoPaper={
        ...valor,
         likes:valor.likes,
        haVotado:nuevoHaVotado
}


await firebase.db.collection("paper").doc(valor.id).update(nuevoPaper)

RenovarPaperMapEtiqueta(nuevoPaper)

//      setpaper({...valor,likes:valor.likes})
      }

//         if(usuario==null) {
//                 return history.push("/login")
//         }
//         if(valor.haVotado==undefined){                    
//                 var antiguoHaVotado=[]
//          }else{
//                 var antiguoHaVotado=valor.haVotado
//          }
//          console.log(antiguoHaVotado)
//          console.log(usuario.uid)
//          console.log(antiguoHaVotado.includes(usuario.uid))
//      if(antiguoHaVotado.includes(usuario.uid)){ 

//                 antiguoHaVotado=antiguoHaVotado.filter(function(obj){
//                         return obj!==usuario.uid
//                 })


//                 console.log(antiguoHaVotado)

//                 valor.likes=valor.likes-1
//                 await firebase.db.collection("paper").doc(valor.id).update({
//                         ...valor,
//                         likes:valor.likes,
//                         haVotado:antiguoHaVotado
//                 })
                
               // setvalor({...valor,likes:valor.likes})
              

//      }else{ 
        
//      const nuevoHaVotado = [...antiguoHaVotado, usuario.uid];
//      console.log(nuevoHaVotado)
//      valor.likes=valor.likes+1   
// await firebase.db.collection("paper").doc(valor.id).update({
//         ...valor,
//          likes:valor.likes,
//         haVotado:nuevoHaVotado
// })

 //   setvalor({...valor,likes:valor.likes})
//       }

cargarLista()
}

const cargarListaDos=async()=>{

        // iniciar carga 
setcargando(true)
//tomar todas las etiquetas

           const etiquetas = props.etiquetas
           console.log(etiquetas)
// buscar los paper guardados en cada etiquetas 
       //crear variable para guardar 
        let listadepaper=[]

       //lista de paper con las etiquetas
       listadepaper =  await firebase.db.collection("etiquetas").doc(etiquetas.id).collection("paper").get()
       

           var consulta =listadepaper.docs.map(doc=>{
                   return{
                           id:doc.id,
                           ...doc.data()
                   }
           })    


       //mostrar el resultado 

       console.log(consulta)

       //Guardar la consulta
       setpaper(consulta)
        
       // terminar de cargar

       setcargando(false)
}

const cargarLista =async()=>{

        console.log("cargar lista")
        // iniciar carga
         //tomar todas las etiquetas
        
        const etiquetas = props.etiquetas
       
        // buscar los paper guardados en cada etiquetas 
                //crear variable para guardar 
                 let listadepaper=[]
        
                //lista de paper con las etiquetas
                listadepaper =  await firebase.db.collection("etiquetas").doc(etiquetas.id).collection("paper").get()
                
        
                    var consulta =listadepaper.docs.map(doc=>{
                            return{
                                    id:doc.id,
                                    ...doc.data()
                            }
                    })    
        
        
                //mostrar el resultado 
        
              
        
                //Guardar la consulta
                setpaper(consulta)
                 
                // terminar de cargar
        
                setcargando(false)
        
        

}




useEffect(async() => {


if(props.changeLike.cambio){
        console.log(props.changeLike.idEtiqueta)
        console.log(props.id)
        if(props.changeLike.idEtiqueta!=props.id){
              
                cargarListaDos()
        }else{
                cargarListaDos()
        }
        

}else{

// iniciar carga 
setcargando(true)
 //tomar todas las etiquetas

            const etiquetas = props.etiquetas
            console.log(etiquetas)
// buscar los paper guardados en cada etiquetas 
        //crear variable para guardar 
         let listadepaper=[]

        //lista de paper con las etiquetas
        listadepaper =  await firebase.db.collection("etiquetas").doc(etiquetas.id).collection("paper").get()
        

            var consulta =listadepaper.docs.map(doc=>{
                    return{
                            id:doc.id,
                            ...doc.data()
                    }
            })    


        //mostrar el resultado 

        console.log(consulta)

        //Guardar la consulta
        setpaper(consulta)
         
        // terminar de cargar

        setcargando(false)
        }



}, [])



    return (
        <div>
                {
                
                !cargando?
                
                paper.length!=0?
                        
                         
                                paper.map(valor=>(

                                        <Papel key={valor.id} className={clases.caja} elevation={3}>

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
                
                <Chip variant="outlined" className={clases.margenChip} onClick={()=>buscarChips(valor)} color="primary" size="small" label={valor.descripcion} />
                     
                                ))}


        </Typography>


        </div>        
        </Grid>

                                                
        <Grid xs={12} sm={12} md={3}>

        <Typography variant="subtitle1" align="center">

           {cargandoCorazon?

                <div>
                <div className={clases.divCircular} >
                        <CircularProgress className={clases.circular}></CircularProgress>
                </div>
                </div>

                :

                <Button
                onClick={()=>megustatres(valor)}
               style={{color:"#ff0000",
               marginTop:"40px"
       }}
               startIcon={<Corazon></Corazon>}
               >

                       {valor.likes}
               </Button>




           }                     



                 
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

                                )
                                )       

                                             
                                      

                        // paper.map(valor=>{

                                                                
                        //                 <div>
                        //                 registro
                        //                </div>        

                        // }
                        //  )
                              
                :
                
             
                        <div className={clases.divReg} >
                        <Typography variant="h5" align="center"
                                                        className={clases.texto}
                        >
                
                No   se encontraron registros 
        </Typography> 
                </div>  
        

        :
        <div>
                                <div className={clases.divCircular} >
                                        <CircularProgress className={clases.circular}></CircularProgress>
                                    </div>
                        </div>


                }
            

        </div>
    )
}

export default Paper
