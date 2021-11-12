import React, { useEffect,useState ,useContext,useRef} from 'react'
import { Grid, Typography,IconButton, makeStyles,CircularProgress, TextField, Button, Paper } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import Firebase from "../firebase/firebase"
import Swal  from "sweetalert2"
import MuiAlert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import {UsuarioContext} from '../Provedores/UsuarioContext'
import {actualizarVariosPaper,ActualizarVariosEtiquetas} from '../Funciones/PaperDoc'
import Icon from '@material-ui/core/Icon';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import ImageIcon from '@material-ui/icons/Image';
import AdminEtiqueta from '../Componetes/AdministrarEtiqueta/adminEtiqueta'
import Estilos from '../Componetes/Estilos'
import LinkIcon from '@material-ui/icons/Link';
import Cargando from '../Componetes/Cargando';
import VentanaEmergente from '../Componetes/AdministrarEtiqueta/VentanaEmergente';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
 
const useStyles=makeStyles((theme)=>({


    root:{
        marginTop:"100px",
        " & .MuiButton-containedPrimary:hover" :{
            backgroundColor: "#303f9f00",
            color:"#5fcccf",
            border:"1px solid",
            [theme.breakpoints.down('sm')]:{
                
            }
        },
    },
    caja: {
        margin:"15px 0px"
    },
    margenLink:{
        margin:'15px 0px'
    },

    circular:{
        height:"72px !important",
        width:"72px !important",
        
        },
        divCircular:{
            margin:"100px  auto auto auto"
    
        },
        divAgregar:{

            width:"100%",
            margin:"0px auto 100px auto"
        },
        formAgregar:{

            display:"block",
            margin:"auto",
            width:"360px",
            [theme.breakpoints.down("xs")]:
            {
              width:'auto'
            }
        },


        buttonEliminar:{
            margin:"5px 0px",
            padding:"14px",
            width:"100%",
            background:"#f44336",
            [theme.breakpoints.down("xs")]:
            {
                width:"100%",
                margin:"10px auto",
                padding:"14px"
            },
            '&:hover': {
                background:"#ffffff",
                color:"#f44336 !important",
            }
        },


        buttonAgregar:{
            margin:"5px 0px",
            padding:"14px",
            width:"100%",
            [theme.breakpoints.down("xs")]:
            {
                width:"100%",
                margin:"10px auto",
                padding:"14px"
            }

        },
        textoAgregar:{
            [theme.breakpoints.down("xs")]:
            {
                width:"100%",
                margin:"10px auto",
                padding:"unset"
            }
        },
        paperEstilo:{
            width: "100%",
    margin: "30px 0px",
    padding: "14px",
    color: "#21cbce",
    border: "1px solid #21cbce",
    [theme.breakpoints.down("sm")]:{
        width:'unset'
    }
        }
    ,botonEditar:{
        color:""
    },
    divTitulo:{
        height:'85px'
    }
    ,textNoDisponible:{


        fontFamily:"Nunito",
        color:"#808080"




},
divTransparencia:{
    height:'100%',
    width:'100%',
    position:'absolute',
    top:'0',
    background:'rgb(0 0 0 /100%)'

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
},
divImagen:{
    height:"274px",
    width:"260px",
    backgroundSize:"260px auto",
    position:"relative",
    backgroundRepeat:"no-repeat",
    border: "2px dashed #21cbce",
    backgroundPosition:"50%",
    borderRadius:"0",
    display:"block",
    overflow:"hidden",
    margin:"auto",
    marginTop:"15px",
    [theme.breakpoints.down("sm")]:{
            marginTop:"30px"
    }
}
,
divImagenDos:{
    height:"274px",
    width:"260px",
    backgroundSize:"260px auto",
    position:"relative",
    backgroundRepeat:"no-repeat",
    border: "2px  #21cbce",
    backgroundPosition:"50%",
    borderRadius:"25px",
    display:"block",
    overflow:"hidden",
    margin:"auto",
    marginTop:"15px",
    [theme.breakpoints.down("sm")]:{
            marginTop:"30px"
    }
}

    
    })) 



