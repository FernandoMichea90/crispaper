import React,{useEffect,useState} from 'react'
import { makeStyles,Typography,Grid,CircularProgress } from '@material-ui/core'
import { convertToRaw } from 'draft-js';
import {  ContentState, convertFromHTML } from 'draft-js'
import Firebase from "../../src/firebase/firebase"
import { EditorState } from 'draft-js';

const estilos=makeStyles((theme)=>({

    root:{
            fontFamily:"Lato",
            fontWeight:"500",

           "& .MuiTypography-body1":{
                marginBottom:"1rem",
                fontFamily:"Lato"            

    }, 

    "& .MuiTypography-h3":{
        marginBottom:"1rem",
        fontFamily:"Lato",
        fontWeight:"600fff"          

}, 


},
divCircular:{
    marginTop:"100px"

},
circular:{
    height:"72px !important",
    width:"72px !important",
    display:"block",
    margin:"auto"
    },
}))

const Nosotros = () => {
     const  clases=estilos()

     const [titulo, settitulo] = useState()
     const [cargando,setcargando]=useState(false)
     const [editorState, setEditorState] = useState()
 




     // funcion extraida 
     

     useEffect(async() => {

        setcargando(true)
        const retornarObjeto=await Firebase.db.collection("administrarnosotros").doc("configuracion").get().then((respuesta)=>{
            console.log(respuesta.data())

            return respuesta.data()
        })

        if(retornarObjeto!=undefined){
            
            settitulo(retornarObjeto.title)
            console.log(retornarObjeto.contenido)

            // aca esta el problema 
            setEditorState(retornarObjeto.contenido)

        }

        console.log(editorState)
        setcargando(false)
   
     }, [])
    return (
        <div  className={clases.root} style={{marginTop:"100px"}}>

            <Grid container>


                <Grid xs="2"></Grid>

                <Grid xs="8">

                            <Typography variant="h3">
                                {titulo}
                            </Typography>

                             {cargando?
                                    <div className={clases.divCircular} >
                                            <CircularProgress className={clases.circular}></CircularProgress>
                                        </div>

                                    :

                                    <div dangerouslySetInnerHTML={{__html:editorState}}>
                                    
                                    </div>
                             }
                          

                            
                </Grid>
                <Grid xs="2"></Grid>
            </Grid>


       
        </div>
    )
}

export default Nosotros
