import React,{useState,useEffect} from 'react'
import {makeStyles, Grid, Typography} from '@material-ui/core'
import Select from './Select'
import FuncionesFirebase from '../../Funciones/FuncionesFirebase'
import Cargando from '../Cargando'
const estilos = makeStyles((theme)=>({
box:{
    margin:'20px 0px',
    padding:'50px',
    background:'#0000000d'
}
,divImagen:{
    position:'absolute',
    height:'74px',
    right:'50px',
    top:'26px',
    [theme.breakpoints.down("sm")]:{
        position:'static',
        margin:' 10px auto',
        width:'70%',
        height:'auto'
    }
},imagen:{
    height:'100%',
    width:'100%'
},cajabox:{
    position:"relative"
}

}))
const Busc = (props) => {
    const clases=estilos()
    const [etiquetas, setetiquetas] = useState([])
    //variable para guardar
    const [cargando, setcargando] = useState(true)

    // lista de regiones
    const [regiones, setregiones] = useState([])
    //region seleccionada
    const [region, setregion] = useState()
    // lista tipo de informacion
    const [informaciones, setinformaciones] = useState([])
    // informacion seleccionada
    const [informacion, setinformacion] = useState()
    const [topico, settopico] = useState({})  
    const [topicoNombre, settopicoNombre] = useState([])
    const handleChange=(event) => {
        settopico(event.target.value) 
    }
const pedirEtiquetas=async()=>{
    const etiquetas=await FuncionesFirebase.ListarEtiquetas()
    setetiquetas(etiquetas) 
}
const buscarporetiquetas=async(tagSelec)=>{
    const buscar = await FuncionesFirebase.buscarPorEtiquetas(tagSelec)
    props.setpaper(buscar)
}

const tagBuscando=()=>{
    let tag =props.etiquetas
    console.log('este es un tag '+ tag)
    settopico(tag.descripcion)
    
}

useEffect(() => {
    // colocar topicos
    
    
    setetiquetas(props.etiquetas)
    setregiones(props.regiones)
    setregion(props.region)
    setinformaciones(props.topicoinformacion)
    setinformacion(props.tipoinformacion)
   
  
    settopico(props.etiqueta)
    console.log('prueba consumo')
    setcargando(false)

}, [props])

    return (
        <div className={clases.cajabox}>
            {cargando==true  ?
             <Cargando></Cargando>
            :
        <div className={clases.box}>
            <Grid container>
                <Grid xs={12} md={2}>
                <Select label='Topico Ambiental' name="topicoambiental" topico={topico}  etiquetas={etiquetas} handleChange={props.handleChange} ></Select>
                </Grid>
                <Grid xs={12}  md={2}>
                <Select label='Region' name='region' topico={region}  etiquetas={regiones} handleChange={props.handleChange} ></Select>
                </Grid>
                <Grid xs={12}  md={3} >
                <Select label='Tipo de Informacion' name='tipoinformacion' topico={informacion} etiquetas={informaciones} handleChange={props.handleChange} ></Select>
                </Grid>
                <Grid xs={5}>
               
                </Grid>
            </Grid>
            {props.publicidad !=undefined &&
            props.publicidad.sponsor !=undefined &&
            <a href={props.publicidad.sponsorURL} target="_blank">
            <div className={clases.divImagen}>
                    <Typography variant="subtitle1">
                        Brougth to you by 
                    </Typography>
                    <img className={clases.imagen} src={props.publicidad.sponsor}></img>
                </div>
            </a>
              }
            </div>
                }
        </div>
    )
}

export default Busc
