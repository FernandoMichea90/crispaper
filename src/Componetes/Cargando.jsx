import React from 'react'
import {CircularProgress} from '@material-ui/core'
import Estilos from './Estilos'
const Cargando = () => {
     const estilos=Estilos()
    return (
    
        <div className={estilos.divCircular} >
            <CircularProgress className={estilos.circular}></CircularProgress>
        </div>

    )
}

export default Cargando
