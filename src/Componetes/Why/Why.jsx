import React,{useEffect,useState} from 'react'
import {Typography} from '@material-ui/core'
import Estilos from '../Estilos'

const Why = (props) => {

        const estilos=Estilos()

    





    return (
        <div>

            <Typography className={estilos.tituloWhy} variant="h5" align="center">
                    {props.cabeza.titulo}
            </Typography>
            <Typography className={estilos.descripcionWhy} variant="h6" align="center">
                    {props.cabeza.descripcion}
            </Typography>
            
        </div>
    )
}

export default Why
