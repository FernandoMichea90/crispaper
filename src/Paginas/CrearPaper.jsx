import React,{useState,useEffect} from 'react'
import { Grid, Typography, makeStyles, Button,TextField,IconButton,CircularProgress } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import '@react-pdf-viewer/core/lib/styles/index.css';
import Etiquetas from '../Componetes/Etiquetas'
import firebase from "../firebase/firebase"
import AutocompletarTres from '../Componetes/AutoCompletarTres'
import {UsuarioContext} from '../Provedores/UsuarioContext'
import { useContext } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import MuiAlert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import LinkIcon from '@material-ui/icons/Link';
import swal  from 'sweetalert2'
import { purple } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';
import FuncionesFirebase from '../Funciones/FuncionesFirebase'
import SliderNota from '../Componetes/CrearPaper/SliderNota'
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


  


const useStyles=makeStyles((theme)=>({

    root:{
        " & .MuiButton-containedPrimary:hover" :{
            backgroundColor: "#303f9f00",
            color:"#5fcccf",
            border:"1px solid"
        },

       "& .MuiButton-containedSecondary:hover" :{
            backgroundColor: "rgb(95 204 207)",
            color: "#ffffff"          
        }


    },

    margenArriba:{

        marginTop:"50px"
        ,marginBottom:'25px'
    },
    estilo_mensaje_informativo:{

        marginTop:"100px",
        color:"#00000042"
    },

    divFoto:{

        width:"250px",
        height:"250px",
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
    },
    divPrincipal:{
        margin:"5px"
    },
    margenButton:{
        margin:"20px 0px",
    },margenButtonDos:{
        margin:"20px 0px",
        padding:"0px"    
    },
    divPdf:{
    border: "1px solid rgba(0, 0, 0, 0.3)",
    height:"-webkit-fill-available",
    margin: "50px auto"
    },
    circular:{
        height:"72px !important",
        width:"72px !important",
        display:"block",
        margin:"auto"
        },
        
        divCircular:{
            marginTop:"100px"
    
        },
        divImagen:{
       
            height:"160px",
            width:"260px",
            backgroundSize:"260px auto",
            position:"relative",
            backgroundRepeat:"no-repeat",
            border: "2px dashed #21cbce",
            backgroundPosition:"50%",
            borderRadius:"0",
            display:"block",
            margin:"auto",
            marginTop:"15px",
            [theme.breakpoints.down("sm")]:{
                    marginTop:"30px"
            }
        }
   
        

}))
const CrearPaper = (props) => {
    const usuario=useContext(UsuarioContext)
    const clases=useStyles()
    const [imagen,setimagen]=useState({file:null,imagen:null})
    const [etiquetas,setetiquetas]=useState([])
    const [region,setregion]=useState([])
    const [informacion,setinformacion]=useState([])
    const [tagregion,settagregion]=useState([])
    const [taginformacion,settaginformacion]=useState([])  
    const [tag,settag]=useState([]) 
    const [cargando, setcargando] = useState(false)
    const [mensaje_informativo,set_mensaje_informativo]=useState("")
    let [paper, setpaper] = useState({
        imagen:null,
        pdf:null,
        subida: null,
        likes:0,
        etiquetas:[],
        titulo:"",
        resumen:""
    })
    const [id, setid] = useState()
    const [errores, seterrores] = useState({
        titulo:null,
        resumen:null,
        pdf:null

    })
    const [pdf,setpdf]=useState({file:null,pdf:null})
    const [link, setLink] = useState()
 //seleccionar el archivo 
    const seleccionarArchivo=imagen=>{
            const agregarimg=imagen.target.files[0]
            console.log(agregarimg)  
            if(agregarimg!=undefined){
            setimagen({
                imagen:agregarimg,
                file:URL.createObjectURL(agregarimg)
            })}
    }     
//seleccionar el pdf 
    const seleccionarPdf=pdf=>{

          
        

        
        const agregarpdf=pdf.target.files[0]
             if(agregarpdf!=undefined){            
             
                    setpdf({
                        pdf:agregarpdf,
                        file:URL.createObjectURL(agregarpdf)
                    })
                                
                setLink(null)
            }

}
 //remover etiqueta 
//manejar snapshot 

function manejarSnapshot(snapshot){
    console.log('mapeo')
    const  lista =snapshot.docs.map(doc=>{
        return{
            id:doc.id,
            ...doc.data()
        }
    })
    setetiquetas(lista)    
}

//llamar etiquetas
const llamarEtiquetas=()=>{
    console.log("paso por aqui")
    firebase.db.collection("etiquetas").orderBy("descripcion").onSnapshot(manejarSnapshot)
    llamarRegiones()
    llamarTipoInformacion()
  }
// llamar regiones
  const llamarRegiones=async()=>{
      const consulta=await FuncionesFirebase.llamarRegion()
      setregion(consulta)
  }
// llamar regiones 
  const llamarTipoInformacion=async()=>{
      const consulta=await FuncionesFirebase.llamarTopicos()
      setinformacion(consulta)
  }
// validaciones 

// primera validacion de vacio 
const validacionuno=()=>{
    let prueba={}
    //validar errores 
    if(paper.titulo==""){
            prueba.titulo="el titulo es requerido"
    }
    if(paper.resumen==""){
            prueba.resumen="el resumen es requerido"
    }
    if(pdf.file==null &&  link==undefined){
        prueba.pdf=" debe subir un archivo .pdf o agregar una URL"
}
  return prueba
}
//nuevo paper 
const NuevoPaper=async()=>{
    setcargando(true)
    set_mensaje_informativo("...verificando informacion")
      let  errores  = validacionuno()
      seterrores(errores)
    if(Object.keys(errores).length){
    }else{   

        const respuesta=await IngresarPaper()

        if(respuesta){


        

            swal.fire({
                icon: 'success',
                title: "Guardado!",
                confirmButtonColor: '#21cbce',
                
              }).then(()=>{
                  props.history.push("/")
                  set_mensaje_informativo("")
                 
              })
            


        }else{
            swal.fire({
                icon: 'Error',
                title: "Ha ocurrido un problema!",
                text: "intentalo mas tarde ",
                timer: 1500
              })
              set_mensaje_informativo("")
        }
    }
    // agregar paper 
    /*
      paper.subida=new Date()
    const id = await firebase.db.collection("paper").add(paper).then((docRef) => {
        //console.log("Document written with ID: ", docRef.id);

        return docRef.id
    })
    const pdf =await subirPDF(id)
     const img =await subirImagen(id)   
     firebase.db.collection("paper").doc(id).update({
            imagen:img,
            pdf:pdf

     })
  
 
    paper=({...paper,
            pdf:pdf,
            imagen:img,
            etiquetas:tag
    })
        // ver los valores de paper 
      
// retornar al inicio 
    */  
   setcargando(false)
}
// ingresar paper  despues de las validacion 
const IngresarPaper=async()=>{
try {
    //fecha
    paper.subida=new Date()
    //titulo para la busqueda 
    paper.busqueda=paper.titulo.toLocaleLowerCase()
    //crear paper y retornar el id 
    const id = await firebase.db.collection("paper").add(paper).then((docRef) => {
        //console.log("Document written with ID: ", docRef.id);
        return docRef.id
    })
    set_mensaje_informativo("...guardando imagen...")
    const img =await subirImagen(id)
    set_mensaje_informativo("...guardando PDF...")
    const pdf =await subirPDF(id)
    set_mensaje_informativo("...creando paper...")
    const tagdos=tag.map(valor=>{
                       return {id:valor.id,descripcion:valor.descripcion} 
                })
                firebase.db.collection("paper").doc(id).update({
                        imagen:img,
                        pdf:pdf,
                        etiquetas:tagdos,
                        id:id,
                        link:link,
                        TopicoInformacion:taginformacion,
                        Regiones:tagregion
                        
                })
            
                
            
                paper=({...paper,
                        pdf:pdf,
                        imagen:img,
                        etiquetas:tagdos,
                        id:id
                })


                let agregarEtiquet=[]
                
                tag.map(valor=>{

                            firebase.db.collection("etiquetas").doc(valor.id).set({
                                ...valor,
                                contar:valor.contar+1
                            })   
                             firebase.db.collection("etiquetas").doc(valor.id).collection("paper").doc(paper.id).set(paper)           

                    })
                    set_mensaje_informativo("...Finalizando")    
return true     
} catch (error) {
  
    return false 
}
}

const AddRemovePaperTag=async(tagdos,paperdos,tag)=>{     
    firebase.db.collection("etiquetas").doc(tagdos.id).collection("paper").doc(paperdos.id).set({...paperdos,
                   etiquetas:tag
                 })  
    
    // await firebase.db.collection("etiquetas").where("descripcion", "==", tagdos).get().then(valor=>
    //     {
    //     const prueba =valor.docs.map(objeto=>{return{id:objeto.id,...objeto.data()}})    
    //         prueba.map(val1=>{
    //             firebase.db.collection("etiquetas").doc(val1.id).collection("paper").doc(id).set({...paperdos,
    //             etiquetas:tag
    //             })  
                        
    //         })
    //     }
        
    //     )
    }
  // actualizar paper
  const ActualizarPaper=async()=>{

    setcargando(true)
    const imgURL=await subirImagen(id)
    const pdfURL=await subirPDF(id)
    //console.log(paper.etiquetas)
    // etiquetas antiguos 
    let etiquetasOld=paper.etiquetas
    let newTag=[]
        tag.map(async(tagOld)=>{
            etiquetasOld.map(async (tagNew)=>{
                if(tagNew!=tagOld){
                             
                            newTag.push({...tagNew,contar:tagNew.contar+1})

                }else{

                            newTag.push(tagOld)
                }


        })})






 let paperSuplente={
    ...paper,
    imagen:imgURL,
    pdf:pdfURL,
    etiquetas:tag,
    TopicoInformacion:taginformacion,
    Regiones:tagregion,
    link:link,
    busqueda:paper.titulo.toLocaleLowerCase()
}

     await firebase.db.collection("paper").doc(id).update(paperSuplente).then(valor=>{
       
    })



       //borrar papers anteriores  de las etiquetas
     
       etiquetasOld.map(async(tagOld)=>{
              tag.map(async (tagNew)=>{
                         if (tagNew.id!=tagOld){
 
                                                     
                                                    // se edita dentro de la etiqueta el nuevo paper      
                                                 await firebase.db.collection("etiquetas").doc(tagNew.id).collection("paper").doc(paper.id).set({...paper,
                                                     etiquetas:tag
                                                   }).then(()=>{
                                                 
                                                         
 
                                                     firebase.db.collection("etiquetas").doc(tagNew.id).set({
                                                                 ...tagOld,
                                                                 contar:tagOld.contar+1
                                                         })
 
 
                                                     }).catch((error)=>{
                                                     console.log(error)
                                                 })
 
 
                                                     //se borra si esta en tagOld
                                                     //se borra el paper dentro de la etiqueta
                                                 await firebase.db.collection("etiquetas").doc(tagOld.id).collection("paper").doc(paper.id).delete().then(()=>{
                                                     //se reduce en una la etiqueta
                                                     firebase.db.collection("etiquetas").doc(tagOld.id).set({
                                                                 ...tagOld,
                                                                 contar:tagOld.contar-1
                                                         })
 
 
                                                     }).catch((error)=>{
                                                     console.log(error)
                                                 })
 
 
                         }
 
 
 
                 })
 
 
                         
                     
 
                             // si no coincide con valor borrar la etiqueta 
 
                             
 
 
                             // await firebase.db.collection("etiquetas").where("descripcion", "==", tagOld).get().then(valor=>
                             //     {
                             //         const prueba =valor.docs.map(objeto=>{return{id:objeto.id,...objeto.data()}})    
                             //         prueba.map(val1=>{
                         
                             //             firebase.db.collection("etiquetas").doc(val1.id).collection("paper").doc(id).delete().then(()=>
                             
                             //             console.log("se borro el registro ")
                             //             ).catch((error)=>{
                             //                 console.log(error)
                             //             })
                                         
                             //         })
                             //     }
                                 
                             //     )
                         
                         }
                     )
 
 // tengo que agregrar  las etiquetas y borrar las 
//¿que pasa si se repite ??

    tag.map(async(tagEv)=>{
        try {

            AddRemovePaperTag(tagEv,paperSuplente,tag)
            
                            // crear y  remover paper de las etiquetas 
           } catch (error) {
                console.log(error)
                }


    })





    /* agregar fecha
     const img =await subirImagen(id)
*/
setcargando(false)
props.history.push("/")
swal.fire(
    'Confirmado',
    'Registro actualizado',
    'success'
  )

}
// actualizar paper
const ActualizarPaperDos=async()=>{
    setcargando(true)

    set_mensaje_informativo("...verificando informacion...")
    
    paper.link=link

    set_mensaje_informativo("...actualizando imagen...")
    const imgURL=await subirImagen(id)
    set_mensaje_informativo("...actualizando PDF...")
    const pdfURL=await subirPDF(id)
    set_mensaje_informativo("...actualizando paper...")
 
    let etiquetasOld=[]
    
    paper.etiquetas.map(valor=>{     
        etiquetas.map(valordos=>{
        

                        if(valordos.id==valor.id){
                          etiquetasOld.push(valordos)
                        }
        })
    })

    console.log(etiquetasOld)
  
    let newTag=[]
    let deleteTag=[]
// las nuevas etiquetas 

if(tag.length>=etiquetasOld.length){ 


    const results = tag.filter(({ id: id1 }) => !etiquetasOld.some(({ id: id2 }) => id2 === id1));

    newTag=results

}
 
if(tag.length<=etiquetasOld.length){
    const results = etiquetasOld.filter(({ id: id1 }) => !tag.some(({ id: id2 }) => id2 === id1));
    deleteTag=results
    
    // etiquetasOld.map(viejo=>{
   
    //                         console.log(viejo)
    //                         if(tag.length!=0){
    //                         tag.map(nuevo=>{
    //                             console.log(nuevo)
    //                             if(nuevo.id!=viejo.id){
    //                                 console.log(viejo)
    //                                 deleteTag.push({...viejo,contar:viejo.contar-1})   

    //                             }
    //                         })}else{
    //                             console.log("paso por ac??")
    //                             deleteTag.push({...viejo,contar:viejo.contar-1})   

    //                         }
    //             })

}
let tagDefinitivo=tag.map(valor=>{

            return{
                id:valor.id, 
                descripcion:valor.descripcion,
            }    
})

let paperSuplente={
    ...paper,
    imagen:imgURL,
    pdf:pdfURL,
    etiquetas:tagDefinitivo,
    TopicoInformacion:taginformacion,
    Regiones:tagregion,
    busqueda:paper.titulo.toLocaleLowerCase()
}


deleteTag.map(valor=>{

    firebase.db.collection("etiquetas").doc(valor.id).update({...valor,contar:valor.contar-1})
    firebase.db.collection("etiquetas").doc(valor.id).collection("paper").doc(paperSuplente.id).delete().then(()=>{console.log("borrado")}).catch(error=>console.log(error))

})

newTag.map(valor=>{   
    firebase.db.collection("etiquetas").doc(valor.id).update({...valor,contar:valor.contar+1})
    firebase.db.collection("etiquetas").doc(valor.id).collection("paper").doc(paperSuplente.id).set(paperSuplente).then(()=>{console.log("agregado")}).catch(error=>console.log(error))

})
  //  actualizar el paper 
    console.log(paperSuplente)

    firebase.db.collection("paper").doc(paperSuplente.id).update(paperSuplente)


    props.history.push("/")
    swal.fire(
        'Confirmado',
        'Registro actualizado',
        'success'
      )


      set_mensaje_informativo("")
setcargando(false)


 
                 }
 
 
                         
                     
 
                             // si no coincide con valor borrar la etiqueta 
 
                             
 
 
                             // await firebase.db.collection("etiquetas").where("descripcion", "==", tagOld).get().then(valor=>
                             //     {
                             //         const prueba =valor.docs.map(objeto=>{return{id:objeto.id,...objeto.data()}})    
                             //         prueba.map(val1=>{
                         
                             //             firebase.db.collection("etiquetas").doc(val1.id).collection("paper").doc(id).delete().then(()=>
                             
                             //             console.log("se borro el registro ")
                             //             ).catch((error)=>{
                             //                 console.log(error)
                             //             })
                                         
                             //         })
                             //     }
                                 
                             //     )
                      
 // tengo que agregrar  las etiquetas y borrar las 
//¿que pasa si se repite ??

    // tag.map(async(tagEv)=>{
    //     try {

    //         AddRemovePaperTag(tagEv,paperSuplente,tag)
            
    //                         // crear y  remover paper de las etiquetas 
    //        } catch (error) {
    //             console.log(error)
    //             }


    // })





    /* agregar fecha
     const img =await subirImagen(id)
*/







  // subir imagen 

  const subirImagen =async(id)=>{
        // prueba de usuario 



    

        // subir  imagen
            if(imagen.imagen!==null){


                    if(imagen.imagen instanceof File){
                        const imgRef=await firebase.storage.ref().child("IMAGEN").child(id)
                        await imgRef.put(imagen.imagen)
                        const imgURL=await imgRef.getDownloadURL() 
                        return imgURL
                    }else{
                        return imagen.file 
                    }
            }else{
                setpaper({...paper,imagen:""})
             return null
            }

  }


  const subirPDF =async(id)=>{
  


    // subir  imagen
        if(pdf.pdf!==null){

                   if(pdf.pdf instanceof File){ 
                        const pdfRef =  firebase.storage.ref().child("PDF").child(id)
                        console.log()   
                        await pdfRef.put(pdf.pdf)
                        const pdfURL=await pdfRef.getDownloadURL()
                        return pdfURL
                   }else{
                        return pdf.file
                   }
        }else{
            
            return null
   
        }

}


const AgregrarLink=async()=>{

    const { value: url } = await swal.fire({
        input: 'url',
        inputLabel: 'URL',
        inputPlaceholder: 'Ingrese direccion URL',
        showConfirmButton:"true",
        confirmButtonText:"Guardar",
        confirmButtonColor:"#21cbce",
        validationMessage:"URL invalida",
        denyButtonText:"Cancelar",
        showDenyButton:"true"
    
    
    })
      
      if (url) {


        setLink(url)
        setpdf({file:null,pdf:null})
        //si existe el id 
        console.log(id)
        if(id){


            try {
                await firebase.storage.ref().child("PDF").child(id).delete().then(function() {
                    //console.log("borrado")
                    // File deleted successfully
            }).catch(function(error) {

                            console.log(error)
                    //console.log(error)
                    // Uh-oh, an error occurred!m   
            });          

            } catch (error) {
                console.log(error)
            }
            //borrar  pdf
           
        }

       


        swal.fire({     
            icon: 'success',
            title: '¡URL Guardada!',
            showConfirmButton: false,
            timer: 1500
          })
      }
}

const actualizarState=(e)=>
{
    e.preventDefault()
    setpaper({
        ...paper,[e.target.name]:e.target.value
    })

}



useEffect(() => {
    console.log('prueba de consumo crear paper')
    const {id}=props.match.params
   
 
    if(usuario==null){
        props.history.push("/")

    }else{
        
        if(!usuario.administrador){
            props.history.push("/")
        }
    }



    // validar si editar o borrar
    editorcreate(id)

    // armar etiquetas

    
    
   llamarEtiquetas()




}, [errores,usuario])

const editorcreate= async (id)=>{

    if(id){
        setcargando(true)
        setid(id)
      const test=  await firebase.db.collection("paper").doc(id).get().then((doc)=>{
          console.log(doc)
            if(doc.exists){
                console.log("Document data:", doc.data());
                return doc.data()
            }else{
                console.log("No such document!");
            }

      }) 
      // 

      setimagen({
            file:test.imagen
      })  
      setpdf({
        file:test.pdf
  })  
  setLink(test.link)


  
  settag(test.etiquetas)
  if(test.Regiones!=undefined){
 
    settagregion(test.Regiones)
  }
  if(test.TopicoInformacion!=undefined){
  settaginformacion(test.TopicoInformacion)
}
      
    //   test.etiquetas.map((valor)=>{
       
    //      settag(prev=>[...prev,valor.descripcion])

    //   }) 


      await  setpaper(test)
      setcargando(false)
    
    }

}

    return (
 
        <div className={clases.root}  >           
            <div>                   
            </div>

            <Grid contaiginer>
                <Grid xs={4}  sm={2} md={4}>

                </Grid>

                <Grid xs={12} sm={8} md={4}>


                        {cargando?
                        <div>                 
                        <div className={clases.divCircular} >
                            <CircularProgress className={clases.circular}></CircularProgress>

                            <Typography  className={clases.estilo_mensaje_informativo} align="center" variant="h5">
                                            {mensaje_informativo}
                                    </Typography>:

                        </div>
                              </div> :
                        <div className={clases.divPrincipal}>

                                        {id?

                                        <Typography className={clases.margenArriba} align="center" variant="h3">
                                            Editar Paper
                                    </Typography>:

                                        <Typography className={clases.margenArriba} align="center" variant="h3">
                                        Nuevo Paper
                                        </Typography>
                                    
                                    }


                    <Typography align="center"  >
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="titulo"
                                    label="Titulo"
                                    name="titulo"
                                    autoComplete="titulo"
                                    onChange={actualizarState}
                                    
                                    value={paper.titulo}   



                                   
                                    />




                       {errores.titulo?

                        <Alert
                        
                        action={
                            <IconButton
                              aria-label="close"
                              color="inherit"
                              size="small"
                              onClick={() => {
                               seterrores({
                                   ...errores,titulo:null
                               })
                              }}
                            >
                           <CloseIcon></CloseIcon>

                            </IconButton>
                            }
                        
                        severity="error">{errores.titulo}</Alert>

                            :

                        <div></div>

                       }                 
                      



                    </Typography>
                    <Typography align="center" >
                    <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="resumen"
                                    label="Resumen"
                                    name="resumen"
                                    multiline
                                     rowsMax={4}
                                    autoComplete="resumenrafce"
                                    onChange={actualizarState}
                                 
                                    value={paper.resumen}
                                 
                                    />





                    </Typography>
                   
                    <Typography align="center" >


                        {errores.resumen?

                        <Alert
                        action={
                            <IconButton
                              aria-label="close"
                              color="inherit"
                              size="small"
                              onClick={() => {
                               seterrores({
                                   ...errores,resumen:null
                               })
                              }}
                            >
                           <CloseIcon></CloseIcon>

                            </IconButton>
                          }
                        
                        severity="error">{errores.resumen}</Alert>

                            :

                        <div></div>

                        }               


                    </Typography>
                   
                    <SliderNota quality={paper.likes} paper={paper} setpaper={setpaper}></SliderNota>

                        



                    <Typography align="center" >
            <AutocompletarTres label='Region' firebase="Region" descripcion="Region" etiquetas={region} tag={tagregion} settag={settagregion}   llamarEtiquetasDos={llamarEtiquetas}
                     ></AutocompletarTres>
            </Typography>       

             <Typography align="center" >

                <AutocompletarTres label='Topico Ambiental' firebase="etiquetas" descripcion="Etiquetas" etiquetas={etiquetas} tag={tag} settag={settag}   llamarEtiquetasDos={llamarEtiquetas}
                ></AutocompletarTres>

                </Typography>

           
            <Typography align="center" >
            <AutocompletarTres label="Tipo de informacion" firebase="TopicoInformacion" descripcion="Topico de informacion" etiquetas={informacion} tag={taginformacion} settag={settaginformacion}   llamarEtiquetasDos={llamarEtiquetas}
                     ></AutocompletarTres>
            </Typography>

                {id?
                     <Typography align="center" >
                     <Button
                     color="secondary"
                     variant="contained"
                     style={{}}
                     endIcon={<AddIcon></AddIcon>}
                     onClick={()=>ActualizarPaperDos()}
                     >
     
                            Actualizar Paper
                     </Button>
                 
                 </Typography>
                :


                <Typography align="center" >
                <Button
                color="secondary"
                variant="contained"
                className={clases.margenButton}
                endIcon={<AddIcon></AddIcon>}
                onClick={()=>NuevoPaper()}
                >

                        Agregar Paper
                </Button>
            
            </Typography>
            
            }
                                    
                    <Typography align="center" >

                            <div>
                                    <input
                                    type="file"
                                    id="pdf"
                                    accept=".pdf" 
                                    style={{display:"none"}}
                                    onChange={(e)=>seleccionarPdf(e)}
                                    >
                                    </input>
                                <Button variant="contained"
                                        color="primary"
                                      
                                        className={clases.margenButtonDos}
                             
                                >
                                <label
                                  style={{padding:"6px 36px"}}
                                  htmlFor="pdf"
                                    >
                                        agregar PDF
                                  
                                    </label>
                         </Button>     

                         <IconButton color="primary" aria-label="agregrar link"
                         onClick={()=>{

                            AgregrarLink()
                         }}
                         >
                            <LinkIcon />
                        </IconButton>
                            </div>


                            {errores.pdf?

                        <Alert
                        
                        
                        action={
                            <IconButton
                              aria-label="close"
                              color="inherit"
                              size="small"
                              onClick={() => {
                               seterrores({
                                   ...errores,pdf:null
                               })
                              }}
                            >
                           <CloseIcon></CloseIcon>

                            </IconButton>
                        }
                        
                        severity="error">{errores.pdf}</Alert>

                            :

                        <div></div>

                            }                 




                    </Typography>
           






           
                    <Typography align="center" >
                        {
                        
                        pdf.file&&
                        
                        <div style={{ height: '750px' }}>
                        <div
                                style={{
                                    border: '1px solid rgba(0, 0, 0, 0.3)',
                                    height: '100%',
                                    margin:"50px auto"
                                }}
                            >
                       
                                   <iframe style={{height:"100%",width:"100%",}} src={pdf.file}></iframe> 
                            </div>                   

                        </div>
                
                    
                       }
                          
                    </Typography>

                    {link&&     
                    <div>
                        <a  target="_blank" href={link}>
                        <Typography variant="subtitle1" align="center" >
                        
                        {link}
                        </Typography>
                        </a>
                     </div>
                    }
                   </div>
                   }
                </Grid>
                <Grid xs={4} sm={2}  md={4}>

            
                    
                </Grid>

            </Grid>
            
   
            
                       
     </div>
    )
}

export default CrearPaper