const AdmEtiquetas = (props) => {
const clases=useStyles()
const clasesEstilos=Estilos()
const myRef = useRef(null)
const [transparencia, settransparencia] = useState(30)
const [etiquetas, setetiquetas] = useState([])
const [errores, seterrores] = useState({
    descripcion:null
})
const [cargando, setcargando] = useState(false)
const [imagen, setimagen] = useState({url:null})
const [sponsor, setsponsor] = useState({url:null})
const [tag, settag] = useState({
    descripcion:"",
    icono:"",
})
// estado de la ventana emergente
const [open, setOpen] =useState(false);
// mensaje informativo para la ventana emegente
const [mensajeInformativo, setMensajeInformativo] = useState({mensaje:''})

const usuario=useContext(UsuarioContext)



useEffect(() => {



         // validar usuario administrador
         
            //  colocar  el cargando en vscode 

            setcargando(true)

            //conocer el estado  del usuario 
            console.log(usuario)
            if(usuario==null){
                props.history.push("/")

            }else{
                
                if(!usuario.administrador){
                    props.history.push("/")
                }
            }
     

    agregarEtiquetas()
 
   
   
}, [usuario])
    
// abrir ventana emergente
const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
const executeSroll=()=>{
 
   myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }) 
}

const handleChange=(e)=>{

    e.preventDefault()

    settag({...tag,[e.target.name]:e.target.value})
}


const cancelarEdicion = ()=>{
    settag({
        descripcion:"",
        icono:""
    })
}

const guardarEtiqueta=async()=>{

    setcargando(true)

    //validaciones
    try {
        if(tag.icono.trim()==''){
            tag.icono=null
        }
    } catch (error) {
        tag.icono=null
    }
 



    validaciones()
    if(tag.descripcion!==""){

            let coincide=false

            etiquetas.map(doc=>{

                if(doc.descripcion==tag.descripcion){
                    coincide=true
                }
            })

        // buscar si esa etiqueta ya existe
            if(coincide){

                Swal.fire({
                    icon:"info",
                    title:"Ese registro ya esta disponible"
                  })
            }else{
                tag.imagen=imagen.url
                tag.sponsor=sponsor.url
                tag.transparencia=transparencia
                Firebase.db.collection("etiquetas").add({...tag,contar:0
                    }).then(()=>{
                   
                    Swal.fire({
                        icon:"success",
                        title:"Guardado Correctamente"
                    })
                    settag({descripcion:"",
                    icono:""
                })  
                settransparencia(30)
                setimagen({url:null})
                setsponsor({url:null})
                setcargando(false)
      
    }               
       ).catch(()=>{
           Swal.fire({
        icon:"error",
        title:"Ha ocurrido un error intentalo mas tarde"
    })
  
}
    
    )

 
}
    }else{
       
        seterrores({...errores,descripcion:"debes ingresar una descripcion"})
        setcargando(false)  
    }

    
    settag({
        descripcion:""
    })
}


const validaciones =()=>{

            if(tag.descripcion.trim()==""){
                seterrores({...errores,descripcion:"debes ingresar una descripcion"})

            }
            if(tag.icono){
                settag({...tag,icono:null})
            }
           


}



const agregarEtiquetas=async()=>{

    await Firebase.db.collection("etiquetas").orderBy('descripcion').onSnapshot(manejarSnapshot)
  
}

function manejarSnapshot(snapshot){
    const  lista =snapshot.docs.map(doc=>{
        
        return{
            id:doc.id,
            ...doc.data()
        }
       
    })
        
    setcargando(false)
    setetiquetas(lista)   
}


