import { Button, Grid, makeStyles, TextField } from '@material-ui/core'
import React,{useState,useEffect} from 'react'
const estilos=makeStyles((theme)=>({
    margen:{
        margin:'10px 0px'
    }
}))

const Formulario = (props) => {
    const clases=estilos()
    useEffect(() => {
    }, [])
    return (
        <div>
            <Grid container>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                    <div className={clases.margen}>
                    {props.errores.descripcion?
                      <TextField 
                      error
                      name='descripcion'
                      label={props.label}
                      variant='outlined'
                      onChange={props.handleChange}
                      value={props.state.descripcion}
                      helperText={props.errores.descripcion}
                      fullWidth
                      ></TextField>
                    
                    :
                    <TextField
                    name='descripcion'
                    label={props.label}
                    variant='outlined'
                    onChange={props.handleChange}
                    value={props.state.descripcion}
                    fullWidth
                    ></TextField>}
                  
                    </div>
                    <div className={clases.margen}>
                    <Button
                    fullWidth
                    onClick={()=>props.Guardar()}
                    >
                        Guardar
                    </Button>
                    </div>
              
                </Grid>
                <Grid item xs={4}></Grid>
            </Grid>
        </div>
    )
}

export default Formulario
