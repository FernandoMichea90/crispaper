import React from 'react'
import {Grid, Typography} from '@material-ui/core'
import Estilos from '../Estilos'






const Componentes = (props) => {
    const estilos=Estilos()
    return (
        

                <Grid  xs={12} md={4}>
                
                    <div className={estilos.divImgWhy}>
                        <img style={{width:'100%',height:'100%'}} src={props.componentes.foto}></img>
                    </div>

                    <Typography align="center" variant="h6">
                    {props.componentes.titulo}

                    </Typography>
                    <Typography align="center" variant="subtitle1">
                    {props.componentes.descripcion}
                    </Typography>
                    
                 </Grid>
              
            
            
        
    )
}

export default Componentes
