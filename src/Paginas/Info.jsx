import React,{ useEffect,useState} from 'react'
import {Typography,TextField,Grid, Button,makeStyles,IconButton,CircularProgress} from '@material-ui/core'
import Formulario from '../Componetes/Info/Formulario'
import Imagen from '../Componetes/Info/Imagen'
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';
import Firebase from '../Funciones/FuncionesFirebase'
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2"



const estilos=makeStyles((theme)=>({
    boton: {
       
            backgroundColor: '#21cbce',
            marginTop:'40px',
            color:'#FFFFFF', 
            '&:hover': {
                backgroundColor:'#FFFFFF' ,
                color:'#21cbce', 

              },

    },
    botonBasurero: {
       
        backgroundColor: '#e83f33',
        marginTop:'40px',
        marginBottom:'40px',
        color:'#FFFFFF', 
        '&:hover': {
            backgroundColor:'#FFFFFF' ,
            color:'#e83f33', 

          },

},
    alerta:{

        margin:'30px 0px 0px'
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

}))


function Alert(props) {
    const clases = estilos();
    return <MuiAlert className={clases.alerta} elevation={6} variant="filled" {...props} />;
  }



const Info = (props) => {


    const history = useHistory()
    const [link,setlink] = useState([])
    const [paper, setpaper] = useState({})
    const [imagen, setimagen] = useState({file:null,imagen:null})
    const [info, setinfo] = useState({
        id:'',
        titulo:'',
        resumen:'',
        imagen:'',
        link:[]
    })
    const [errores, seterrores] = useState({
        titulo:null,
        resumen:null,
        imagen:null,
        
    })
    const [errorUrl, seterrorUrl] = useState(false)
    const [cargando, setcargando] = useState(false)
    const clases=estilos()
    const actualizarState=(e)=>{
        e.preventDefault()
        setinfo({...info,[e.target.name]:e.target.value})
    }



useEffect(async() => {
    setcargando(true)
    const {id}=props.match.params
    //buscar  ver si el informacion  
    let retornar_paper=await Firebase.retornarPaper(id)
    

    console.log(retornar_paper)    
    if (retornar_paper!=undefined){

    setpaper(retornar_paper)   
    const retornarInfo =await Firebase.retornarInformacion(id) 
    console.log(retornarInfo)    

    if(retornarInfo!=undefined){    

        console.log(retornarInfo)  

    //agregar link 
    setlink(prevState=>[...retornarInfo.link])
    // agregar imagen  

    setimagen({file:retornarInfo.imagen})

    setinfo({...retornarInfo,id:id})
}else{

    setinfo({...retornarInfo,id:id})

}
}else{
    seterrorUrl(true)
}

    setcargando(false)

}, [errores])


const crearInfo =async()=> {

    
    //validaciones 
     let errores=validando()
    // armar parametro nuevo


    try {
        
        if(Object.keys(errores).length){
 
        }else{
            const  imgInfo=await Firebase.subirImagen(info.id,imagen)
            let newInfo={...info,link:link,imagen:imgInfo}
            console.log(newInfo)
            let respuesta=await Firebase.CrearInformacion(newInfo,paper)
            console.log(respuesta)
            props.history.push("/")            
        }
    } catch (error) {
        console.log(error)

    }
  







}
//validaciones

const validando =()=> {
    let  errores  = validacion()
    seterrores(errores)
    return errores

}


const validacion=()=>{
  
    let prueba={}

    //validar errores 

    if(info.titulo.trim()==""){
            prueba.titulo="el titulo es requerido"
    }


    if(info.resumen.trim()==""){
            prueba.resumen="el resumen es requerido"
    }

  
    if(imagen.file==null){
        prueba.imagen=" debe subir una imagen"
}

   
  return prueba


}


const borrarLink=(doc)=>{
    var arr = link
    var pos =arr.indexOf(doc)
    arr.splice(pos, 1)
    setlink([...arr])
    }


    const borrar=()=>{
        Swal.fire({
            title: '¿Esta seguro que desea borrar el siguiente registro?',
            text:`${info.titulo}`,
            showDenyButton: true,
            confirmButtonColor: '#21cbce',
            confirmButtonText: `Borrar`,
            denyButtonText: `Cancelar`,
          }).then((result) => {

            if (result.isConfirmed) {
                // Firebase.db.collection("paper").doc(e.id).delete().then(() => {
                     Firebase.BorrarInformacion(info,paper)
                   //pedirpaper()
                    history.push('/')
                console.log("borrado")

                // }).catch((error) => {
                //         console.error("Error removing document: ", error);
                // });



          }}
          )}
    
       

    return (
        <Grid container>


                    <Grid xs={12} md={2}>
                     

                     

                     </Grid>      

                     <Grid xs={12} md={8}>


                    {cargando ?

                    <div className={clases.divCircular} >
                    <CircularProgress className={clases.circular}></CircularProgress>

                    </div>

                    :
                    
                
                    errorUrl?

                        <>
                        <Typography align="center" variant="h4">
                                El registro no existe
                        </Typography>
                            <Typography align="center">
                                <a href="/">
                                    volver
                                </a>
                            </Typography>

                             </>
                        :
                
                
                <Grid container>
                <Grid xs={12} md={6}>
                    <Imagen imagen={imagen}  setimagen={setimagen}></Imagen>
                </Grid>       
                <Grid xs={12} md={6}>
                    
                    <Formulario info={info} errores={errores} actualizarState={actualizarState}  borrarLink={borrarLink}  link= {link} setlink={setlink}  ></Formulario>

                </Grid>       

                <Grid className="root" xs={12}>
                    


                    {errores.imagen!=null&& 
                       <Alert
                       action={
                           <IconButton
                             aria-label="close"
                             color="inherit"
                             size="small"
                             onClick={() => {
                              seterrores({
                                  ...errores,imagen:null
                              })
                             }}
                           >
                          <CloseIcon></CloseIcon>

                           </IconButton>
                         }
                       
                       severity="error">{errores.imagen}</Alert>

                    }

                    <Button 
                    fullWidth
                    className={clases.boton}
                    variant='contained'
                     onClick={()=>crearInfo()}
                     >

                         Agregar  Informacion
                     </Button>

                     <Button 
                    fullWidth
                    className={clases.botonBasurero}
                    variant='contained'
                     onClick={()=>borrar()}
                     >

                         Borrar informacion
                     </Button>

                </Grid>    



     </Grid>     

     
                
                }

                     </Grid>      
                     <Grid xs={2}>
                     
                     </Grid>      


                 


        </Grid>
    )
}

export default Info