const borrarEtiquetas=async(valor)=>{

        Swal.fire({
               title:"¿esta seguro que desea borrar el registro?",
               text:`${valor.descripcion}`,
               showCancelButton:"true",
               cancelButtonText:"Cancelar",
               confirmButtonText:"Borrar",
               confirmButtonColor: '#21cbce',
               cancelButtonColor: '#d33',
               


        }).then(async(result)=>{
            if(result.isConfirmed){
                setcargando(true)
                //buscar todos los registros con esa etiqueta
                //buscarPapers(valor)
                console.log(valor)
                 let nuevalista=await  Firebase.db.collection("etiquetas").doc(valor.id).collection("paper").get()
                  
                 let nuevalistados=nuevalista.docs.map((doc)=>{
                            return {
                                id:doc.id,...doc.data()
                            }

                 })
            
                 console.log(nuevalistados)
                 //remover la etiqueta a los paper
                 //recorriendo los paper
                 nuevalistados.map(async (doc)=>{
                        // nueva variable donde guardare la nueva coleccion  etiqueta

                        let tag=[]
                        //mapeando etiqueta de cada paper
                         doc.etiquetas.map(docdos=>
                            {   
                                // buscar la etiqueta que es igual a la borrada
                                console.log(docdos)
                                // guardar la coleccion de etiquetas diferentes 
                                if(docdos.id!=valor.id){
                                    tag.push(docdos)
                                }


                            }
                            )
                            console.log(tag)

                            //armar el nuevo objeto 

                            let nuevoObjeto={...doc,etiquetas:tag}
                            console.log(nuevoObjeto)
                            //editar los papers 
                            await  Firebase.db.collection("paper").doc(nuevoObjeto.id).update(nuevoObjeto).then(()=>{console.log("editado")})
                            // Borrar todos los paper en las etiquetas
                            
                            await Firebase.db.collection("etiquetas").doc(valor.id).collection("paper").doc(nuevoObjeto.id).delete().then((test1)=>{console.log("borrado")}).catch((error)=>{console.log(error)})


                await  Firebase.db.collection("etiquetas").doc(valor.id).collection("paper").get().then((test)=>{
                   
                

               })



    

                        })





                 //borrar la etiqueta
                 
                 
               await Firebase.db.collection("etiquetas").doc(valor.id).delete().then((respuesta)=>{




                Swal.fire({
                    title:"Borrado Correctamente",
                    icon:"success",
                    confirmButtonColor: '#21cbce',
                    
                }).then(()=>{
                    setcargando(false)
                })

                
         
        }).catch((error) =>{console.log(error)})
    

            }})
        }


const removerEtiqueta=(antiguo,chips)=>{      
    let nuevoPaper=[]
    antiguo.map(async(valor)=>{

          
        let nuevochips=[]
            
            var tag=valor.etiquetas

            tag.map((t)=>{
                   
                if(t!=chips.descripcion){
                  
                            nuevochips.push(t)

                }


            })

                
                valor.etiquetas=nuevochips
            
                
                // editar paper 
                await Firebase.db.collection("paper").doc(valor.id).update(valor).then(()=>{

                    nuevoPaper.push(valor)

                }).catch((error) =>{
                    console.log(error)
                })

                 



                console.log(valor)
            
            




    })


    console.log(nuevoPaper)
}


const  editarTodolosPapers=async(papersantiguo,tagEtiq,descripcionNew)=>{


  
    papersantiguo.map(async(paper)=>{
        let nuevosTags=[]

        paper.etiquetas.map((tag)=>{

                        if(tag==tagEtiq.descripcion){
                                nuevosTags.push(descripcionNew)
                        }else{
                        nuevosTags.push(tag)
                        }




        })



        paper.etiquetas=nuevosTags
        

        await Firebase.db.collection("etiquetas").doc(tagEtiq.id).collection("paper").doc(paper.id).update(paper).then(()=>{

            console.log("ok")

         }).catch((error) =>{
             console.log(error)
         })
         await Firebase.db.collection("paper").doc(paper.id).update(paper).then(()=>{

                   console.log("ok")

                }).catch((error) =>{
                    console.log(error)
                })



    })





}


 const buscarPaperEdit =async(valor)=>{

    console.log(valor.id)
    var consulta = await Firebase.db.collection("paper").where("etiquetas", "==", {id:valor.id}).get()
    var consult=consulta.docs.map(doc=>{
 
        return {

            id:doc.id,
            ...doc.data()
        }

   
    })

    console.log(consult)

    return consult

 }

