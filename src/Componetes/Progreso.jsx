import React from 'react'
import {CircularProgress,makeStyles} from '@material-ui/core'




const estilos=makeStyles((theme)=>({

    divCircular:{
        marginTop:"100px"

    },
    circular:{
        height:"72px !important",
        width:"72px !important",
        display:"block",
        margin:"auto"
        }

    
}))

const Progreso = () => {
    const clases=estilos()

    return (
        <div  className={clases.divCircular}>
            <CircularProgress  className={clases.circular} />
        </div>
    )
}

export default Progreso
