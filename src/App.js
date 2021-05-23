import React ,{useState,useContext,useEffect}from 'react'
import Login from '../src/Paginas/Login'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Inicio from './Paginas/inicio'
import {ThemeProvider} from  "@material-ui/core/styles"
import theme  from "./Provider/TemaConfig"
import {UsuarioContext,UsuarioProvider } from "./Provedores/UsuarioContext"
import  Navegador  from './Componetes/Navegador/appbar'
import CrearPaper from './Paginas/CrearPaper'
import Etiquetas from './Paginas/Etiquetastres'
import EtiquetasDos from './Paginas/Etiquetascuatro'
import {useHistory} from 'react-router-dom'
import AdmEtiquetas from './Paginas/AdmEtiquetas'
import CrearCuenta from './Paginas/CrearCuenta'
import Nosotros from '../src/Paginas/Nosotros'
const App = (props) => {

  const history=useHistory()
const [recientes, setrecientes] = useState(false)

const [valorados, setvalorados] = useState(false)

const [match, setmatch] = useState()
  
  const usuario=useContext(UsuarioContext)


 const reciente=()=>{



  if(recientes)
  {

  setvalorados(false)
  setrecientes(false)
}else
  {
    setvalorados(false)
    setrecientes(true)

  }

}



const mejorvalorados=()=>{

    
      if(valorados){

        setvalorados(false)
        setrecientes(false)
      }else
        {
          setvalorados(true)
          setrecientes(false)
      
        }

}

useEffect(() => {

  console.log("aleta")

  // alert(history.location.pathname)
 
}, [])

  
  return (
    <Router>
  
    <ThemeProvider theme={theme}>
   
          


                <div>
                  <Navegador  mejorvalorados={mejorvalorados} recientes={recientes} valorados={valorados} reciente ={reciente} ></Navegador>

                <Switch>
                <Route  path="/crearcuenta" component={CrearCuenta}></Route>
                <Route  path="/nuevopaper" component={CrearPaper}></Route>
                <Route  path="/editarpaper/:id" component={CrearPaper}></Route>
                <Route  path="/etiquetas"  render={(props)=>(<Etiquetas {...props}  valorados={valorados} recientes={recientes} />)} ></Route>
                <Route  path="/tag/:valor"  render={(props)=>(<EtiquetasDos {...props}  valorados={valorados} recientes={recientes} />)}></Route>
                <Route  path="/buscar/:papermatch"  render={(props)=>(<Inicio {...props}  valorados={valorados}  recientes={recientes} />)} ></Route> 
                <Route  path="/adminetiquetas"  render={(props)=>(<AdmEtiquetas {...props}   />)} ></Route>
                <Route  path="/login" render={(props)=>(<Login {...props}  />)} ></Route>
                <Route  path="/nosotros" component={Nosotros}></Route>
                <Route exac path="/"  render={(props)=>(<Inicio {...props}  valorados={valorados} recientes={recientes} />)} ></Route> 

              
                </Switch>
    

                </div>
        
                
      
     </ThemeProvider>
  
       </Router>
  )
}

export default App