// retornar  los paper  de las etiquetas 
const  modificarPaperdelastag=async(valor)=>{

   let lista =  await Firebase.db.collection("etiquetas").doc(valor.id).collection("paper").get()
    //console.log(lista)
    let nuevaLista=lista.docs.map(doc=>{
      //  console.log(doc.data().etiquetas)
            
      let nuevasTag=doc.data().etiquetas.map(docTag=>{

            if(docTag.id==valor.id){
                console.log("coincide")
                return {
                    id:valor.id,
                    descripcion:valor.descripcion
                }

            }else{      
                console.log("no coincide")
                return {
                    id:docTag.id,
                    descripcion:docTag.descripcion
                }


            }


      })

      console.log(nuevasTag)
        return {
            id:doc.id,
            ...doc.data(),
            etiquetas:nuevasTag
        }
    })


    return nuevaLista



}


const editaPaper=(listaPaper,valor)=>{

console.log(listaPaper)

 const nuevaLista =listaPaper.map(doc=>
    {

         let  nuevasEtiquetas=doc.etiquetas.map(docTag=>
            {
                    if(docTag.id==valor.id){
                        console.log("coincide")
                    }
            })

    }
 )



}






const editarEtiquetasDos=(valor)=>{
    console.log(valor)
    setimagen({url:valor.imagen})
    setsponsor({url:valor.sponsor}) 
    if(valor.transparencia!=undefined){
        settransparencia(valor.transparencia)
    }else{
        settransparencia(30)
    }
    settag(valor)
    executeSroll()


}


const createoredit=async()=>{

    if(tag.id==null){
           alert("creando") 

    }else{
        alert("editando")
    }
}


const editarEtiquetas=async()=>{

   
        handleClickOpen()
      
        setMensajeInformativo({mensaje:'...Creando Nueva Variable...'})
            //crear nuevo valorados                      
                     let nuevoValor={...tag,transparencia:transparencia,imagen:imagen.url,sponsor:sponsor.url}
                     
                 
                     let coincide=false

                 
         
                      
                 // buscar si esa etiqueta ya existe
                
                 setMensajeInformativo({mensaje:'...Actualizando etiqueta...'})
                                    const listaPaper=await modificarPaperdelastag(nuevoValor)
                                    
                                    // registrar  en la base de datos 

                                        // actualizar en los papers 
                                        actualizarVariosPaper(listaPaper)
                                        // Actualizar los paper con las etiquetas 
                                        ActualizarVariosEtiquetas(listaPaper,nuevoValor)
                                        //

                                    // modificar  todos los paper             
                                    // modificar todas las etiquetas con ese paper
                                    // retorna la lista que de los papers que contienes esa etiqueta
                                    //  var prueba =await buscarPaperEdit(valor)
                                    //editar todos los paper de la coleccion unica y de la subcolleccion de la etiquetas
                                //  editarTodolosPapers(prueba,valor,result.value)

                                    // actualiza la etiqueta 
                                    //valor id es el id de la etiqueta
                                if(nuevoValor.sponsor==undefined) {
                                    nuevoValor.sponsor=null
                                }
                                if(nuevoValor.sponsorUrl==undefined){
                                    nuevoValor.sponsorUrl=null
                                }
                                setMensajeInformativo({mensaje:'...Ingresando a la base de datos...'})
                                await Firebase.db.collection("etiquetas").doc(tag.id).update({
                                    ...nuevoValor
                                }).then(()=>{
                                    Swal.fire({
                                        title:"Editado Correctamente",
                                        icon:"success",
                                        confirmButtonColor: '#21cbce',
                                      
                                    })
                                    setcargando(false)
                                    settag({descripcion:"",
                                    icono:""
                                })  
                                     setimagen({url:null})
                                     setsponsor({url:null})
                                     settransparencia({url:null})
                                
                                }).catch((error)=>{
                                        Swal.fire({
                                        title:"Ha ocurrido un problema",
                                        icon:"error"
                                                
                                                    })})
                                                
                                              handleClose()
                                                         
                                                 


        }


