import { Typography } from '@material-ui/core'
import React,{useEffect, useState} from 'react'
import Swal from 'sweetalert2'
import FuncionesFirebase from '../../../Funciones/FuncionesFirebase'
import Formulario from './Formulario'
import Tabla from './Tabla'
import Cargando from '../../../Componetes/Cargando'


const AdmRegion = () => {
    const [region, setregion] = useState({
        descripcion:''
    })
    const [errores, seterrores] = useState({
        descripcion:null
    })
    const [regiones, setregiones] = useState([])
    const [cargando, setcargando] = useState(false)
    const handleChange=(e)=>{
        e.preventDefault()
        setregion({...region,[e.target.name]:e.target.value})
    }
    const validar=()=>{
        let err={}
       
            if(region.descripcion.trim()==''){
                console.log('dentro')
                err.descripcion='este campo es requerido'
            }
        console.log(err)
            return err
    }
  
    const Guardar=async()=>{
       let erro= validar()  
        if(Object.keys(erro).length){
            Swal.fire('Error','ha ocurrido un error','error')
        }else{
            setcargando(true)
            let repetido=await FuncionesFirebase.noRepeatRegion(region)
            if(repetido){
                Swal.fire('Dato repetido','El registro ya existe','warning')
            }else{
                GuardarRegion()
                Swal.fire('Exito!','Informacion Guardada','success')
            }
            setcargando(false)
        }
        console.log(erro)
        seterrores(erro)
    }

    const GuardarRegion=async()=>{
        region.descripcion=region.descripcion.toLowerCase().trim()
        await FuncionesFirebase.guardarRegion(region)
        setregiones([...regiones,region])
        setregion({descripcion:''})
    }



    //llamar a los topicos e regiones en el useEffect 
    const llamarRegiones=async()=>{
        let lista =[]
        lista =await  FuncionesFirebase.llamarRegion()
        setregiones(lista)

    }

    // borrar region 
const borrar =(state)=>{
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
            await FuncionesFirebase.borrarRegion(state)
            setcargando(false)
          Swal.fire('Borrado!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('El registro no ha sido borrado', '', 'info')
        }
      })
}

     //filtrar nuevo state  
     const filtrar=(state)=>{
        var filtered = regiones.filter(function(el) { return el.id != state.id ; }); 
        setregiones(filtered)
     }
     // editar region
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
    let repetido=await FuncionesFirebase.noRepeatRegion(state)
    console.log(repetido)
    if(repetido==false){ 
    let editado=await FuncionesFirebase.editarRegion(state)
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
    llamarRegiones()
        
    }, [])
    return (
        <div>
            <Typography align="center" variant='h3'>
                Regiones
            </Typography>
            <Formulario label='Region' state={region} Guardar={Guardar} handleChange={handleChange} errores={errores}></Formulario>
            {cargando?
                  <Cargando></Cargando>:

                  <Tabla data={regiones} editar={editar} borrar={borrar}></Tabla>
                }
                  
        </div>
    )
}

export default AdmRegion
