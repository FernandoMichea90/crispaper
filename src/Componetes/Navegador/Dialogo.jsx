import React ,{ useState,useEffect}from 'react'
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import {Button,TextField,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@material-ui/core'
import Estilos from '../Estilos'
import FuncionesFirebase from '../../Funciones/FuncionesFirebase'
import Swal from "sweetalert2"
import Cargando from '../Cargando'


const Dialogo = (props) => {
    const estilos=Estilos()
    const [state, setstate] = useState({
        usuario:"",
        website:"",
        comentario:""
    })
    const [cargando, setcargando] = useState(false)
    const [abierto, setabierto] = useState(props.abierto)
    const [errores, setErrores] = useState([])
    const handleClose=props.cerrar
    useEffect(() => {   
        setabierto(props.abierto)

    }, [props])


    const validaciones=()=>{

        console.log(state)
        let err=[]
        var regex= /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/
       
        if(state.usuario.trim()==""){

            err.usuario='please enter a name'

        }
        if(state.website.trim()==""){
            err.website='please enter a url'
        }
            else
        {
            if(!regex.test(state.website))
            err.website='please enter valid url'
        }
        if(state.comentario.trim()==''){
            err.comentario='please enter comment'
        }
        return err
    }
    const actualizarState=(e)=>{
        e.preventDefault()
        setstate({...state,[e.target.name]:e.target.value})
    }
    const guardarComentario=async()=>{

        try{
      
           let err=validaciones()
           console.log(err)
           if(Object.keys(err).length){
               setcargando(false)
               setErrores(err)
            
           }else{ 
            setcargando(true)
            state.fecha=new Date()
            state.anonimo=true
            await FuncionesFirebase.IngresarColaboracion(state).then(()=>{
                Swal.fire("Exito","informacion guardada","success")
                handleClose()
                setcargando(false)
            })
            }
        }catch(e){
            Swal.fire("Ups!","ha ocurrido un error","error")
            console.log(e)

        }



    }
    return (
        <div>
        <Dialog open={abierto} onClose={handleClose}>

         {cargando? 
            <>
           <DialogTitle> wait a moment...</DialogTitle>
       
            </>:
            <>
            <DialogTitle>Grow your audience by including your environmental website in PlanetColab</DialogTitle>
        <DialogContent>


        {errores.usuario!=null? 
             <TextField
             error
             autoFocus
             margin="dense"
             id="name"
             name="usuario"
             label="Name"
             fullWidth
             variant="outlined"
             onChange={actualizarState}
             helperText={errores.usuario}
           />  
            :
            <TextField
            autoFocus
            margin="dense"
            id="name"
            name="usuario"
            label="Name"
            fullWidth
            variant="outlined"
            onChange={actualizarState}
          
          />      
        }    
        {errores.website!=null?

            <TextField
            error       
            margin="dense"
            id="website"
            name='website'
            label="Website"
            placeholder='https://www.example.com'
            fullWidth
            type="url"
            variant="outlined"
            onChange={actualizarState}
            helperText={errores.website}
            />

            :
            <TextField
                    
            margin="dense"
            id="website"
            name='website'
            label="Website"
            placeholder='https://www.example.com'
            fullWidth
            type="url"
            variant="outlined"
            onChange={actualizarState}
            />



        }



    {errores.comentario?
    
    <TextField
    error
    margin="dense"
    id="comentario"
    name='comentario'
    placeholder="Please describe shortly the information included on your environmental website"
    fullWidth
    variant="outlined"
    multiline
    rowsMax={4}
    rows={4}
    onChange={actualizarState}
    helperText={errores.comentario}
  />:
  <TextField
  margin="dense"
  id="comentario"
  name='comentario'
  placeholder="Please describe shortly the information included on your environmental website"
  fullWidth
  variant="outlined"
  multiline
  rowsMax={4}
  rows={4}
  onChange={actualizarState}
/>

    }

        
          
        </DialogContent>
        <DialogActions>
          <Button className={estilos.botonRojoAlert} onClick={handleClose}>Cancel</Button>
          <Button className={estilos.botonVerdeAlert} onClick={()=>guardarComentario()}>Send</Button>
        </DialogActions>
            
            
            </>
        }   
        
      </Dialog>
            
        </div>
    )
}

export default Dialogo
