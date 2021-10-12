import React,{useEffect,useState} from 'react'
import {Typography,TextField,Grid,Button,Icon,makeStyles} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';
import LinkIcon from '@material-ui/icons/Link';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Swal from "sweetalert2"



const useStyles = makeStyles((theme) => ({

    basurero:{
        padding:"0px",
        margin:"0px 12px",
        color:"#ff0000"
    }

}))

const Formulario = (props) => {

 const classes =useStyles()   


 useEffect(() => {

    console.log(props.link)
    props.setlink(props.link);
  }, [props]);

const agregarPaper=async() => {
    const { value: url } = await Swal.fire({
        input: 'url',
        inputLabel: 'URL address',
        inputPlaceholder: 'Enter the URL'
      })
      
      if (url) {

        props.setlink((link)=>[...link,url])
        Swal.fire(`Entered URL: ${url}`)
      }
    }






    return (
        <>
        <Typography align="center">

        {props.errores.titulo?
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Titulo"
            name="titulo"
            value={props.info.titulo}
            onChange={props.actualizarState}
            error
            id="standard-error" 
            helperText={props.errores.titulo}>
            </TextField>
        :
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Titulo"
            name="titulo"
            value={props.info.titulo}
            onChange={props.actualizarState}
         
        ></TextField>
        
        }
     
        </Typography>

        <Typography align="center" >

                 {props.errores.resumen?
                
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="resumen"
                label="Resumen"
                name="resumen"
                onChange={props.actualizarState}
                value ={props.info.resumen}
                multiline
                 rowsMax={8}
                autoComplete="resumenrafce"
                error
                id="standard-error" 
                helperText={props.errores.resumen}
            
                />
                
                :
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="resumen"
                label="Resumen"
                name="resumen"
                value ={props.info.resumen}
                onChange={props.actualizarState}
                multiline
                 rowsMax={8}
                autoComplete="resumenrafce"
            
                />
                }       
                   
         </Typography>

         <Typography align="left" >
             
                        <Button
                        variant="contained"
                        color="primary"
                        endIcon={<LinkIcon/>}
                        onClick={() => agregarPaper()}

                    >
                        Agregar Link
                    </Button>
         </Typography>
         <Typography align="left" >
             {props.link.map(doc=>(
            <ul>
                    <li>
                       <a target="_blank" href={doc}>     
                            {doc}
                        </a>

                        <IconButton aria-label="delete" className={classes.basurero}
                            onClick={()=>props.borrarLink(doc)}
                        >
                                <DeleteIcon fontSize="small" />
                        </IconButton>


                    </li>
            </ul>
            
            
             ))}

        </Typography>




    </>
    )
}

export default Formulario
