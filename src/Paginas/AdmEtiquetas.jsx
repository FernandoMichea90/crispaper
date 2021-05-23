import React, { useEffect,useState ,useContext} from 'react'
import { Grid, Typography,IconButton, makeStyles,CircularProgress, TextField, Button, Paper } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import Firebase from "../firebase/firebase"
import Swal  from "sweetalert2"
import MuiAlert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import {UsuarioContext} from '../Provedores/UsuarioContext'
import {actualizarVariosPaper,ActualizarVariosEtiquetas} from '../Funciones/PaperDoc'



function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
const useStyles=makeStyles((theme)=>({


    root:{
        marginTop:"100px",
        " & .MuiButton-containedPrimary:hover" :{
            backgroundColor: "#303f9f00",
            color:"#5fcccf",
            border:"1px solid"
        },
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
              
            }
        },


    
        buttonAgregar:{
            margin:"0px 30px",
            padding:"14px",
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
        }
    ,botonEditar:{
        color:""
    }
    ,textNoDisponible:{


        fontFamily:"Nunito",
        color:"#808080"




}

    
    })) 



const AdmEtiquetas = (props) => {
const clases=useStyles()

const [etiquetas, setetiquetas] = useState([])
const [errores, seterrores] = useState({
    descripcion:null
})
const [cargando, setcargando] = useState(false)
const [tag, settag] = useState({
    descripcion:""
})

const usuario=useContext(UsuarioContext)










useEffect(() => {



         // validar usuario administrador
         
            //  colocar  el cargando en vscode 

            setcargando(true)

            //conocer el estado  del usuario 
        console.log(usuario)
           
         if(usuario==null) return  props.history.push("/")

        if(!usuario.administrador){
          
            props.history.push("/")

        }


    agregarEtiquetas()
    setcargando(false)
   
}, [])
    

const handleChange=(e)=>{

    e.preventDefault()

    settag({...tag,[e.target.name]:e.target.value})
}

const guardarEtiqueta=async()=>{

    setcargando(true)
    if(tag.descripcion){

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
                Firebase.db.collection("etiquetas").add({...tag,contar:0
                    }).then(()=>{
                    Swal.fire({
                        icon:"success",
                        title:"Guardado Correctamente"
                    })
      
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
       
        seterrores({...errores,descripcion:"debes ingresar un valor"})
        setcargando(false)  
    }

    setcargando(false)
    settag({
        descripcion:""
    })
}

const agregarEtiquetas=async()=>{

    await Firebase.db.collection("etiquetas").onSnapshot(manejarSnapshot)
}

function manejarSnapshot(snapshot){
    const  lista =snapshot.docs.map(doc=>{
        return{
            id:doc.id,
            ...doc.data()
        }
    })
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


                
                 let nuevalista=await  Firebase.db.collection("etiquetas").doc(valor.id).collection("paper").get()
                  
                 let nuevalistados=nuevalista.docs.map((doc)=>{
                            return {
                                id:doc.id,...doc.data()
                            }

                 })
            
                 console.log(nuevalistados)
                 //remover la etiqueta a los paper
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



               await Firebase.db.collection("etiquetas").doc(valor.id).delete().then((respuesta)=>{




                        Swal.fire({
                            title:"Borrado Correctamente",
                            icon:"success"
                        })

                        setcargando(false)
                 
                }).catch((error) =>{console.log(error)})
            
    

                        })

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




const editarEtiquetas=(valor)=>{

    Swal.fire({

        title:"Editar Etiqueta",
        input:"text",
        showCancelButton:"true",
        cancelButtonText:"Cancelar",
        confirmButtonText:"Editar",
        confirmButtonColor: '#21cbce',
        cancelButtonColor: '#d33',
        inputValue:`${valor.descripcion}`,
        allowOutsideClick:()=>!Swal.isLoading()

    }).then(async(result)=>{
        setcargando(true)
        if(result.isConfirmed){



            // buscar paper que tenga esa etiqueta 

                    // mostrar el valor 

                  
                
                    
                     let nuevoValor={...valor,descripcion:result.value}


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
            await Firebase.db.collection("etiquetas").doc(valor.id).update({
                descripcion:result.value
            }).then(()=>{
                Swal.fire({
                    title:"Editado Correctamente",
                    icon:"success"
                })
                setcargando(false)
            
            }).catch((error)=>{
                    Swal.fire({
                     title:"Ha ocurrido un problema",
                    icon:"error"
                            
                                })})
                            
                                setcargando(false)
                            
                            }else{setcargando(false)}}) 


        }
    return (
        <div className={clases.root}>

            <Grid container>
                <Grid xs={12} sm={1} md={1} >
                       
                </Grid> 
   
                <Grid container xs={12} sm={10} md={10} >
                        
                        <div className={clases.divAgregar}> 
                            <div className={clases.formAgregar}>
                                <TextField variant="outlined"
                                className={clases.textoAgregar}
                                placeholder="agregar etiqueta"
                                name="descripcion"
                                onChange={handleChange}
                                value={tag.descripcion}
                               

                                ></TextField>

                      
                           <Button onClick={()=>guardarEtiqueta()} className={clases.buttonAgregar} variant="contained" color="primary">
                            Guardar
                            </Button>  
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
                    
                    {cargando==false?
                    
                    
                    etiquetas.length!=0?
                    
                    etiquetas.map((valor)=>(



                  
                    <Paper   elevation ={0} className={clases.paperEstilo}>
                     <Grid container>
                  <Grid xs={8}>
                      <div>
                          <Typography align="center" variant="h4">
                                        {valor.descripcion}  
                          </Typography>
                      </div>
                  </Grid>
                  <Grid container xs={4}>
                        <Grid xs={6}>
                             <IconButton  >
                                <CreateIcon color="primary" onClick={()=>{editarEtiquetas(valor)}}></CreateIcon>
                            </IconButton>   
                          
                        </Grid>
                        <Grid xs={6}>
                             <IconButton   >
                                <DeleteIcon color="error" onClick={()=>{borrarEtiquetas(valor)}}></DeleteIcon>
                            </IconButton>
                             
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
                            
                        <div className={clases.divCircular} >
                                <CircularProgress className={clases.circular}></CircularProgress>
                         </div>
                                
                        }
                </Grid> 
                <Grid xs={12} sm={1} md={1} >
                       
                </Grid> 
   

            </Grid>
            
        </div>
    )
}

export default AdmEtiquetas



