import { Grid, Typography,Button,TextField } from '@material-ui/core'
import React,{useState,useEffect} from 'react'
import Swal from 'sweetalert2'
import FuncionesFirebase from '../../../Funciones/FuncionesFirebase'
import Formulario from './Formulario'
import Tabla from './Tabla'
import Cargando from '../../../Componetes/Cargando'

const AdmInformacion = () => {
 
    const [informacion, setinformacion] = useState({descripcion:''})
    const [errores, seterrores] = useState({descripcion:''})
    const [tipoInformacion, settipoInformacion] = useState([])
    const [cargando, setcargando] = useState(false)
    const handleChange=(e)=>{
        e.preventDefault()
        setinformacion({...informacion,[e.target.name]:e.target.value})
    }
    const validar=()=>{
        let err={}
    if(informacion.descripcion.trim()==''){
        err.descripcion='este campo es requerido'
    }
    return err
    }
    const Guardar=async()=>{
        let erro=validar()
        if(Object.keys(erro).length){
            Swal.fire('Error','Ha ocurrido en un error','error')
        
        }else{
            let repetido=await FuncionesFirebase.noRepeatInfo(informacion)
            if(repetido){
                Swal.fire('Dato repetido','El registro ya existe','warning')
            }else{
                GuardarInformacion()
                Swal.fire('Exito!','Informacion Guardada','success')
            }

        }
        seterrores(erro)
    }
// guardar en la base de datos 
    const GuardarInformacion=async()=>{
        informacion.descripcion=informacion.descripcion.toLowerCase()
        await FuncionesFirebase.guardarTopicoInformacion(informacion)
        settipoInformacion([...tipoInformacion,informacion])
        setinformacion({descripcion:''})

    }
    //  llamar a los tipo de informcion en un useEffect 
     const llamarTipoInformacion=async()=>{
         let lista =[]
         lista= await FuncionesFirebase.llamarTopicos()
         settipoInformacion(lista)
         
     }

     //borrar topico de informacion 
     const borrar=async(state)=>{
        Swal.fire({
            title: `Estas seguro que deseas borrar '${state.descripcion}' ?`,
            showDenyButton: true,
            confirmButtonText: 'Borrar',
            denyButtonText: `Cancelar`,
          }).then(async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                setcargando(true)
                filtrar(state)
                await FuncionesFirebase.borrarInfo(state)
                setcargando(false)
              Swal.fire('Borrado!', '', 'success')
            } else if (result.isDenied) {
              Swal.fire('El registro no ha sido borrado', '', 'info')
            }
          })
     }

     //filtrar nuevo state  
     const filtrar=(state)=>{
        var filtered = tipoInformacion.filter(function(el) { return el.id != state.id ; }); 
        settipoInformacion(filtered)
     }
     //Editar informacion
     const editar=async(state)=>{
    let descripcionAntiguo=state.descripcion
    const { value: descripcion } = await Swal.fire({
  title: 'Ingrese su nueva informacion',
  input: 'text',
  inputLabel: 'Descripcion',
  inputValue: state.descripcion,
  showCancelButton: true,
  inputValidator: (value) => {
    if (!value) {
      return 'debes completar la informacion!'
    }
  }
})


if (descripcion) {
setcargando(true)
state.descripcion=descripcion
//validar no repetido
let repetido=await FuncionesFirebase.noRepeatInfo(state)
console.log(repetido)
if(repetido==false){ 
let editado=await FuncionesFirebase.editarTopicoInformacion(state)
if(editado){ 
Swal.fire(`Su informacion ha sido modificada a  '${descripcion}'`)
}else{
Swal.fire(`Error`,'su informacion no ha sido editada','error')
}}else{
    state.descripcion=descripcionAntiguo
    Swal.fire(`Error`,'el registro ya existe','error')
}
setcargando(false)
}
     }
    useEffect(() => {
       // llamar a la  lista de tipo de informacion 
       llamarTipoInformacion()
    }, [])
    return (
        <div>
            <Typography align="center" variant='h3'>
                Tipo de informacion 
            </Typography>
            <Grid container>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                  <Formulario  label="Tipo de informacion" state={informacion} Guardar={Guardar} handleChange={handleChange} errores={errores}></Formulario>
                  {cargando?
                  <Cargando></Cargando>:

                  <Tabla data={tipoInformacion} editar={editar} borrar={borrar}></Tabla>
                }
                  
                </Grid>
                <Grid item xs={2}></Grid>

            </Grid>
            
        </div>
    )
}

export default AdmInformacion
