import React,{useState} from 'react'
import { makeStyles,IconButton, Grid, TextField, Button, Typography,CircularProgress} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import Firebase from "../firebase/firebase"
import Swal from "sweetalert2"

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const useStyles=makeStyles((theme)=>({


    root:{

        marginTop:"60px",

        " & .MuiButton-containedPrimary:hover" :{
            backgroundColor: "#303f9f00",
            color:"#5fcccf",
            border:"1px solid"
        },
    }            
,
    textField:{
        margin:"15px 0px",
        width:"95%"
    },
    divCircular:{
        marginTop:"100px"

    },
    
    circular:{
        height:"72px !important",
        width:"72px !important",
        display:"block",
        margin:"auto"
        },

    boton:{

    /* margin: 5px; */
    margin: "25px 25px 80px auto",
    display: "block",
    width:"300px",
    [theme.breakpoints.down("xs")]:{
        margin: "25px auto 80px auto",
        width:"290px"
    }

        },

    alerta:{
            margin:"0px 0px",
            width:"90%"

    },
    titulo:{

        marginBottom:"60px"
    }
    




}))




const CrearCuenta = (props) => {
    const clases=useStyles()

    const [cuenta, setcuenta] = useState({
        nombre:"",
        correo:"",
        password:"",
        confirmar:""
    })

  const [errores, seterrores] = useState({
        nombre:null,
        correo:null,
        password:null,
        confirmar:null


  })
  const [cargando,setcargando]=useState(false)


 const usuariosRef=Firebase.db.collection("usuarios")






    const actualizarState=(e)=>{
        e.preventDefault()

        setcuenta({...cuenta,
        [e.target.name]:e.target.value
        })


    }


    const validar=()=>{
       
            let err={}


        if(cuenta.nombre==""){


            err.nombre="debes ingresar tu nombre"


        }
        if(cuenta.correo==""){

            
            err.correo="debes ingresar tu correo"

        }else{
             if( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(cuenta.correo) ) {
                err.correo= "Email no válido"
            }

        }
        if(cuenta.password==""){

           err.password="debes ingresar tu contraseña"
        }
        if(cuenta.confirmar==""){

           
            err.confirmar="debes  confirmar tu contraseña"

        }else{
                if(cuenta.confirmar!=cuenta.password){

                        err.confirmar="tu contraseña no coincide"
                      
                }

        }

            return err

    }


    const guardar= ()=>{
        setcargando(true)    
        let err= validar()
        seterrores(err)
        if(Object.keys(err).length){
          
              setcargando(false)
        }else{







            Firebase.registrar(cuenta).then(async()=>{



                let usuariosRegistrar={
                    correo:cuenta.correo,
                    nombre:cuenta.nombre,
                    photoURL:null
                }



                await usuariosRef.doc(usuariosRegistrar.correo).set(usuariosRegistrar)


                props.history.push("/login")
                Swal.fire({
                       title:"Cuenta creada correctamente",
                       icon:"success"
                })

            }).catch(error=>{
                console.log(error)
                let mensaje=""
                let titulo=""
                titulo=error.code
                mensaje=error.message
                
                //desde aca se atrapan los errores
                if(error.code=="auth/weak-password"){
                    titulo="Contraseña Debil"    
                    mensaje="La contraseña debe tener al menos 6 caracteres"
                }


                //desde aca se atrapan los errores
                if(error.code=="auth/email-already-in-use"){
                    titulo="correo electrónico ya en uso"    
                    mensaje="La dirección de correo electrónico ya está siendo utilizada por otra cuenta."
                }

                Swal.fire({
                    title:titulo,
                    text:mensaje,
                    icon:"info"
             })
            })
            setcargando(false)
    }}


    return (
        <div className={clases.root}>


            <Typography className={clases.titulo} align="center" variant="h3">

                Crear Cuenta 
            </Typography>
            

              {
                   cargando? 
                            <div className={clases.divCircular} >
                            <CircularProgress className={clases.circular}></CircularProgress>
                            </div>
                   
                   
                    :
              

            <Grid container>
               <Grid xs={12} md={3}   ></Grid> 
               <Grid xs={12} md={6}  >

                    <TextField 
                      fullWidth
                      className={clases.textField}
                      placeholder="Ingrese su nombre"
                      variant="outlined"
                      label="Nombre"
                      name="nombre"
                      onChange={actualizarState}
                       ></TextField>


{errores.nombre?

<Alert    className={clases.alerta}
action={
    <IconButton
      aria-label="close"
      color="inherit"
      size="small" 
   
      onClick={() => {
       seterrores({
           ...errores,nombre:null
       })
      }}
    >
   <CloseIcon></CloseIcon>

    </IconButton>
    }

severity="error">{errores.nombre}</Alert>

    :

<div></div>

}        

                    <TextField 
                      fullWidth
                      className={clases.textField}
                      placeholder="Ingrese su correo"
                      variant="outlined"
                      label="Correo"
                      name="correo"
                      onChange={actualizarState}
                       ></TextField>


{errores.correo?

<Alert     className={clases.alerta}

action={
    <IconButton
      aria-label="close"
      color="inherit"
      size="small" 
   
      onClick={() => {
       seterrores({
           ...errores,correo:null
       })
      }}
    >
   <CloseIcon></CloseIcon>

    </IconButton>
    }

severity="error">{errores.correo}</Alert>

    :

<div></div>

}        

                    <TextField 
                      fullWidth
                      className={clases.textField}
                      placeholder="Ingrese su contraseña"
                      label="Contraseña"
                      type="password"
                      variant="outlined"
                      name="password"
                      onChange={actualizarState}
                       ></TextField>

{errores.password?

<Alert     className={clases.alerta}

action={
    <IconButton
      aria-label="close"
      color="inherit"
      size="small" 
   
      onClick={() => {
       seterrores({
           ...errores,password:null
       })
      }}
    >
   <CloseIcon></CloseIcon>

    </IconButton>
    }

severity="error">{errores.password}</Alert>

    :

<div></div>

}        

                    <TextField 
                      fullWidth
                      className={clases.textField}
                      placeholder="Confirme su contraseña"
                      label="Confirme contraseña"
                      type="password"
                      variant="outlined"
                      name="confirmar"
                      onChange={actualizarState}
                       ></TextField>


{errores.confirmar?

<Alert     className={clases.alerta}

action={
    <IconButton
      aria-label="close"
      color="inherit"
      size="small" 
   
      onClick={() => {
       seterrores({
           ...errores,confirmar:null
       })
      }}
    >
   <CloseIcon></CloseIcon>

    </IconButton>
    }

severity="error">{errores.confirmar}</Alert>

    :

<div></div>

}        


                    <Button
                        variant="contained"
                        color="primary"
                        className={clases.boton}     
                        onClick={()=>guardar()}

                    >

                        Guardar
                    </Button>


               </Grid>
               <Grid xs={12} md={3}></Grid>

            </Grid>
            }
        </div>
    )
}

export default CrearCuenta
  