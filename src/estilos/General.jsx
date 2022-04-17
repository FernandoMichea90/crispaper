
 import { makeStyles } from '@material-ui/core'

 export  const  estilos = makeStyles((theme)=>({

    divMargin:{

        margin:'20px',
        [theme.breakpoints.down('md')]:{
            margin:'5px',
        }
    },
    divMarginPrincipal:{

        margin:'0px 25px',
        [theme.breakpoints.down('md')]:{
            margin:'0px 0px',
        }

    },botonColor:{
        width:'100%',
        height:'80px'
    },
    divMarginBuscador:{

        margin:'0px 66px',
        [theme.breakpoints.down('md')]:{
            margin:'0px 0px',
        }

    },
    
divImagen:{
    height:"274px",
    width:"260px",
    backgroundSize:"260px auto",
    position:"relative",
    backgroundRepeat:"no-repeat",
    backgroundPosition:"50%",
    borderRadius:"20px",
    display:"block",
    overflow:"hidden",
    margin:"auto",
    marginTop:"15px",
    [theme.breakpoints.down("xs")]:{
            width:"auto",
            marginTop:"0px",
            height:"220px",
    }
}


}))
