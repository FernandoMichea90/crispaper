import React,{useEffect,useState} from 'react'
import { Grid,Typography,Button,Avatar, makeStyles,CircularProgress,Paper } from '@material-ui/core'
import Comentario from '../Componetes/Comentario'
import FuncionesGenerales from "../Funciones/FuncionesFirebase"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Firebase from '../firebase/firebase'

const estilos=makeStyles((theme=>({
    root:{
      
        " & .MuiButton-containedPrimary:hover" :{
            backgroundColor: "#303f9f00",
            color:"#5fcccf",
            border:"1px solid"
        },
            

    },

    
    tituloGeneral:{

    fontWeight:"700",
    fontFamily:"Lato",
    fontSize:"27px"
    }
,
divTituloGeneral:{
    margin:"55px auto",
    
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


})))



const ListarComentarios = () => {

    const clases=estilos()

    // solicitud maxima  de comentarios 
     const comentariosSolicitados = 3
     // comentorios mostrados 
     const comentariosMostrados=2
    // referencia base de datos 
    const  comentariosRef=Firebase.db.collection('Comentarios')

    const [comentarios, setcomentarios] = useState([])
    const [cargando, setcargando] = useState(false)
    const [ultimo,setUltimo]=useState()
    const [vacio,setVacio]=useState(false)


    useEffect(async () => {

        setcargando(true)
        pedirComentarios()


    }, [])


    const pedirComentarios=async()=>{

        const nuevaLista=[]
        await comentariosRef.orderBy('fecha','asc').get().then((doc)=>{


            let tamano=doc.docs.length
            for(let i=0;i<tamano;i++){

                nuevaLista.push(doc.docs[i].data())
            }

            setUltimo(doc.docs.length-1)


                if(tamano==comentariosSolicitados){

                    setVacio(false)
                }
                else{
                    setVacio(true)
                }
                })
       console.log(nuevaLista)
        setcomentarios(nuevaLista)
        setcargando(false)
        
    }

    const pedirMas=async()=>{

        const nuevaLista=[]
        await comentariosRef.orderBy('fecha','asc').startAfter(ultimo).limit(comentariosSolicitados).get().then((doc)=>{


            let tamano=doc.docs.length
            for(let i=0;i<tamano;i++){

                nuevaLista.push(doc.docs[i].data())
            }

            setUltimo(doc.docs.length-1)


                if(tamano==comentariosSolicitados){

                    setVacio(false)
                }
                else{
                    setVacio(true)
                }
                })
       console.log(nuevaLista)
        setcomentarios(nuevaLista)
        setcargando(false)
        
    }

    return (
        <div className={clases.root} >

<Grid  container>

<Grid xs="1"  md="2"> 

</Grid>
<Grid xs="10" md="8">
        <div className={clases.divTituloGeneral}>
                    <Typography variant="h4" className={clases.tituloGeneral}>
                            Feedback
                    </Typography>
        </div>




        {                            
                cargando?
                <div className={clases.divCircular} >
                <CircularProgress className={clases.circular}></CircularProgress>
            </div>
            :<div>
               { comentarios.length==0 ?
                  <Typography className={clases.
                  textNoDisponible
                   } align="center" variant="h4">
                            No hay registros
                  </Typography>          
               

                    :

                    <div>

                                {
                                    comentarios.map((doc)=>(
                                        <Comentario Comentario={doc}> </Comentario>
                                    ))
                                }

                            {/* {vacio==false&&

                                    <Typography align="center">        
                                    <Button variant='contained'
                                    color="primary"
                                    endIcon={<ExpandMoreIcon/>}       
                                    onClick={()=>{pedirMas()}}
                                    >
                                    ver mas      
                                    </Button>       
                                    </Typography>        


                            }
                       */}
                    </div>
                 
        
            }
            </div>
        }

</Grid>

<Grid xs="1" md="2">
    
</Grid>
</Grid>

        </div>
    )
}

export default ListarComentarios
