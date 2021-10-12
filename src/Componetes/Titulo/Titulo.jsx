import React ,{useState,useEffect} from 'react'
import FuncionesFirebase from '../../Funciones/FuncionesFirebase'
import {Typography} from '@material-ui/core'
import Estilos from '../Estilos'
const Titulo = () => {

    const estilos = Estilos()
const [titulo, setTitulo] = useState({
    titulo: '',
    subtitulo:'',
    descripcion:''
})      



useEffect(async() => {
   // pedir titulo a la base de datos  firebase
    const consultaTitulo=await FuncionesFirebase.pedirTitulo();
    setTitulo(consultaTitulo)



}, [])


    return (
        <div className={estilos.tituloMargen}>
            <Typography className={estilos.tituloSubtitulo} variant='h7' align='left'> 
                {titulo.subtitulo}
             </Typography >
             <Typography className={estilos.tituloTitulo} align="left" variant="h4">
                 {titulo.titulo}
             </Typography>
             <Typography align="left" variant="h6">
                 {titulo.descripcion}
             </Typography>
        </div>
    )
}

export default Titulo
