import { Grid ,Typography ,Divider} from '@material-ui/core'
import React from 'react'
import Estilos from '../Estilos'

const Formulario = (props) => {
    const estilos=Estilos()

    return (
        <Grid container>

          <Grid xs={12}>
              <Typography className={estilos.textoTitulo} variant="h4" align="left">
                    {props.info.titulo}
              </Typography>
         </Grid>  

         <Grid xs={12}>
             <div className={estilos.divResumen}>
            <Typography variant="h5" align="left" className={{color:'#000000b3'}}>
                    {props.info.resumen}
            </Typography>
            </div>
              
         </Grid> 

          <Grid xs={12}>
        
          <Divider className={estilos.dividido} />

              
         </Grid>      

         <Grid xs={12}>
        
         <Typography variant="h5" align="left" style={{color:'#0e0eb9'}}>
            Learn more 
            </Typography>
        
            <Typography align="left" >
             {props.info.link.map(doc=>(
            <ul>
                    <li>
                       <a target="_blank" href={doc}>     
                            {doc}
                        </a>

                    </li>
            </ul>
            
            
             ))}

        </Typography>

            
       </Grid>      





        </Grid>
    )
}

export default Formulario
