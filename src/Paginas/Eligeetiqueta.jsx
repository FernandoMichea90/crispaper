import { Typography,Grid,Button,makeStyles } from '@material-ui/core'
import React from 'react'
import { useEffect,useState } from 'react'
import Icon from '@material-ui/core/Icon';
import Progreso from '../Componetes/Progreso'
import Funciones from '../Funciones/FuncionesFirebase'
import SaveIcon from '@material-ui/icons/LocalOffer';
import '../estilos/botones.css'

const  estilos = makeStyles((theme)=>({

    divMargin:{

        margin:'20px'
    },
    divMarginPrincipal:{

        margin:'0px 200px',
        [theme.breakpoints.down('md')]:{
            margin:'0px 0px',
        }

    },botonColor:{
        width:'100%',
        height:'80px'
    }


}))



const Prueba =()=> (
    <SaveIcon />
)

const Eligeetiqueta = (props) => {

    const clases =estilos()
    let test =Prueba()


    const [cargando, setcargando] = useState(true)
    const [etiqueta, setetiqueta] = useState([])

const  pedirEtiqueta=async () => {
        let lista = await Funciones.ListarEtiquetas()
        
        repartirColores(lista)
        setcargando(false)
        //setetiqueta(lista)    

}

const  repartirColores = (lista)=>{

    let nuevaLista =[] 
    let contador=0
    nuevaLista=lista.map(doc =>{
        contador=contador+1
         console.log(contador,doc)   
         let resultado=switchColor(contador,doc)
         contador=resultado[0]
         console.log(resultado[1])
         return resultado[1]
    })

    setetiqueta(nuevaLista)
}

const redirecionar=(doc)=>{

    props.history.push(`/tag/${doc.id}`)
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
             
        console.log('paso por aca')
         pedirEtiqueta()




    },[])

    
    return (
        <div>

            <Typography variant="h6" align="center">
         
    Select your topycs of interest 
            </Typography>


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
                           <Grid xs={12} sm={6} md={3} lg={3} >

                                
                                <div className={clases.divMargin}>
                                  <Typography variant="h6" align="center">
           
                                <Button
                                        id={doc.color}
                                        variant="outlined"
                                        size="large"
                                        onClick={()=>redirecionar(doc)}
                                        startIcon={<Icon>{doc.icono==null?
                                            <> local_offer</>
                                        :
                                            doc.icono
                                        }</Icon>}
                                        className={clases.botonColor}
                                    >
                                        {doc.descripcion}
                                </Button>
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
