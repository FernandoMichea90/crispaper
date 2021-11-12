import { Paper,Grid,makeStyles, Typography, IconButton } from '@material-ui/core'
import React,{useState} from 'react'
import EditIcon from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'
const estilos = makeStyles((theme)=>({
    margenPaper:{
        margin:'20px 0px',
        padding:'20px'
    }
}))

const Tabla = (props) => {
// colocar la mayuscula en la primera letra de la palabra

const enMayuscula=(texto)=> {
  return texto[0].toUpperCase()+texto.slice(1)
}
const clases=estilos()
    return (
        <div>
            <Grid container>
                <Grid item xs={2}>

                </Grid>
                <Grid item xs={8}>
                    {props.data.map(doc=>(
                             <Paper className={clases.margenPaper}>
                                 <Grid container>
                                     <Grid item xs={8}>
                                        <Typography variant="h4"> {enMayuscula(doc.descripcion)} </Typography> </Grid>
                                     <Grid item xs={2}>
                                         <IconButton onClick={()=>props.editar(doc)}>
                                             <EditIcon />
                                         </IconButton>
                                     </Grid>
                                     <Grid item xs={2}>
                                     <IconButton onClick ={()=>props.borrar(doc)}>
                                             <Delete />
                                         </IconButton>
                                     </Grid>

                                 </Grid>

                             </Paper>

                    ))}
                </Grid>
                 <Grid item xs={2}>
                    
                 </Grid>
            </Grid>
        </div>
    )
}

export default Tabla
