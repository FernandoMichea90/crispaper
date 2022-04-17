import { Typography,Grid,Button,makeStyles } from '@material-ui/core'
import React from 'react'
import { useEffect,useState } from 'react'
import Icon from '@material-ui/core/Icon';
import Progreso from '../Componetes/Progreso'
import Funciones from '../Funciones/FuncionesFirebase'
import SaveIcon from '@material-ui/icons/LocalOffer';
import '../estilos/botones.css'
import EstilosDos from '../Componetes/Estilos'
import Titulo from '../Componetes/Titulo/Titulo';
import Buscador from '../Componetes/Buscador';


const  estilos = makeStyles((theme)=>({

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



const Prueba =()=> (
    <SaveIcon />
)

const Eligeetiqueta = (props) => {

    const clases =estilos()
    const clasesGenerales=EstilosDos()
    let test =Prueba()


    const [cargando, setcargando] = useState(true)
    const [etiqueta, setetiqueta] = useState([])
    //guardar todas los etiquetas 
    const [todasEtiquetas, settodasEtiquetas] = useState([])
    //state de lo ingresado en el buscadorn
    const [buscador, setbuscador] = useState({buscador:''})

const  pedirEtiqueta=async () => {
        let lista = await Funciones.ListarEtiquetas()
        // agregar etiqueta general
  
        lista=agregarBusqueda(lista)
        console.log(lista)
        repartirColores(lista)
        setcargando(false)
        //setetiqueta(lista)    

}



const  repartirColores = (lista)=>{

    let nuevaLista =[] 
    let contador=0
    nuevaLista=lista.map(doc =>{
        contador=contador+1
         let resultado=switchColor(contador,doc)
         contador=resultado[0]
         return resultado[1]
    })

    setetiqueta(nuevaLista)
    settodasEtiquetas(nuevaLista)
}

const redirecionar=(doc)=>{

    props.history.push(`/tag/${doc.id}`)
}
// agregar el campo busqueda a la lista
const agregarBusqueda= (lista)=>{
let nuevaLista=[]
   nuevaLista=lista.map(doc=>{
        return {...doc,busqueda:doc.descripcion.toLowerCase()}
    })
    return nuevaLista
}
// filtrar por letra ingresada
const filterItems = (arr, query) => {
    return arr.filter(el => el.busqueda.toLowerCase().indexOf(query.toLowerCase()) !== -1)
  }
const filtrado=(e)=>{
    e.preventDefault()
    setbuscador({[e.target.name]:e.target.value})
    setetiqueta(filterItems(todasEtiquetas,e.target.value))
}


const switchColor=(contador,doc)=>{
    let objeto=[]
    switch (contador) {
        case 1:    
         objeto={...doc,color:'botonMandarina'}
         return [contador,objeto]
          break;

        case 2:    
         objeto={...doc,color:'botonVerde'}
        return [contador,objeto]
        break;

        case 3:    
         objeto={...doc,color:'botonMorado'}
        return [contador,objeto]
        break;

        case 4:    
         objeto={...doc,color:'botonAzul'}
        return [0,objeto]
        break;
    
      

    }

}


    useEffect(() => {
             
         pedirEtiqueta()




    },[])

    
    return (
        <div>
            <div className={clases.divMarginBuscador}>
            <Grid container> 
           
            <Grid xs={12}>   
            <Titulo></Titulo>
            <Buscador buscador={buscador} filtrado={filtrado} />
            </Grid>
           
            </Grid>
            </div>

                {cargando? 
                
                <Progreso></Progreso>
                :
                
                    <div className={clases.divMarginPrincipal} >                        
                    
                    <Grid container 
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                                        >
                        {
                         etiqueta.map(doc=> (
                           <Grid xs={6} sm={6} md={4} lg={3} >

                      
                                <div  className={clases.divMargin}>
                                  <Typography variant="h6" align="center">
                                {doc.imagen?
                                  <a className={clasesGenerales.linkImagen} onClick={()=>redirecionar(doc)}>
                                <div className={clases.divImagen}> 
                                                            
                                <img src={doc.imagen} style={{height:"100%"}}/>
                                <div className={clasesGenerales.negroTransparente} style={{background:`rgb(0 0 0 / ${doc.transparencia}%)` }}>   
                                </div>
                                <div className={clasesGenerales.negroTexto}>
                                {doc.descripcion}
                                </div>
                                </div>
                                 </a>
                            :
                         
                            <a className={clasesGenerales.linkImagen} onClick={()=>redirecionar(doc)}>
                            <div className={clases.divImagen}> 
                                                        
                            <img src='http://localhost:3000/static/media/pajaro.7bde4732.svg' style={{height:"100%"}}/>
                            <div className={clasesGenerales.negroTransparente}>   
                            </div>
                            <div className={clasesGenerales.negroTexto}>
                            {doc.descripcion}
                            </div>
                            </div>
                             </a>
                            }    
                             
                                </Typography>
                                </div>
                           </Grid>         
                          

                         ))
                        }
                    </Grid>
            
                    </div>
                }



            
        </div>
    )
}

export default Eligeetiqueta
