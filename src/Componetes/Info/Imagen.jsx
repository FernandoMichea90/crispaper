import React from 'react'
import {Typography,makeStyles} from '@material-ui/core'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

const estilos = makeStyles((theme)=>({
    divImagen:{
       
        height:"360px",
        width:"260px",
        color:"#21cbce",
        backgroundSize:"260px auto",
        position:"relative",
        backgroundRepeat:"no-repeat",
        border: "2px dashed #21cbce",
        backgroundPosition:"50%",
        borderRadius:"0",
        display:"block",
        margin:"auto",
        marginTop:"15px",
        [theme.breakpoints.down("sm")]:{
                marginTop:"30px"
        },
        '&:hover': {
            backgroundColor:'#21cbce' ,
            color:'#ffffff', 

          },
    },
    imgFoto:{
        position:"absolute",
        margin:"auto",
        top:"0",
        bottom:"0",
        left:"0",
        right:"0",
        fontSize:"3rem"
    },

}))




const Imagen = (props) => {

const clases =estilos()

const seleccionarArchivo=imagen=>{
       
            
    const agregarimg=imagen.target.files[0]
    console.log(agregarimg)  
    if(agregarimg!=undefined){
     props.setimagen({
        imagen:agregarimg,
        file:URL.createObjectURL(agregarimg)
    })}


}    





    return (
        <div>

                    <Typography  align="center" variant="h3">

                            <label for="subir">
                            <div  className={clases.divImagen}>

  
                            {props.imagen.file?

                                <img src={props.imagen.file} style={{height:"100%",width:"100%"}}/>
                            
                                // <div   className={clases.divImagen} style={{
                                //     backgroundImage:`url(${imagen.file})`,

                                //   }} >

                                          
                                //     </div>


                                :
                                < AddAPhotoIcon className={clases.imgFoto}></AddAPhotoIcon>
                                }
                            

                            </div>
                            <input
                                    type="file"
                                    id="subir"
                                    accept="image/*"
                                    style={{display:"none"}}
                                    onChange={(e)=>seleccionarArchivo(e)}

                                    
                                
                                    >
                                    </input>
                            </label>
                    </Typography>

              
            
        </div>
    )
}

export default Imagen
