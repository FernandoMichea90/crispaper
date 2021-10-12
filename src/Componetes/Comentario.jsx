import React from 'react'
import { Grid,Typography, Avatar, makeStyles,CircularProgress,Paper } from '@material-ui/core'
import moment from "moment"
const estilos=makeStyles((theme=>({

  
titulo:{

    fontWeight:"500",
    fontFamily:"nunito"
},
fecha:{
    fontWeight:"500",
    
    fontFamily:"nunito",
    paddingTop:"5px",
    color:"#717171"
},
comentario:{
    fontWeight:"500",
    fontFamily:"nunito",
    paddingTop:"5px",
    color:"#717171",
    margin:"11px",
    padding:"11px"
},

})))

const   Comentario = (props) => {
    const clases=estilos()
    const Comentario=props.Comentario
    return (
        <div style={{marginBottom:"50px"}} >
            

            <Grid container>
                        <Grid xs={12} md={2}>


                        <Avatar    src={`${Comentario.usuario.imagen}`}  style={{top:"25%",left:"36%"
                                       }} ></Avatar>


                        </Grid>
                        <Grid xs={12} md={10}>

                            <Grid xs="12">
                                <Typography variant="subtitle2" className={clases.fecha}>
                                    {moment(new Date(Comentario.fecha.seconds*1000)).format("D MMM YYYY")}    
                                </Typography>
                            </Grid>
                            <Grid xs="12">
                            <Typography variant="h5" className={clases.titulo}>
                                    {Comentario.logueado!=true?
                                    Comentario.usuario:
                                    Comentario.usuario.nombre}
                                </Typography>

                            </Grid>
                            <Grid xs="12">
                            <Typography variant="subtitle2" className={clases.fecha}>
                            {Comentario.logueado==true&&
                                    
                                    Comentario.usuario.email}
                                </Typography>
                            </Grid>
                            <Grid xs={12}>
                                
                            <Typography variant="subtitle2" className={clases.fecha}>
                            {Comentario.website!==undefined&&
                                    <a href={Comentario.website} target='_blank'>
                                    {Comentario.website}
                                    </a>}
                                </Typography>
                            </Grid>
                          
                        </Grid>

                        <Grid xs="12">
                                <Paper elevation={1}>
                                <Typography variant="subtitle1" className={clases.comentario}>
                                {Comentario.comentario}
                                
                                </Typography>

                                </Paper>

                            </Grid>

                    </Grid>


        </div>
    )
}

export default Comentario
