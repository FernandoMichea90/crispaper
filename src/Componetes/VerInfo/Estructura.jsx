import React,{useState,useEffect} from 'react'
import {Grid} from '@material-ui/core'
import Imagen from '../VerInfo/Imagen'
import Formulario from '../VerInfo/Formulario'
const Estructura = (props) => {
    const [imagen, setimagen] = useState({file:null,imagen:null})
    const [info, setinfo] = useState({
        id:'',
        titulo:'',
        resumen:'',
        link:[]
    })

    useEffect(() => {
    

        setimagen({file:props.informacion.imagen})
        setinfo({...props.informacion})    



    }, [])

    return (
      <Grid container>

          <Grid xs={12} md={6}>
              
              <Imagen id={info.id} titulo ={info.titulo} resumen ={info.resumen} imagen={imagen}  setimagen={setimagen} ></Imagen>
           </Grid>  
           <Grid xs={12} md={6}>
                    <Formulario info={info}></Formulario>
            </Grid>  


      </Grid>


    )
}

export default Estructura
