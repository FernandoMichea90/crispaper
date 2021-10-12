import React,{useEffect,useState} from 'react'
import {Grid} from '@material-ui/core'
import Componentes from '../Componetes/Why/Componentes'
import Why from '../Componetes/Why/Why'
import Estilos from '../Componetes/Estilos'
import FuncionesFirebase from '../Funciones/FuncionesFirebase'

const WhyPag = () => {
    const estilos=Estilos()
    const [cabeza, setcabeza] = useState({})
    const [Comp, setComp]=useState([])
    //armar peticiones 
    const armarPeticiones=async()=>{
       const compCabeza=await FuncionesFirebase.pedirCabeza() 
       const compUno=await FuncionesFirebase.pedirComponenteUno()
       const compDos=await FuncionesFirebase.pedirComponenteDos()
       const compTres=await FuncionesFirebase.pedirComponenterTres()
       let listComp=[]
       listComp.push(compUno,compDos,compTres)
       setcabeza(compCabeza)
       setComp(listComp)
    }

 useEffect(() => {    
    armarPeticiones()
 }, [])

    return (
        <div className={estilos.cajaWhy}>
        <Grid container>
           <Grid xs={1}></Grid>      
           <Grid xs={10}>
               <Why cabeza={cabeza}></Why>
                    <Grid container>
                        {Comp.map((doc)=>(
                                <Componentes  componentes={doc}>
                                </Componentes>
                        ))        
                        }
               </Grid>     
            </Grid>      
           <Grid xs={1}></Grid>      
        </Grid>
        </div>
    )
}

export default WhyPag
