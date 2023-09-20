import React from 'react'
import { makeStyles } from '@material-ui/core'

const Estilos = makeStyles((theme)=>({
    divCircular:{
        marginTop:"100px"
    },
    circular:{
        height:"72px !important",
        width:"72px !important",
        display:"block",
        margin:"auto"
        },
        textoTitulo:{
                margin:'20px 0px',
                fontFamily: 'Nunito',
                fontWeight: 800
        },
        divResumen: {
            height:"300px",
            overflow:"auto"
            
        },

        dividido :{
        margin:'20px 0px',
        height: '3px'
},
divImagen:{   
    width:"400px",
    maxHeight:'600px',
    overflow: 'auto',
    color:"#21cbce",
    backgroundSize:"260px auto",
    position:"relative",
    backgroundRepeat:"no-repeat",
    backgroundPosition:"50%",
    borderRadius:"0",
    display:"block",
    margin:"auto",
    marginTop:"15px",
    [theme.breakpoints.down("sm")]:{
            marginTop:"30px"
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
botonesIcono :{ 
    display:'flex',
    justifyContent: 'center'
    ,
   '& ul':{
        listStyle:'none'
   },
   '& li':{
       float:'left',
   }
},
tamanoIcono: {
    fontSize: '45px !important',
}
,
tamanoIconoMargen: {
    fontSize: '45px !important',
    margin:'0px 10px'
},tituloWhy:{
    fontWeight:"700",

},descripcionWhy:{
    fontWeight:"300",
},divImgWhy:{
    width: '260px',
    height: '260px',
    margin: 'auto',
    display: 'block',
    marginTop: '15px',
    borderRadius:'100%',
    backgroundSize: '260px auto',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50%',
    overflow: 'hidden',
    border: '1px solid #00000033'    
},divImgWhyDos:{
    width: '160px',
    height: '160px',
    margin: 'auto',
    display: 'block',
    marginTop: '15px',
    borderRadius:'100%',
    backgroundSize: '260px auto',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50%',
    overflow: 'hidden',
    border: '1px solid #00000033'
}
,imgWhyDos:{
    height: '160px',
    margin: 'auto',
    display: 'block',
    marginTop: '15px',
    borderRadius:'100%',
    backgroundSize:'253px auto',
    backgroundRepeat:'no-repeat',
    backgroundPosition: '50%',
},
cajaWhy: {
    '&  .MuiTypography-alignCenter':{
        textAlign: 'center',
        margin: '25px auto'
    }
,
    '& .MuiTypography-subtitle1':{
       
        fontWeight: 300
    }
},
cajaAdminWhy:{
    '& .MuiFormControl-fullWidth': {
        margin: '15px auto'
    }
},
margenAdmynWhy :{

    margin:"60px auto"

},
botonVerde:{
    color: '#1ab37c',
    border:'1px  solid #1ab37c'
}, 
botonRojo:{
    color: '#ffffff',
    background:'#f43636!important'
}, 
tituloBotonVerde:{
    color: '#ffffff',
    background:'#1ab37c !important'
}, 
margenBotonImagen:{
    margin:'5px auto'
},
botonVerdeAlert:{
    color: '#1ab37c',
    border:'1px  solid #1ab37c',
    width:'100px'
}, 
botonRojoAlert:{
    color: '#f43636',
    border:'1px  solid #f43636',
    width:'100px'
}, 
// variables para titulo pagina 
 tituloSubtitulo:{
     textTransform:'uppercase',
     color:'#cf372c',
     fontWeight:"600"
 },
 tituloTitulo:{
     fontWeight:"500",
     fontSize:'1.9rem'
 },
 tituloMargen:{
     marginBottom:'10px'
 },
 tituloMargenInput:{
     marginTop:'10px',
     marginBottom:'10px'
 }
}))
export default Estilos
