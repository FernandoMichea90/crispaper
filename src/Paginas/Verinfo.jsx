import React, { useState,useEffect } from 'react'
import Firebase from '../Funciones/FuncionesFirebase'
import { Grid,Typography } from '@material-ui/core'
import Cargando from '../Componetes/Cargando'
import Estructura from '../Componetes/VerInfo/Estructura'


const registroVacio =()=>(
    <>
    <Typography variant="h5" align="center">
    the record does not exist
  </Typography>
  <Typography variant="h5" align="center">
      <a href='/'>
               
               Come back

      </a>
  </Typography>
    </>
)





const Verinfo = (props) => {

            const [informacion, setinformacion] = useState({})
            const registroVa=registroVacio()
            const [cargando, setcargando] = useState(true)


    useEffect(async () => {

       setcargando(true)
        const {id}=props.match.params
        const retornarInfo=await Firebase.retornarInformacion(id)
        if(retornarInfo!=undefined){

                setinformacion(retornarInfo, setcargando(false))
        }
       
        
    }, [])




    


    return (
        <div>

            <Grid container>
                    <Grid xs={1} /> 

                    <Grid xs={10} > 

                        {cargando?
                        
                        <Cargando/>
                        :
                        Object.keys(informacion).length == 0?
                        
                        registroVa

                        :
                      
                            <Estructura informacion={informacion} ></Estructura>

                        }

                      </Grid>
                        <Grid xs={1}></Grid>


            </Grid>
            
        </div>
    )
}

export default Verinfo
