import React,{useState}  from 'react'
import Caja from "../Componetes/Caja"
import BotonFlotante from "../Componetes/BotonFlotante"
import { useEffect } from 'react'
import {UsuarioContext} from '../Provedores/UsuarioContext'
import { useContext } from 'react'


const Inicio = (props) => {

    // const [state, setstate] = useState(props.recientes)
    const usuario = useContext(UsuarioContext)
    const [papermatch, setpapermatch] = useState(null)
useEffect(() => {
    try {
        if(props.match.params!==undefined){
            const {paper}=props.match.params
            setpapermatch(paper)    
        }
      
        
    } catch (error) {
        alert(error)
    }
 

}, [props])

    return (
       
        <div>  
            <Caja valorados={props.valorados} recientes={props.recientes} paperid={props.match.params} >
                
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

export default Inicio
