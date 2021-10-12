import React ,{useState,useContext,useEffect}from 'react'
import Login from '../src/Paginas/Login'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Inicio from './Paginas/inicio'
import {ThemeProvider, makeStyles} from  "@material-ui/core/styles"
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
import Search from '../src/Paginas/Search'
import Usuarios from '../src/Paginas/Usuarios'
import ListarComentarios from './Paginas/ListarComentarios'
import AdministrarNosotros from "../src/Paginas/AdministrarNosotros"
import Colaboraciones  from "../src/Paginas/Colaboraciones"
import Eligeetiqueta from './Paginas/Eligeetiqueta'
import Info from './Paginas/Info'
import Verinfo from './Paginas/Verinfo'
import Populares from './Paginas/Populares'
import Recientes from './Paginas/Recientes'
import WhyPag from './Paginas/WhyPag'
import WhyPagAdmin from './Paginas/admin/WhyPagAdmin'
import Titulo from './Paginas/admin/Titulo/Titulo'

const estilos =makeStyles((theme)=>({

root:{

  "& body":{
    backgroundColor:"#ffffff"
  }
  ,
  "& .swal2-textarea": {
    fontFamily:"Nunito !important",
    color:"#21cbce",
 },
 
}


}))



const App = (props) => {

  const clases=estilos()
  const history=useHistory()
const [recientes, setrecientes] = useState(true)
const [valorados, setvalorados] = useState(false)
const [match, setmatch] = useState()  
const usuario=useContext(UsuarioContext)
//  agregar  un texto general  
const [textoGeneral, setTextoGeneral]=useState("The Latest")

 const reciente=()=>{



//   if(recientes)
//   {

//   setvalorados(false)
//   setrecientes(false)
// }else
//   {
//     setvalorados(false)
//     setrecientes(true)

//   }

        setTextoGeneral("The Latest")
        setvalorados(false)
        setrecientes(true)

      


}



const mejorvalorados=()=>{

      // if(valorados){

      //   setvalorados(false)
      //   setrecientes(false)
      // }else
      //   {
      //     setvalorados(true)
      //     setrecientes(false)
      
      //   } 
        setTextoGeneral("Popular")
        setvalorados(true)
        setrecientes(false)
      
}

useEffect(() => {

  console.log("aleta")

  // alert(history.location.pathname)
 
}, [])

  
  return (
    <Router>
  
    <ThemeProvider theme={theme}>
   
         

                <div className={clases.root}>
                  <Navegador  mejorvalorados={mejorvalorados} recientes={recientes} valorados={valorados} reciente ={reciente} ></Navegador>

                <Switch>
                <Route  path="/crearcuenta" component={CrearCuenta}></Route>
                <Route  path="/nuevopaper"        render={(props)=>(< CrearPaper {...props}   />)} ></Route>
                <Route  path="/editarpaper/:id" component={CrearPaper}></Route>
                <Route  path="/etiquetas"  render={(props)=>(<Etiquetas {...props}  valorados={valorados} recientes={recientes} />)} ></Route>
                <Route  path="/tag/:valor"  render={(props)=>(<EtiquetasDos {...props}  valorados={valorados} recientes={recientes} />)}></Route>
                <Route  path="/buscar/:papermatch"  render={(props)=>(<Inicio {...props}  valorados={valorados}  recientes={recientes} />)} ></Route> 
                <Route  path="/search"  render={(props)=>(<Search {...props}  valorados={valorados}  recientes={recientes} />)} ></Route> 
                <Route  path="/adminetiquetas"  render={(props)=>(<AdmEtiquetas {...props}   />)} ></Route>
                <Route  path="/admin" render={(props)=>(<Login {...props}  />)} ></Route>
                <Route  path="/about" component={Nosotros}></Route>
                <Route  path="/listusuarios" component={Usuarios}></Route>
                <Route  path="/listacomentarios" component={ListarComentarios}></Route>
                <Route  path="/colaborate" component={Colaboraciones}></Route>
                <Route  path="/administrarnosotros"  component={AdministrarNosotros} ></Route>
                <Route  path="/info/:id"  render={(props)=>(< Info {...props}  valorados={valorados} recientes={recientes} />)} ></Route>
                <Route  path="/information/:id"  render={(props)=>(<Verinfo {...props}  valorados={valorados} recientes={recientes} />)} ></Route>
                <Route exac path="/popular"  render={(props)=>(<Populares {...props}  textoGeneral={textoGeneral}  valorados={valorados} recientes={recientes} />)} ></Route> 
                <Route exac path="/latest"  render={(props)=>(<Recientes {...props}  textoGeneral={textoGeneral}  valorados={valorados} recientes={recientes} />)} ></Route> 
                <Route exac path="/why"  render={(props)=>(<WhyPag {...props}  textoGeneral={textoGeneral}  valorados={valorados} recientes={recientes} />)} ></Route> 
                <Route exac path="/adminwhy"  render={(props)=>(<WhyPagAdmin {...props}  textoGeneral={textoGeneral}  valorados={valorados} recientes={recientes} />)} ></Route> 

                {/* /<Route exac path="/"  render={(props)=>(<Inicio {...props}  textoGeneral={textoGeneral}  valorados={valorados} recientes={recientes} />)} ></Route>  */}
                <Route  path="/information/:id?fbclid"  render={(props)=>(<Eligeetiqueta {...props}  valorados={valorados} recientes={recientes} />)} ></Route>
                <Route  path="/admintitulo"  render={(props)=>(<Titulo  {...props}  valorados={valorados} recientes={recientes} />)} ></Route>
                <Route  path="/"  render={(props)=>(<Eligeetiqueta {...props}  valorados={valorados} recientes={recientes} />)} ></Route>

          </Switch>
        </div>
        
                
      
     </ThemeProvider>
  
       </Router>
  )
}

export default App
