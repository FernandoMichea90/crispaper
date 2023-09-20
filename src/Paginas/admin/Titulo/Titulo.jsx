import { TextField,Button,Grid  } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import FuncionesFirebase from '../../../Funciones/FuncionesFirebase'
import Swal from 'sweetalert2'
import Estilos from '../../../Componetes/Estilos'


const Titulo = (props) => {
    const estilos=Estilos()
    const [titulo, settitulo] = useState({
        titulo:'',
        subtitulo:'',
        descripcion:''
        
    })

   const actualizarState=(e)=>{
       e.preventDefault()
       settitulo({...titulo,[e.target.name]:e.target.value})
   } 



   const tituloGuardar=async()=>{

        try{
            const query=await  FuncionesFirebase.guardarTitulo(titulo).then(()=>{
                Swal.fire('Exito!','Informacion guardada','success')
            })

        }catch(e){
            console.log(e)
            Swal.fire("Error","No se pudo guardar la informacion","error")
        }

   }

useEffect(async() => {
   
    const consulta =await FuncionesFirebase.pedirTitulo();
    settitulo(consulta)
}, [])



    return (
        <div>
            <Grid container>
            <Grid xs={1} md={2}></Grid>
            <Grid xs={10} md={8}>
             <TextField 
            className={estilos.tituloMargenInput}
            onChange={actualizarState}
            name='subtitulo'
            label='Subtitulo'
            value={titulo.subtitulo}
            placeholder='ingrese subtitulo test' 
            variant="outlined"  
            fullWidth           
            >
            </TextField>              
            <TextField
            className={estilos.tituloMargenInput}
            value={titulo.titulo}
            name='titulo'
            label="Titulo"
            placeholder='ingrese  titulo'
            onChange={actualizarState}
            variant="outlined"
            fullWidth
            >
            </TextField>
            <TextField
            className={estilos.tituloMargenInput}
            onChange={actualizarState}
            name='descripcion'
            label='Descripcion'

            placeholder='ingrese la descripcion'
            value={titulo.descripcion}
            variant='outlined'
            fullWidth
            >
            </TextField>
            <Button onClick={()=>tituloGuardar()}
            fullWidth
            
            className={estilos.tituloMargenInput + ' '+estilos.tituloBotonVerde}
            >
                    Guardar 

            </Button>
            <Button
            variant='contained'
            className={estilos.tituloMargenInput +' ' +estilos.botonRojo}
            onClick={()=>{props.history.push('/')}}
            fullWidth>
                volver
            </Button>
            </Grid>
            <Grid xs={1} md={2}></Grid>
            </Grid>
        </div>
    )
}

export default Titulo
