import React,{useState}  from 'react'
import Caja from "../Componetes/CajaBusqueda"
import BotonFlotante from "../Componetes/BotonFlotante"
import { useEffect } from 'react'
import {UsuarioContext} from '../Provedores/UsuarioContext'
import { useContext } from 'react'
import { withRouter } from "react-router";
import { useLocation } from "react-router-dom";


const Inicio = (props) => {

    // const [state, setstate] = useState(props.recientes)
    const usuario = useContext(UsuarioContext)
  const [busqueda, setbusqueda] = useState()
    const location = useLocation();

useEffect(() => {
   

        console.log(location.state)
        console.log("paso por aca")

    try {
        if(location.state!==undefined){


            setbusqueda(location.state)
            // const {paper}=props.match.params
            //  const{buscado}=props.match.params
            //  console.log(props.match.params)
       
            // setpapermatch(paper)    
        }
      
        
    } catch (error) {
       
    }
 

}, [props])

    return (
       
        <div>  
            <Caja  busqueda={busqueda}  textoGeneral={props.textoGeneral} valorados={props.valorados} recientes={props.recientes} paperid={props.match.params} >
                
            </Caja>
        
        {usuario?
           <div>
               {usuario.administrador? <div>
                <BotonFlotante>
               
               </BotonFlotante>
               </div>:
               <div></div>
               }
           
            </div>:
            <></>
        }
       
        </div>

    )
}

export default withRouter(Inicio)
