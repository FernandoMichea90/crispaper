import React,{useState} from 'react'
import {Grid,TextField,Button,Typography} from '@material-ui/core'
import Estilos from '../../Componetes/Estilos'
import FuncionesFirebase from '../../Funciones/FuncionesFirebase'
import Swal from 'sweetalert2'
import Cargando from '../../Componetes/Cargando'

const AdminComponentes = (props) => {
const estilos=Estilos()
const [guardarCargando, setguardarCargando] = useState(false)
const [state, setstate] = useState(props.componente)
const [imagen, setimagen] = useState({file:null,imagen:null})
const index=props.index
const actualizar=(e)=>{
    e.preventDefault()
    setstate({...state,[e.target.name]:e.target.value})
}

const cambiarImagen=imagen=>{
    const agregarImagen=imagen.target.files[0]
    if(agregarImagen!=undefined){
        setimagen({imagen:agregarImagen,file:URL.createObjectURL(agregarImagen)})
        setstate({...state,
            foto:URL.createObjectURL(agregarImagen)  
        })
    }
}
const editarComponente=async()=>{    
    setguardarCargando(true)

    try{
        switch(index){
            case 0:
            if(imagen.imagen!==null){   
            let prueba= await FuncionesFirebase.subirImagenWhy('ComponenteUno',imagen)
            state.foto=prueba
             }
            await FuncionesFirebase.editarComponenteUno(state)  
            break;
            case 1:

            if(imagen.imagen!==null){
            state.foto=await FuncionesFirebase.subirImagenWhy("ComponenteDos",imagen)
            }
            await FuncionesFirebase.editarComponenteDos(state)  
            break
            case 2:
            if(imagen.imagen!==null){
            state.foto=await FuncionesFirebase.subirImagen('ComponenteTres',imagen)
            }
            await FuncionesFirebase.editarComponenteTres(state)
            break
        }

        Swal.fire('Exito!','se han guardados los cambios','success')
        setguardarCargando(false)
    
    }catch(e){
        console.log("hubo un error")
        console.log(e)
        Swal.fire("Error","ups! ha ocurrido un error","error")
    }
}


    return (
        <div className={estilos.margenAdmynWhy}>

            {guardarCargando ?
            
                <Cargando></Cargando>
                :
                <Grid container>
                <Grid xs={12} md={4}>
                
                    <div>
                    <div className={estilos.divImgWhyDos}>     
                    <img src={state.foto} style={{width:'100%',height:'100%'}} ></img>           
                    </div>
                    <div>
                        <Typography align="center" >

                        <input 
                            type="file"
                            id={"subir"+index}
                            accept="image/*"
                            style={{display:"none"}}
                            onChange={(e)=>cambiarImagen(e)}
                        />

                         <Button
                            variant='outlined'
                            className={estilos.botonVerde + ' '+estilos.margenBotonImagen}
                         >
                           <label 
                            htmlFor={"subir"+index}
                           >     
                             Cambiar imagen
                           </label>     
                         </Button>
                        </Typography>    
                    </div>
                    </div>
                </Grid> 
                <Grid xs={12} md={8}>        
                       <TextField
                        fullWidth
                        value={state.titulo}  
                        variant='outlined'
                        label='Titulo'
                        name='titulo'
                        onChange={actualizar}
                       >
                        </TextField>     
                        <TextField
                        onChange={actualizar}
                        fullWidth
                        value={state.descripcion}  
                        variant='outlined'
                        label='Descripcion'
                        name='descripcion'
                        multiline 
                        rowsMax={8}
                       >
                        </TextField>                         
                </Grid> 
                <Grid xs={12} md={12}>
                    <Typography align="right">
                    <Button variant='outlined   ' className={estilos.botonVerde}
                    onClick={()=>editarComponente()}                 
                    >
                    Guardar
                    </Button>
                    </Typography>

                 
                </Grid>
            </Grid>
                
        }

          
          
        </div>
    )
}

export default AdminComponentes