const agregarUrl=async()=>{
    const { value: url } = await Swal.fire({
        input: 'url',
        inputLabel: 'URL direccion',
        inputPlaceholder: 'Ingrese URL'
      })
      
      if (url) {
        Swal.fire('Exito','La imagen ha sido ingresada','success')
        let img=url
        setimagen({url:img})

      }
}
const agregarUrlSponsor=async()=>{
    const { value: url } = await Swal.fire({
        input: 'url',
        inputLabel: 'URL imagen',
        inputPlaceholder: 'Ingrese URL'
      })
      
      if (url) {
        Swal.fire('Exito','La imagen ha sido ingresada','success')
        let img=url
        setsponsor({url:img})

      }
}
const agregarUrlRedireccionSponsor=async()=>{
    const { value: url } = await Swal.fire({
        input: 'url',
        inputLabel: 'URL Sponsor',
        inputPlaceholder: 'Ingrese URL'
      })
      
      if (url) {
        Swal.fire('Exito','La URL ha sido ingresada','success')
        let img=url
        settag({...tag,sponsorUrl:img})

      }
}

        return (
        <div className={clases.root}>

            <Grid container>
                <Grid xs={12} sm={12} md={1} >
                       
                </Grid> 
   
                <Grid container xs={12} sm={12} md={10} >
                        
                <Grid container>
        
                     <Grid  xs={12} sm={12} md={6}>
                     
                        <div ref={myRef} className={clases.divAgregar}> 
                            <div className={clases.formAgregar}>
                                <Typography align='center' variant="h4">
                                    <div className={clases.divTitulo}>
                                    Ingrese topico ambiental
                                    </div>
                                </Typography> 
                                <Typography align='center'>
                                 
                                    {imagen.url==null ?
                                     <div className={clases.divImagen}>
                                    < ImageIcon className={clases.imgFoto}></ImageIcon>
                                    </div>
                                    :
                                    <>
                                    <div className={clases.divImagenDos}>
                                    <img src={imagen.url} style={{height:"100%"}}/>
                                    <div className={clases.divTransparencia} style={{background:`rgb(0 0 0 / ${transparencia}%)` }} ></div>
                                    <div className={clasesEstilos.negroTexto}>
                                       
                                            {tag.descripcion}
                                        
                                    </div>
                                    </div>
                                    <AdminEtiqueta  transparencia={transparencia} settransparencia={settransparencia} style={{marginTop:'50px'}}></AdminEtiqueta>
                                  </>
                                  }      

                                

                                </Typography>
                                <Button onClick={()=>agregarUrl()}  startIcon={<AddAPhotoIcon/>} className={clases.buttonAgregar} variant="contained" color="primary">
                         
                         </Button>
                                <div className={clases.caja}>
                                <TextField variant="outlined"
                                className={clases.textoAgregar}
                                placeholder="agregar topico ambiental"
                                name="descripcion"
                                onChange={handleChange}
                                value={tag.descripcion}
                               fullWidth

                                ></TextField>
                                </div>
                            
                    



                          
                            </div>


                       {errores.descripcion?

<Alert    style={{ margin:"20px auto auto",width:"50%"}}

action={
    <IconButton
      aria-label="close"
      color="inherit"
      size="small" 
   
      onClick={() => {
       seterrores({
           ...errores,descripcion:null
       })
      }}
    >
   <CloseIcon></CloseIcon>

    </IconButton>
    }

severity="error">{errores.descripcion}</Alert>

    :

<div></div>

}                 

                       </div>   
                    
                 
                     </Grid> 

                     <Grid item xs={12} sm={12} md={6}>
                     <div className={clases.formAgregar}>
                    <Typography align='center'variant="h4" >
                    <div className={clases.divTitulo} >
                    Ingrese sponsor
                    </div>
                    </Typography>
                     <Typography align='center'>

 
                                    {sponsor.url==null ?
                                    <div className={clases.divImagen} style={{height:'150px'}}>
                                   < ImageIcon className={clases.imgFoto}></ImageIcon>
                                    </div> :
                                    
                                    <div className={clases.divImagenDos} style={{height:'150px'}}>
                                    <img src={sponsor.url} style={{height:"100%"}}/>
                                    </div>
                                    }      
                                </Typography>
                                <Button onClick={()=>agregarUrlSponsor()}  startIcon={<AddAPhotoIcon/>} className={clases.buttonAgregar} variant="contained" color="primary">
                         
                         </Button>
                               
                         <Button onClick={()=>agregarUrlRedireccionSponsor()}  startIcon={<LinkIcon/>} className={clases.buttonAgregar} variant="contained" color="primary">
                         
                         </Button>    
                         <Typography className={clases.margenLink} align='center'>
                             {tag.sponsorUrl !==undefined&&
                             <a href={tag.sponsorUrl}>
                             {tag.sponsorUrl}
                             </a>
                                }
                         </Typography>


                     
                          
                    </div>

                     </Grid>  

                     <Grid item xs={12}>
                     {tag.id==null?
                         <Button onClick={()=>guardarEtiqueta()} className={clases.buttonAgregar} variant="contained" color="primary">
                         Guardar
                         </Button>  :
                         <>
                          <Button onClick={()=>editarEtiquetas()} className={clases.buttonAgregar} variant="contained" color="primary">
                          Editar
                          </Button>  
                           <Button onClick={()=>cancelarEdicion()} className={clases.buttonEliminar} variant="contained" color="primary">
                           Cancelar
                           </Button>  
                           </>
                        }
                     </Grid>
                     <Grid xs={12}>
                     {cargando==false?
                    
                    
                    etiquetas.length!=0?
                    
                    etiquetas.map((valor)=>(



                  
                    <Paper   elevation ={0} className={clases.paperEstilo}>
                     <Grid container>
                     <Grid xs={12} md={2}>
                      <div>
                          <Typography align="center" variant="h4">
                            <Icon>
                            {valor.icono==null?
                                <> local_offer</>
                            :
                                valor.icono
                            }
                            </Icon>
                                
                          </Typography>
                      </div>
                  </Grid>      
                  <Grid xs={12} md={6}>
                      <div>
                          <Typography align="center" variant="h4">
                                        {valor.descripcion}  
                          </Typography>
                      </div>
                  </Grid>
                  <Grid container xs={12} md={4}>
                        <Grid xs={6}>
                        <Typography align="center" variant="h4">
                             <IconButton  >
                                <CreateIcon color="primary" onClick={()=>{editarEtiquetasDos(valor)}}></CreateIcon>
                            </IconButton>   
                            </Typography>
                        </Grid>
                        <Grid xs={6}>
                        <Typography align="center" variant="h4">
                             <IconButton   >
                                <DeleteIcon color="error" onClick={()=>{borrarEtiquetas(valor)}}></DeleteIcon>
                            </IconButton>
                         </Typography>    
                        </Grid>    
                  </Grid>
                  </Grid>
                  </Paper>
                        )):
                        

                        <div style={{width:"inherit"}}>
                        <Typography className={clases.
                            textNoDisponible
                             }  align="center" variant="h4">
                                      No ahi registros
                            </Typography>          
                            </div>
                        
                        :
                        <Cargando></Cargando>
                       
                        }

                     </Grid>

                     </Grid> 
                     
                </Grid> 
                <Grid xs={12} sm={12} md={1} >
                       
                </Grid> 
   

            </Grid>
            
            <VentanaEmergente mensajeInformativo={mensajeInformativo} open={open}></VentanaEmergente>
        </div>
    )
}

export default AdmEtiquetas



